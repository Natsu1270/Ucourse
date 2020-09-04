import React, { useState, useEffect } from 'react'


import programBg1 from '../../assets/program-bg1.png'
import { Avatar, Button, Skeleton, Row, Col, Modal, message } from "antd";

import momo from "../../assets/momo-logo-80x80.png";
import Constants from '../../constants';
import { useDispatch } from "react-redux";
import { showRLModal } from "../../redux/UI/ui.actions";
import { buyProgramAPI } from "../../api/program.services"




const ProgramDetailBanner = ({ isOwn, program, userRole, programCourses, token }) => {

    const [showPayment, setShowPayment] = useState(false);
    const [own, setOwn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [price, setPrice] = useState("0")
    const dispatch = useDispatch()

    useEffect(() => {
        setOwn(isOwn)
    }, [isOwn])


    const renderPrice = () => {
        if (program.price || program.price == 0) {
            return program.price.toString() != "0" ? program.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VND" : "Miễn phí"
        } else {
            return "Chưa xác định"
        }
    }

    const registerProgram = async () => {
        setIsRegistering(true)
        try {
            const { data } = await buyProgramAPI({ token, program_id: program.id })
            if (data.data.payUrl) {
                window.open(data.data.payUrl, "_self")
            } else {
                message.success("Đăng ký chương trình thành công")
                setOwn(true)
            }
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setIsRegistering(false)
    }

    const handleRegister = () => {
        if (!token) {
            message.error(Constants.UN_AUTHORIZATION_ERROR, 1.5, () => dispatch(showRLModal()))
            return
        }
        if (!program.price && program.price == 0) {
            return registerProgram()
        }
        setShowPayment(true)
    }

    const s = {
        background: `linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.8)
        ),
        url(${programBg1}) no-repeat center center / cover`,

    }
    return (
        <section style={s} className="pd-5 section-program-banner" id="cs-program-banner">
            <div className="program-banner">
                <div className="program-banner__content">
                    <div className="program-banner__content--icon mr-5">
                        <Avatar size={52} src={program.icon} />
                    </div>
                    <div className="program-banner__content--des">
                        <h4 className="text--sub__smaller text-white">
                            PROGRAM
                        </h4>
                        <h1 className="text--main text--main__bigger text-white">
                            {program.name}
                        </h1>
                        <p className="course-description text--sub text--sub__bigger mt-2 text-white">
                            {program.short_description}
                        </p>
                        <h3 className="text-white">
                            Học phí: {isRegistering ? Constants.SPIN_ICON : renderPrice()} {program.discount_percentage || (program.price && program.price != 0) ? `(Giảm ${program.discount_percentage}%)` : null}
                        </h3>
                        <div className="d-flex enroll-area mt-5">
                            <Skeleton active loading={isRegistering}>
                                <Button onClick={() => own ? null : handleRegister()} className="register-btn cs-btn--animated" disabled={userRole.code === 'TA' || userRole.code === 'TC' || userRole.code === 'AD'}>
                                    {own ? 'Đã sở hữu' : 'Đăng ký chương trình'}
                                </Button>
                            </Skeleton>

                        </div>
                    </div>
                    <div className="program-banner__content--tags"></div>
                </div>
            </div>
            <Modal
                title={<h1>Thanh toán</h1>}
                closeIcon={<i>X</i>}
                visible={showPayment}
                onCancel={() => {
                    setShowPayment(false)
                    setIsRegistering(false)
                }}
                footer={[
                    <Button type="primary" danger key="back" onClick={() => setShowPayment(false)}>
                        Hủy
                    </Button>
                ]}
                width={800}
                style={{ top: 10, backgroundColor: 'white', paddingBottom: "0px" }}>
                <div>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Button
                                className="ant-btn momo-btn cs-btn--animated"
                                style={{
                                    height: '7rem', color: '#b0006d',
                                    fontWeight: '500', fontSize: '1.8rem', border: 'none'
                                }}
                                type="default"
                                onClick={registerProgram}>
                                <img src={momo} width={48} /> <span className="ml-3">Thanh toán bằng momo</span>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <h4 className="text--sub__smaller">
                                Chương trình học
                            </h4>
                            <h1 className="text--main text--main__bigger">
                                {program.name}
                            </h1>

                            <p className="course-description text--sub text--sub__bigger mt-4">
                                {program.short_description}
                            </p>

                            <h3>
                                Học phí: {renderPrice()}
                            </h3>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </section>
    )
}

export default ProgramDetailBanner
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Skeleton, Row, Col } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";
import {useSelector} from "react-redux";
import {isLoadingSelector} from "../../redux/CourseHome/course-home.selects";

import {showRLModal} from "../../redux/UI/ui.actions";
import {useDispatch} from "react-redux";
import Modal from 'antd/lib/modal/Modal';
import LoginSignUpOverlay from '../RegisterOrLogin/login-signup-overlay.ulti';
import Register from '../Register/register.component';
import momo from "../../assets/momo-logo-80x80.png";

const CourseDetailBanner = ({ course, courseDetail, teachers, own, handleRegister, isLoading }) => {

    const [showPayment, setShowPayment] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();
    const gotoCourseLearn = () => {
        history.push(`${Constants.COURSE_HOME_LINK}/${course.slug}`)
    }
    const isRegistering = useSelector(state => isLoadingSelector(state));
    const s = {
        background: `linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.8)
        ),
        url(${course.icon}) no-repeat center center / cover`,

    };

    const renderPrice = () => {
        if (course.fee_type == "paid") return course.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VND";
        else return "Miễn phí"
    }

    const handleCourseRegister = () => {
        
        if (own) {
            return null;
        }
        if (course.fee_type == 'paid') {
            return setShowPayment(true);
        }
        return handleRegister();
    }

    return (
        <section style={s} className="pd-5 section-course-banner" id="cs-course-banner" >
            <div className="course-banner d-flex justify-content-start" >
                <div className="course-detail">
                    <h4 className="text--sub__smaller text-white">
                        Khóa học
                    </h4>
                    <h1 className="text--main text--main__bigger text-white">
                        {isLoading ? Constants.SPIN_ICON : courseDetail.verbose_name}
                    </h1>
                    <Skeleton active loading={isLoading}>
                        <p className="course-description text--sub text--sub__bigger mt-4">
                            {courseDetail.short_description}
                        </p>
                    </Skeleton>
                    <h3 className="text-white">
                        Học phí: {isLoading ? Constants.SPIN_ICON : renderPrice()}
                    </h3>

                    <div className="d-flex enroll-area mt-5">
                        <Button to="#" onClick={handleCourseRegister} className="register-btn cs-btn--animated">
                            {isRegistering ? Constants.SPIN_ICON : own ? 'Đã sở hữu' : 'Đăng ký học'}
                        </Button>
                        <div className="course-info">
                        </div>
                    </div>
                </div>

            </div> 
            <Modal
                title=""
                closeIcon={<i></i>}
                visible={showPayment}
                onCancel={() => setShowPayment(false)}
                footer={null}
                width={800}
                style={{ top: 10 }}>
                <div className={`cs-account-form__container cs-signup${showPayment ? ' right-panel-active' : ''}`}
                    id="cs-form-container">
                    <h1>Thanh toán</h1>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <button onClick={handleRegister} className="momo-button"><img src={momo}/>Thanh toán bằng momo</button>
                        </Col>
                        <Col span={12}>
                            <h4 className="text--sub__smaller">
                                Khóa học
                            </h4>
                            <h1 className="text--main text--main__bigger">
                                {isLoading ? Constants.SPIN_ICON : courseDetail.verbose_name}
                            </h1>
                            <Skeleton active loading={isLoading}>
                                <p className="course-description text--sub text--sub__bigger mt-4">
                                    {courseDetail.short_description}
                                </p>
                            </Skeleton>
                            <h3>
                                Học phí: {isLoading ? Constants.SPIN_ICON : renderPrice()}
                            </h3>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </section>
    )
};

export default CourseDetailBanner
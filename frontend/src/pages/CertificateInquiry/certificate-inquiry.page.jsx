import React, { useState } from 'react'
import { Divider, Input, Row, Col, message, Descriptions, Spin } from 'antd'
import { CertificateInquiry } from '../../api/certificate.services'
import Constants from '../../constants'
import { formatDate } from '../../utils/text.utils'
import ResultComponent from '../../components/Common/result.component'


const { Search } = Input

const CertificateInqury = () => {

    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const inqury = async (value) => {
        setLoading(true)
        try {
            const { data } = await CertificateInquiry(value)
            setShowResult(true)
            setInfo(data.data)
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }

    return (
        <section className="section-10 page" >
            <Spin spinning={loading} indicator={Constants.SPIN_ICON}>

                <div className="page-card-2" style={{ paddingBottom: '5rem' }}>
                    <h3 className="title--big text-center">
                        Tra cứu thông tin chứng chỉ
                </h3>

                    <Row gutter={16} align="middle" className="mt-5">
                        <Col>
                            <span className="text--sub__bigger3 text-black">Nhập dãy số trên chứng chỉ</span>
                        </Col>
                        <Col span={18}>
                            <Search size="large" enterButton onSearch={inqury} loading={loading} placeholder="Nhập mã chứng chỉ..." />
                        </Col>
                    </Row>

                    <Row justify="center">
                        {
                            showResult ?
                                info ? (
                                    <Descriptions title="Thông tin chứng chỉ" className="mt-5">
                                        <Descriptions.Item label="Tên học viên">
                                            {info.student.user_profile.fullname}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="email">
                                            {info.student.email}
                                        </Descriptions.Item>
                                        {
                                            info.course ? <Descriptions.Item label="Môn học">
                                                {info.course.title}
                                            </Descriptions.Item> : null
                                        }
                                        {
                                            info.program ? <Descriptions.Item label="Chương trình học">
                                                {info.program.name}
                                            </Descriptions.Item> : null
                                        }
                                        <Descriptions.Item label="Ngày nhận">
                                            {formatDate(info.received_date, Constants.DD_MM_YYYY)}
                                        </Descriptions.Item>
                                    </Descriptions>) : <p className="text--sub__bigger3 text-black mt-5">Không tìm thấy thông tin chứng chỉ ứng với mã này</p>
                                : null
                        }
                    </Row>

                </div>

            </Spin>


        </section>
    )
}

export default CertificateInqury
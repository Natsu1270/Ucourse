import React, { useState, useEffect } from 'react'
import { getStudentSummary, getStudentCertificate } from '../../api/summary.services'
import { message, Divider, Row, Col, Tag, Spin, Button } from 'antd'
import { FireOutlined, RocketOutlined, SolutionOutlined, FileProtectOutlined, FieldTimeOutlined, FileOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import Constants from '../../constants'

import ResultComponent from '../Common/result.component'
import { formatDate } from '../../utils/text.utils'



const CertificateStudent = ({ token, course, courseHome }) => {

    const [loading, setLoading] = useState(true)
    const [studentCourse, setStudentCourse] = useState({})
    const [studentCertificate, setStudentCertificate] = useState({})

    const getStudentSummaryAndCertificate = async () => {
        setLoading(true)
        const data = { token, courseId: course.id, courseHomeId: courseHome.id }
        try {
            const [summaryRes, certificateRes] = await Promise.all([
                getStudentSummary(data),
                getStudentCertificate(data)
            ])
            if (summaryRes.data.data) {
                setStudentCourse(summaryRes.data.data)
            }
            if (certificateRes.data.data) {
                setStudentCertificate(certificateRes.data.data)
            }
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (course && courseHome.id) {
            getStudentSummaryAndCertificate()
        }
    }, [course, courseHome])

    const renderStatus = (status) => {
        if (status === 'on_going') return <Tag color="purple"><span className="text--sub__bigger">Trong tiến trình</span></Tag>
        if (status === 'fail') return <Tag color="red"><span className="text--sub__bigger">Chưa đạt tiêu chuẩn</span></Tag>
        return <Tag color="blue"><span className="text--sub__bigger">Đạt</span></Tag>
    }

    const renderSummary = (isSum) => {
        if (!isSum) return <Tag color="red"><span className="text--sub__bigger">Chưa được tông kết</span></Tag>
        return <Tag color="blue"><span className="text--sub__bigger">Đã tổng kết lớp</span></Tag>
    }

    const renderCer = (isCer) => {
        if (!isCer) return <Tag color="red"><span className="text--sub__bigger">Chưa được cấp</span></Tag>
        return <Tag color="blue"><span className="text--sub__bigger">Đã được cấp</span></Tag>
    }


    const renderRank = (rank) => {
        if (rank === null) return <Tag color="red"><span className="text--sub__bigger">Chưa phân loại</span></Tag>
        if (rank === 'bad') return <Tag color="magenta"><span className="text--sub__bigger">Yếu</span></Tag>
        if (rank === 'medium') return <Tag color="purple"><span className="text--sub__bigger">Trung bình</span></Tag>
        if (rank === 'good') return <Tag color="green"><span className="text--sub__bigger">Khá</span></Tag>
        return <Tag color="blue"><span className="text--sub__bigger">Xuất sắc</span></Tag>
    }

    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Chứng chỉ khóa học
            </h3>
            <Divider />
            <Row gutter={48}>
                <Col span={12}>
                    <div className="page-card">
                        <h1 className="mb-5">Tổng kết</h1>
                        <Spin spinning={loading} indicator={Constants.LOADING_ICON}>

                            <Row gutter={[25, 25]} className="text--sub__bigger" style={{ fontSize: '1.8rem' }}>
                                <Col span={24}>
                                    <Row gutter={16}>
                                        <Col span={8}><FireOutlined /> Tình trạng:</Col>
                                        <Col span={8}>{renderStatus(studentCourse.status)}</Col>
                                    </Row>

                                </Col>
                                <Col span={24}>
                                    <Row gutter={16}>
                                        <Col span={8}><RocketOutlined /> Xếp loại:</Col>
                                        <Col span={8}>{renderRank(studentCourse.rank)}</Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={16}>
                                        <Col span={8}><SolutionOutlined /> Đã tổng kết:</Col>
                                        <Col span={8}>{renderSummary(studentCourse.is_summarised)}</Col>
                                    </Row>

                                </Col>
                                <Col span={24}>
                                    <Row gutter={16}>
                                        <Col span={8}><FileProtectOutlined /> Chứng chỉ:</Col>
                                        <Col span={8}>{renderCer(studentCourse.received_certificate)}</Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Spin>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="page-card">
                        <h1 className="mb-5">Chứng chỉ</h1>
                        <Spin spinning={loading} indicator={Constants.LOADING_ICON}>

                            {
                                studentCertificate.id ? (<Row gutter={[25, 25]} className="text--sub__bigger" style={{ fontSize: '1.8rem' }}>
                                    <Col span={24}>
                                        <Row gutter={16}>
                                            <Col span={8}><FieldTimeOutlined /> Ngày cấp:</Col>
                                            <Col span={8}>{formatDate(studentCertificate.received_date)}</Col>
                                        </Row>

                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Button onClick={() => window.open(studentCertificate.file)}><SafetyCertificateOutlined />Xem chứng chỉ</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>) : <h2>Không có thông tin chứng chỉ</h2>
                            }

                        </Spin>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default CertificateStudent
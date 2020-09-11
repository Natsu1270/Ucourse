
import { AuditOutlined, BookOutlined, FieldTimeOutlined, FileProtectOutlined, FileSearchOutlined, FireOutlined, UserOutlined } from '@ant-design/icons'
import {
    Alert, Button, Col, Divider, Layout, message,
    Skeleton, Tag, Row
} from 'antd'
import Modal from 'antd/lib/modal/Modal'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { genCertificateAPI, getStudentProgramDetail } from '../../api/summary.services'
import Constants from '../../constants'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import { renderCer } from '../../utils/common'
import { formatDate } from '../../utils/text.utils'




const { Content } = Layout


const AdminCertificateProgram = () => {

    const { programId, studentProgramId } = useParams()
    const location = useLocation()
    const { studentId } = queryString.parse(location.search)

    const [loading, setLoading] = useState(true)
    const [studentProgram, setStudentProgram] = useState({})
    const [, setStudentProfile] = useState({})
    const [programDetail, setProgramDetail] = useState({})
    const [, setUserCourse] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)
    const [completedNum, setCompletedNum] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [fileURL, setFileURL] = useState(null)
    const [, setFile] = useState(null)

    const token = useSelector(state => tokenSelector(state))


    const getProgramProcess = async () => {
        setLoading(true)
        try {
            const { data } = await getStudentProgramDetail({ studentId, programId, studentProgramId })
            setStudentProgram(data.data.studentProgram)
            setStudentProfile(data.data.studentProgram.student.user_profile)
            setProgramDetail(data.data.studentProgram.program)
            setUserCourse(data.data.userCourses)
            setIsCompleted(data.data.isCompleted)
            setCompletedNum(data.data.completedNum)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getProgramProcess()
    }, [])

    const renderProgramStatus = (status) => {
        if (status === 'on_going') return <Tag color="purple"><span className="text--sub__bigger">Trong tiến trình</span></Tag>
        if (status === 'aborted') return <Tag color="red"><span className="text--sub__bigger">Chưa đạt tiêu chuẩn</span></Tag>
        if (status === 'completed') return <Tag color="blue"><span className="text--sub__bigger">Đạt</span></Tag>
        else return 'N/A'
    }

    const renderRemain = () => {
        if (completedNum == 0) return <Tag color="#f50" style={{ fontSize: '1.8rem', padding: '0.8rem' }}>
            Học viên chưa hoàn thành khóa học nào trong chương trình
            </Tag>
        if (isCompleted) {
            return <Tag color="blue" style={{ fontSize: '1.8rem', padding: '0.8rem' }}>
                Học viên đã hoàn thành hết các khóa học trong chương trình
                    </Tag>
        }
        return <Tag color="#f50" style={{ fontSize: '1.8rem', padding: '0.5rem' }}>
            {`Còn lại ${studentProgram.course_num - completedNum}/${studentProgram.course_num} môn học`}
        </Tag>
    }


    const genCertificate = async () => {
        // if (dayDiff(moment(), item.end_date) < 0) openNotification(item.end_date)
        setLoading(true)
        const params = {
            name: programDetail.name,
            studentId: studentId,
            programId: programDetail.id,
            studentProgramId: studentProgram.id,
            type: 'p',
        }
        try {
            const { data } = await genCertificateAPI({ token, params })
            const res = new Blob([data], { type: 'application/pdf' })
            setFile(res)
            const fileUrl = URL.createObjectURL(res)
            setFileURL(fileUrl)
            setShowModal(true)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    // const handOut = async () => {
    //     const key = 'handout'

    //     setLoading(true)
    //     message.loading({ content: 'Đang gửi chứng chỉ đến học viên...', key })
    //     const formData = new FormData()
    //     formData.set('type', 'p')
    //     formData.set('email', studentProfile.email)
    //     formData.set('programId', programDetail.id)
    //     formData.set('studentId', studentId)
    //     formData.set('name', programDetail.name)
    //     formData.set('studentName', studentProfile.fullname)
    //     formData.set('studentProgramId', studentProgram.id)
    //     formData.set('file', file, programDetail.slug + "_Certificate.pdf")

    //     try {
    //         const { data } = await handOutCertificateAPI({ token, formData })
    //         message.success({ content: 'Cấp chứng chỉ thành công', key, duration: 1.5, onClose: () => window.location.reload() })
    //     } catch (err) {
    //         message.error('Có lỗi xảy ra: ' + err.message)
    //         setLoading(false)
    //     }
    // }

    const renderCerButton = () => {
        if (studentProgram.received_certificate) {
            return (<p className="text--sub__bigger3">Đã cấp chứng chỉ</p>)
        }
        if (isCompleted) {
            return <Button type="primary" onClick={genCertificate}>
                <AuditOutlined /> Cấp chứng chỉ
            </Button>
        }
    }

    return (
        <section className="section-10 page">
            <div className="page-card">
                <h3 className="text--main text-center">
                    Cấp phát chứng chỉ chương trình học
                </h3>
                <Divider />
                <Layout className="bg-white" >
                    <Content style={{ padding: '0 24px', minHeight: 200, background: '#fff' }}>
                        <Skeleton loading={loading} active >
                            <Row gutter={[18, 18]} className="text--sub__bigger" style={{ fontSize: '1.8rem' }}>
                                <Col span={12}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <UserOutlined /> Học viên
                                        </Col>
                                        <Col>
                                            {studentProgram.student ? studentProgram.student.user_profile.fullname : null}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <BookOutlined /> Chương trình học
                                        </Col>
                                        <Col>
                                            {studentProgram.program ? studentProgram.program.name : null}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <FireOutlined /> Trạng thái
                                        </Col>
                                        <Col>
                                            {renderProgramStatus(studentProgram.status)}
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <FieldTimeOutlined /> Ngày bắt đầu
                                         </Col>
                                        <Col>
                                            {formatDate(studentProgram.started_date, Constants.DD_MM_YYYY)}
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <FieldTimeOutlined /> Ngày hoàn tất
                                        </Col>
                                        <Col>
                                            {formatDate(studentProgram.completed_date, Constants.DD_MM_YYYY)}
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <FileProtectOutlined /> Tình trạng chứng chỉ
                                        </Col>
                                        <Col>
                                            {
                                                renderCer(studentProgram.received_certificate)
                                            }
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>

                            <Row className="mb-3" justify="center">
                                {renderRemain()}
                            </Row>
                            <Row justify="center">
                                {
                                    renderCerButton()
                                }
                            </Row>
                        </Skeleton>

                    </Content>
                </Layout>

                <Modal
                    title="Cấp chứng chỉ chương trình học"
                    style={{ background: 'white', paddingBottom: '0' }}
                    visible={showModal}
                    onCancel={() => {
                        window.location.reload()
                    }}
                    onOk={() => window.location.reload()}
                    cancelText="Hủy"
                >
                    <Row gutter={[20, 20]} justify="center">
                        <Col span={24}>
                            <Alert
                                message="Cấp chứng chỉ thành công"
                                description="Chứng chỉ đã được gửi tới email của học viên"
                                type="success"
                                showIcon
                            />
                        </Col>
                        <Col>
                            <Button
                                loading={loading}
                                onClick={() => window.open(fileURL)}>
                                <FileSearchOutlined /> Xem file chứng chỉ đã cấp
                            </Button>
                        </Col>

                    </Row>

                </Modal>

            </div>
        </section>
    )
}

export default AdminCertificateProgram
import React, { useState, useEffect } from 'react'
import { Menu, Table, Space, Avatar, Row, Col, Tag, Skeleton, List, Button, notification, message, Divider } from 'antd';
import Constants from '../../constants';
import { formatDate } from '../../utils/text.utils';
import { FireOutlined, FileProtectOutlined, FieldTimeOutlined, FileDoneOutlined } from '@ant-design/icons';
import { renderCer, renderRank, renderStatus, renderSummary } from '../../utils/common'
import certificateIcon from '../../assets/certificate.png'
import { requestProgramCertificate } from '../../api/summary.services';
import { BACKEND_HOST } from '../../configs';

const { SubMenu } = Menu

const ProgramProcessItem = ({ token, program, loading }) => {

    const [studentCourses, setStudentCourses] = useState([])
    const [requesting, setRequesting] = useState(false)

    useEffect(() => {
        if (program.student_course) {
            setStudentCourses(program.student_course)
        }
    }, [program])

    const renderProgramStatus = (status) => {
        if (status === 'on_going') return <Tag color="purple"><span className="text--sub__bigger">Trong tiến trình</span></Tag>
        if (status === 'aborted') return <Tag color="red"><span className="text--sub__bigger">Chưa đạt tiêu chuẩn</span></Tag>
        if (status === 'completed') return <Tag color="blue"><span className="text--sub__bigger">Đạt</span></Tag>
        else return 'N/A'
    }

    const calPass = () => {
        if (studentCourses == null || studentCourses.length < 1) return -1

        let total = 0
        if (program.program_course && studentCourses) {
            studentCourses.forEach(course => {
                if (course.status == "pass" && course.is_summarised) {
                    total += 1
                }
            })
        }
        return total
    }

    const requestCertificate = async () => {
        setRequesting(true)
        try {
            const { data } = await requestProgramCertificate({ token, programId: program.id })
            openNotification(data.resultCode)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setRequesting(false)
    }

    const renderRemain = () => {
        if (program.program_course) {
            const passNum = calPass()
            if (passNum == -1) return <Tag color="#f50" style={{ fontSize: '1.8rem', padding: '0.8rem' }}>
                Bạn chưa hoàn thành khóa học nào trong chương trình
                </Tag>
            if (program.program_course.length - passNum == 0) {
                return <Tag color="blue" style={{ fontSize: '1.8rem', padding: '0.8rem' }}>
                    Bạn đã hoàn thành hết các khóa học, nhấn "Yêu cầu cấp phát chứng chỉ" để nhận chứng chỉ
                    </Tag>
            }
            return <Tag color="#f50" style={{ fontSize: '1.8rem', padding: '0.5rem' }}>
                {`Còn ${program.program_course.length - passNum}/${program.program_course.length} khóa để hoàn tất chương trình học`}
            </Tag>
        }
    }

    const openNotification = (code) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" danger size="small" onClick={() => {
                notification.close(key)
            }}>
                Đóng
            </Button>
        );
        notification.open({
            message: 'Thông báo',
            description: code == -1 ? 'Vui lòng hoàn thành hết khóa học để nhận chứng chỉ chương trình' :
                'Chứng chỉ đã được cấp phát và gửi về email của bạn, hoặc tải lại trang để thấy file chứng chỉ'
            ,
            btn,
            key,
        });
    };

    return (
        <div >
            <h1 className="text-grey mb-4 text-center">
                Thông tin chương trình học: <Avatar src={program.icon} size={24} /> {program.name}
            </h1>
            {
                program.student_program ?
                    <Row justify="center" className="mb-5">
                        <Col>
                            {
                                program.student_program.received_certificate ?
                                    <Space>
                                        <Avatar src={certificateIcon} size={48} shape="square" /> <Button
                                            onClick={() => window.open(BACKEND_HOST + program.student_program.file)}>
                                            Click để xem chứng chỉ
                                            </Button>
                                    </Space> : null
                            }
                        </Col>
                    </Row> : null
            }

            <Row gutter={[18, 18]} className="text--sub__bigger" style={{ fontSize: '1.8rem' }}>
                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={10}>
                            <FireOutlined /> Trạng thái
                    </Col>
                        <Col>
                            {renderProgramStatus(program.student_program ? program.student_program.status : null)}
                        </Col>
                    </Row>
                </Col>

                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={10}>
                            <FieldTimeOutlined /> Ngày bắt đầu
                        </Col>
                        <Col>
                            {program.student_program ? formatDate(program.student_program.started_date, Constants.DD_MM_YYYY) : 'N/A'}
                        </Col>
                    </Row>
                </Col>

                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={10}>
                            <FieldTimeOutlined /> Ngày hoàn tất
                        </Col>
                        <Col>
                            {program.student_program ? formatDate(program.student_program.completed_date, Constants.DD_MM_YYYY) : 'N/A'}
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
                                program.student_program ? renderCer(program.student_program.received_certificate) : 'N/A'
                            }
                        </Col>
                    </Row>
                </Col>

            </Row>

            <Row className="mb-3">
                {renderRemain()}
            </Row>
            <List
                header={<Row justify="space-between" className="text--sub__bigger3">
                    <Col>Khóa học thuộc chương trình</Col>
                </Row>}
                size="large"
                bordered
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={program.program_course}
                renderItem={item => {

                    const studentCourse = studentCourses.find(course => course.course == item.id)
                    return (
                        <List.Item
                            actions={[]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.icon} size={48} />
                                    }
                                    title={<span className="text--sub__bigger2">{item.title}</span>}
                                    description={!studentCourse ? "Chưa có thông tin tiến độ khóa học" : <Row gutter={16}>
                                        <Col>
                                            Tình trạng: {renderStatus(studentCourse.status)}
                                        </Col>
                                        <Col>
                                            Xếp loại: {renderRank(studentCourse.rank)}
                                        </Col>
                                        <Col>
                                            Tổng kết: {renderSummary(studentCourse.is_summarised)}
                                        </Col>
                                        <Col>
                                            Ngày hoàn thành: {formatDate(studentCourse.completed_date, Constants.MMM_Do_YYYY)}
                                        </Col>
                                    </Row>}
                                />

                            </Skeleton>
                        </List.Item>
                    )
                }}
            />
        </div>
    )
}

export default ProgramProcessItem
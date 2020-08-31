import React, { useState, useEffect } from 'react'
import { Menu, Table, Space, Avatar, Row, Col, Tag, Skeleton, List } from 'antd';
import Constants from '../../constants';
import { formatDate } from '../../utils/text.utils';
import { FireOutlined, FileProtectOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { renderCer, renderRank, renderStatus, renderSummary } from '../../utils/common'

const { SubMenu } = Menu

const ProgramProcessItem = ({ program, loading }) => {

    const [studentCourses, setStudentCourses] = useState([])

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

    return (
        <div >
            <h1 className="text-grey mb-4 text-center">
                Thông tin chương trình học: <Avatar src={program.icon} size={24} /> {program.name}
            </h1>
            <Row gutter={[18, 18]} className="text--sub__bigger" style={{ fontSize: '1.8rem' }}>
                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FireOutlined /> Trạng thái
                    </Col>
                        <Col>
                            {renderProgramStatus(program.student_program ? program.student_program.status : null)}
                        </Col>
                    </Row>
                </Col>

                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FieldTimeOutlined /> Ngày bắt đầu
                        </Col>
                        <Col>
                            {program.student_program ? formatDate(program.student_program.started_date, Constants.DD_MM_YYYY) : 'N/A'}
                        </Col>
                    </Row>
                </Col>

                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FieldTimeOutlined /> Ngày hoàn tất
                        </Col>
                        <Col>
                            {program.student_program ? formatDate(program.student_program.completed_date, Constants.DD_MM_YYYY) : 'N/A'}
                        </Col>
                    </Row>
                </Col>

                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={8}>
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

            <List
                header={<Row justify="space-between" className="text--sub__bigger3">
                    <Col>Khóa học thuộc chương trình</Col>
                    <Col>
                        <Tag color="#f50" style={{ fontSize: '2rem', fontWeight: 500, padding: '1rem' }}>
                            {
                                program.program_course ?
                                    `Còn ${program.program_course.length - calPass()}/${program.program_course.length} khóa để hoàn tất chương trình học` : null
                            }
                        </Tag>
                    </Col>
                </Row>}
                size="large"
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
import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Skeleton, Menu, Button, Modal, InputNumber, Space } from 'antd'
import Constants from '../../constants'

import { getAllStudentGradesByCourseHomeAPI, updateStudentAssignmentGrade } from '../../api/grades.services'
import { formatDate } from '../../utils/text.utils'

import { Chart, Line, Point } from 'bizcharts';
import ResultComponent from "../Common/result.component";
import Avatar from 'antd/lib/avatar/avatar'

const { TabPane } = Tabs
const { SubMenu } = Menu

const CourseHomeGradesTeacher = ({ token, courseHomeId, students }) => {

    const [loading, setLoading] = useState(true)
    const [assignments, setAssignments] = useState({})
    const [exams, setExams] = useState({})
    const [editAssignment, setEditAssignment] = useState(null)
    const [editScore, setEditScore] = useState(null)
    const [showModal, setShowModal] = useState(false)


    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const result = await getAllStudentGradesByCourseHomeAPI({ token, courseHomeId })
            setExams(result.data.student_exams)
            setAssignments(result.data.student_assignments)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token && courseHomeId) getStudentGrades()
    }, [token, courseHomeId])

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (name, record) => <Space><Avatar src={record.avatar} /><span>{name}</span></Space>
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (name, record) => <span>{name}</span>
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            key: 'date',
            render: date => <span>{formatDate(date, Constants.MMM_Do__YY__TIME)}</span>
        },
        {
            title: 'Điểm',
            dataIndex: 'result',
            key: 'result',
            render: result => <span>{result}</span>
        }
    ];

    const assColumns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (name, record) => <Space><Avatar src={record.avatar} /><span>{name}</span></Space>
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: name => <span>{name}</span>
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            key: 'date',
            render: date => <span>{formatDate(date, Constants.MMM_Do__YY__TIME)}</span>
        },
        {
            title: 'Điểm',
            dataIndex: 'result',
            key: 'result',
            render: result => <span>{result}</span>
        },
        {
            title: 'Nhập điểm',
            dataIndex: 'input',
            key: 'input',
            render: (result, record) => (<Button type="primary" onClick={() => triggerModal(record.assignment)}>
                Nhập điểm
            </Button>)
        }
    ]

    const finalColumns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (name, record) => <Space><Avatar src={record.avatar} /><span>{name}</span></Space>
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: name => <span>{name}</span>
        },

        {
            title: 'Điểm tổng kết',
            dataIndex: 'result',
            key: 'result',
            render: result => <span>{result}</span>
        },
    ]

    const ExamTable = ({ exams }) => {
        const examData = exams.map((exam, index) => ({
            stt: index + 1,
            username: exam.student.username,
            avatar: exam.student.user_profile.avatar,
            fullname: exam.student.user_profile.fullname,
            date: exam.last_update,
            result: exam.final_result
        }))

        return (
            < Table
                dataSource={examData}
                columns={finalColumns}
            />
        )
    }


    const AssignmentTable = ({ assignments }) => {
        const assignmentData = assignments.map((assignment, index) => ({
            stt: index + 1,
            username: assignment.student.username,
            avatar: assignment.student.user_profile.avatar,
            fullname: assignment.student.user_profile.fullname,
            date: assignment.modified_date,
            result: assignment.score,
            assignment
        }))

        return (
            < Table
                dataSource={assignmentData}
                columns={assColumns}
            />
        )
    }

    const FinalScoreTable = () => {
        const data = loading ? [] : students.map((student, index) => {
            let finalResult = 0
            Object.keys(exams).forEach(key => {
                const xExams = exams[key][1]
                xExams.forEach(e => {
                    if (e.student.id === student.id) {
                        finalResult += e.final_result * e.exam.percentage / 100
                    }
                })

            })
            Object.keys(assignments).forEach(key => {
                const xAss = assignments[key][1]
                xAss.forEach(a => {
                    if (a.student.id === student.id) {
                        finalResult += a.score * a.assignment.percentage / 100
                    }
                })
            })

            return {
                stt: index + 1,
                username: student.username,
                avatar: student.user_profile.avatar,
                fullname: student.user_profile.fullname,
                result: finalResult
            }
        })
        return (
            < Table
                dataSource={data}
                columns={columns}
            />
        )
    }
    const modalClose = () => {
        setShowModal(false)
        setEditAssignment(null)
        setEditScore(null)
    }

    const triggerModal = (assignment) => {
        setEditAssignment(assignment)
        setShowModal(true)
    }

    const updateGrade = async () => {
        setLoading(true)
        const data = { token, score: editScore, studentAssignmentId: editAssignment.id }
        try {
            const result = await updateStudentAssignmentGrade(data)
            message.success("Cập nhật thành công", 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Tổng hợp điểm
            </h3>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bài kiểm tra" key="1">
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <Menu
                            style={
                                { borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0' }
                            }
                            mode="inline" width="100%">
                            {
                                Object.keys(exams).map((key, index) =>
                                    <SubMenu key={key} title={<div>
                                        {index + 1 + '. ' + key} - <small>{exams[key][0].percentage}%</small>
                                    </div>}>
                                        <ExamTable exams={exams[key][1]} key={key} />
                                    </SubMenu>
                                )

                            }
                        </Menu>
                    </Skeleton>

                </TabPane>
                <TabPane tab="Bài assignment" key="2">
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <Menu
                            style={
                                { borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0' }
                            }
                            mode="inline" width="100%">
                            {
                                Object.keys(assignments).map((key, index) =>
                                    <SubMenu key={key} title={<div>
                                        {index + 1 + '. ' + key} - <small>{assignments[key][0].percentage}%</small>
                                    </div>}>
                                        <AssignmentTable assignments={assignments[key][1]} key={key} />
                                    </SubMenu>
                                )

                            }
                        </Menu>
                    </Skeleton>
                </TabPane>

                <TabPane tab="Điểm tổng kết" key="3">
                    <h3 className="text--main">Danh sách điểm tổng kết tạm tính</h3>
                    <FinalScoreTable />
                </TabPane>

            </Tabs>
            <Modal
                title="Nhập điểm"
                visible={showModal}
                onCancel={modalClose}
                footer={[
                    <Button key={1} type="danger" onClick={modalClose}>
                        Hủy
                    </Button>,
                ]}
                style={{ background: 'white', paddingBottom: '0', textAlign: 'center' }}>
                <h3 className="text-center mb-5">Nhập điểm cho học viên : {editAssignment ? editAssignment.student.user_profile.fullname : null}</h3>
                <Space>
                    <InputNumber value={editScore} onChange={(e) => setEditScore(e)} />
                    <Button type="primary" loading={loading} onClick={updateGrade}>Cập nhật</Button>
                </Space>
            </Modal>
        </section>
    )
};

export default CourseHomeGradesTeacher
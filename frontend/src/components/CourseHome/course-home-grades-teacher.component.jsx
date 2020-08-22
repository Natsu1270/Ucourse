import React, {useState, useEffect} from 'react'
import {message, Tabs, Table, Skeleton, Menu, Button, Modal, InputNumber, Space} from 'antd'
import Constants from '../../constants'

import {getAllStudentGradesByCourseHomeAPI,updateStudentAssignmentGrade} from '../../api/grades.services'
import {formatDate} from '../../utils/text.utils'

import {Chart, Line, Point} from 'bizcharts';
import ResultComponent from "../Common/result.component";

const {TabPane} = Tabs
const {SubMenu} = Menu

const CourseHomeGradesTeacher = ({token, courseHomeId}) => {

    const [loading, setLoading] = useState(true)
    const [assignments, setAssignments] = useState({})
    const [exams, setExams] = useState({})
    const [editAssignment, setEditAssignment] = useState(null)
    const [editScore, setEditScore] = useState(null)
    const [showModal, setShowModal] = useState(false)


    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const result = await getAllStudentGradesByCourseHomeAPI({token, courseHomeId})
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
            render: name => <span>{name}</span>
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
            render: name => <span>{name}</span>
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

    const ExamTable = ({exams}) => {
        const examData = exams.map((exam, index) => ({
            stt: index + 1,
            username: exam.student.username,
            fullname: exam.student.user_profile.fullname,
            date: exam.last_update,
            result: exam.final_result
        }))

        return (
            < Table
                dataSource={examData}
                columns={columns}
            />
        )
    }


    const AssignmentTable = ({assignments}) => {
        const assignmentData = assignments.map((assignment, index) => ({
            stt: index + 1,
            username: assignment.student.username,
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
        const data = {token, score: editScore, studentAssignmentId: editAssignment.id}
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
                    <Skeleton loading={loading} active paragraph={{rows: 5}}>
                        <Menu
                            style={
                                {borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0'}
                            }
                            mode="inline" width="100%">
                            {
                                Object.keys(exams).length > 0 ? Object.keys(exams).map((key, index) =>
                                    <SubMenu key={key} title={<div>
                                        {index + 1 + '. ' + key} - <small>{exams[key][0].exam.percentage}%</small>
                                    </div>}>
                                        <ExamTable exams={exams[key]} key={key}/>
                                    </SubMenu>
                                ) : <ResultComponent title="Không có dữ liệu" info="Chưa có bài làm nào của học viên"
                                                     type={Constants.RESULT_TYPE_NODATA}/>
                            }
                        </Menu>
                    </Skeleton>

                </TabPane>
                <TabPane tab="Bài assignment" key="2">
                    <Skeleton loading={loading} active paragraph={{rows: 5}}>
                        <Menu
                            style={
                                {borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0'}
                            }
                            mode="inline" width="100%">
                            {
                                Object.keys(assignments).length > 0 ? Object.keys(assignments).map((key, index) =>
                                    <SubMenu key={key} title={<div>
                                        {index + 1 + '. ' + key} - <small>{assignments[key][0].assignment.percentage}%</small>
                                    </div>}>
                                        <AssignmentTable assignments={assignments[key]} key={key}/>
                                    </SubMenu>
                                ) : <ResultComponent title="Không có dữ liệu" info="Chưa có bài nộp nào của học viên"
                                                     type={Constants.RESULT_TYPE_NODATA}/>
                            }
                        </Menu>
                    </Skeleton>
                </TabPane>

                <TabPane tab="Điểm tổng kết" key="3">

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
                style={{background: 'white', paddingBottom: '0', textAlign: 'center'}}>
                <h3 className="text-center mb-5">Nhập điểm cho học viên : {editAssignment ? editAssignment.student.user_profile.fullname : null}</h3>
                <Space>
                    <InputNumber value={editScore} onChange={(e) => setEditScore(e)}/>
                    <Button type="primary" loading={loading} onClick={updateGrade}>Cập nhật</Button>
                </Space>
            </Modal>
        </section>
    )
};

export default CourseHomeGradesTeacher
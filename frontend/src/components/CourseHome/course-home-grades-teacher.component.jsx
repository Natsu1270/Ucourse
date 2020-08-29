import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Skeleton, Menu, Button, Modal, InputNumber, Space, Avatar, Tag, Row, Col } from 'antd'
import Constants from '../../constants'

import { getAllStudentGradesByCourseHomeAPI, updateMultiStudentCourseHomeGrade, updateStudentCourseHomeGrade } from '../../api/grades.services'
import { formatDate } from '../../utils/text.utils'

import { Chart, Line, Point } from 'bizcharts';
import ResultComponent from "../Common/result.component";
import { CSVLink } from 'react-csv'
import { SwapOutlined, EditOutlined } from '@ant-design/icons'
import ExamGrades from '../Grade/exam-grades.component'
import AssignmentGrades from '../Grade/assignment-grades.component'

const { TabPane } = Tabs
const { SubMenu } = Menu

const CourseHomeGradesTeacher = ({ token, courseHomeId, students }) => {

    const [loading, setLoading] = useState(true)
    const [assignments, setAssignments] = useState({})
    const [exams, setExams] = useState({})
    const [studentCourseHomes, setStudentCourseHomes] = useState([])
    const [editScore, setEditScore] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editFinal, setEditFinal] = useState(null)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const { data } = await getAllStudentGradesByCourseHomeAPI({ token, courseHomeId })
            setExams(data.student_exams)
            setAssignments(data.student_assignments)
            setStudentCourseHomes(data.student_course_homes)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token && courseHomeId) getStudentGrades()
    }, [token, courseHomeId])

    const updateStudentFinalGrade = async (grade, id) => {
        setLoading(true)
        const data = { token, grade, studentCourseHomeId: id }
        try {
            const result = await updateStudentCourseHomeGrade(data)
            message.success("Cập nhật thành công", 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

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
            title: 'Điểm tổng kết tự động',
            dataIndex: 'result',
            key: 'result',
            render: result => <span>{result}</span>
        },

        {
            title: 'Điểm tổng kết',
            dataIndex: 'finalResult',
            key: 'finalResult',
            render: finalResult => <span>{
                finalResult || finalResult == 0 ? finalResult : <Tag color="magenta">Chưa tổng kết</Tag>
            }
            </span>
        },

        {
            title: 'Tổng kết điểm',
            dataIndex: 'action',
            key: 'action',
            render: (action, record) => (<Space>
                <Button
                    loading={loading}
                    onClick={() => updateStudentFinalGrade(record.result, record.studentCourseHome.id)}
                >
                    <SwapOutlined /> Lấy từ điểm tự động
                </Button>
                <Button loading={loading}
                    onClick={() => {
                        setShowModal(true)
                        setEditFinal(record.studentCourseHome.id)
                    }} type="primary">
                    <EditOutlined /> Nhập
                </Button>
            </Space>)
        },
    ]

    const csvData = []
    const finalData = students.map((student, index) => {
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
        const studentCourseHome = studentCourseHomes.find(item => item.student == student.id) || {}

        csvData.push({
            stt: index + 1,
            username: student.username,
            fullname: student.user_profile.fullname,
            autoResult: finalResult,
            finalResult: studentCourseHome.final_score,
        })

        return {
            stt: index + 1,
            username: student.username,
            avatar: student.user_profile.avatar,
            fullname: student.user_profile.fullname,
            result: finalResult,
            finalResult: studentCourseHome.final_score,
            studentCourseHome: studentCourseHome,
            key: studentCourseHome.id
        }
    })



    const FinalScoreTable = () => {
        return (
            <Table
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRowKeys(selectedRowKeys)
                        setSelectedRows(selectedRows)
                    },
                    getCheckboxProps: record => ({
                        name: record.username
                    })
                }}
                dataSource={finalData}
                columns={finalColumns}
            />
        )
    }
    const modalClose = () => {
        setShowModal(false)
        setEditScore(null)
        setEditFinal(null)
    }

    const autoAll = async () => {
        setLoading(true)
        try {
            const { data } = await updateMultiStudentCourseHomeGrade({ token, selectedRows })
            message("Lấy điểm tự động thành công: ", 1.5, window.location.reload())
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
            setLoading(false)
        }
    }


    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Tổng hợp điểm
            </h3>
            <Tabs defaultActiveKey="3">
                <TabPane tab="Bài kiểm tra" key="1">
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <ExamGrades exams={exams} />
                    </Skeleton>
                </TabPane>
                <TabPane tab="Bài assignment" key="2">
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <AssignmentGrades assignments={assignments} token={token} />
                    </Skeleton>
                </TabPane>

                <TabPane tab="Điểm tổng kết" key="3">
                    <h3 className="text--main">Danh sách điểm tổng kết tạm tính</h3>
                    <Row className="text-center mb-4 mt-3" gutter={16}>
                        <Col>
                            <CSVLink data={csvData} filename="DS-DIEM_TK.csv"><Button type="primary">Xuất ra file</Button></CSVLink>
                        </Col>
                        {
                            selectedRows.length > 0 ?
                                <Col>
                                    <Button onClick={autoAll}>
                                        <SwapOutlined /> Lấy điểm tự động các hàng đã chọn
                                </Button>
                                </Col>
                                : null
                        }
                    </Row>
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
                <h3 className="text-center mb-5">Nhập điểm </h3>
                <Space>
                    <InputNumber value={editScore} onChange={(e) => setEditScore(e)} />
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={() => updateStudentFinalGrade(editScore, editFinal)}>
                        Cập nhật
                    </Button>
                </Space>
            </Modal>
        </section>
    )
};

export default CourseHomeGradesTeacher
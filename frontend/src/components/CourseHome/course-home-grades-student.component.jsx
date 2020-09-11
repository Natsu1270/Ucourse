import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Tag, Divider } from 'antd'
import Constants from '../../constants'

import { getStudentGradesByCourseHomeAPI } from '../../api/grades.services'
import { formatDate } from '../../utils/text.utils'

import { Chart, Line, Point } from 'bizcharts';
import { Link } from 'react-router-dom'
import { calFinalScore, columns } from './course-home.utils'

const { TabPane } = Tabs

const CourseHomeGradesStudent = ({ token, courseHomeId }) => {

    const [loading, setLoading] = useState(false)
    const [assignments, setAssignments] = useState([])
    const [exams, setExams] = useState([])
    const [finalResult, setFinalResult] = useState({})
    const [classStatus, setClassStatus] = useState(null)
    const [finalScore, setFinalScore] = useState(null)
    const [totalGrade, setTotalGrade] = useState(0)

    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const result = await getStudentGradesByCourseHomeAPI({ token, courseHomeId })
            setExams(result.data.student_exams)
            setAssignments(result.data.student_assignments)
            const final = calFinalScore(result.data.student_exams, result.data.student_assignments)
            setFinalResult(final)
            setClassStatus(result.data.class_status)
            setFinalScore(result.data.final_score)
            setTotalGrade(result.data.total_grade)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }


    useEffect(() => {
        if (token && courseHomeId) getStudentGrades()
    }, [token, courseHomeId])




    let examData = []
    let examStudentChartData = []
    exams.forEach((exam, index) => {
        examData.push({
            id: exam.exam ? exam.exam.id : null,
            stt: index + 1,
            name: exam.exam ? exam.exam.name : 'N/A',
            date: exam.last_update,
            result: exam.final_result,
            isPass: exam.is_pass,
            percentage: exam.exam ? exam.exam.percentage : 'N/A',
            mandatory: exam.mandatory
        })
        examStudentChartData.push({
            name: exam.exam ? exam.exam.name : 'N/A',
            type: "Điểm đạt được",
            score: exam.final_result
        })

        examStudentChartData.push({
            name: exam.exam ? exam.exam.name : 'N/A',
            type: "Điểm tối đa",
            score: exam.exam ? exam.exam.max_score : 'N/A'
        })
    });

    const assignmentData = assignments.map((assignment, index) => ({
        stt: index + 1,
        name: assignment.assignment.name,
        date: assignment.modified_date,
        result: assignment.score,
        percentage: assignment.assignment.percentage,
        isPass: assignment.is_pass,
        mandatory: assignment.assignment.mandatory
    }))

    const normalizeGrade = () => {
        if (finalResult.finalResult) {
            const grade = finalResult.finalResult * 10 / totalGrade
            return grade.toFixed(2)
        }
        return null
    }


    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Tổng hợp điểm
            </h3>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bài kiểm tra" key="1">
                    <Table dataSource={examData} columns={columns} />
                    <Chart
                        scale={{ score: { min: 0 } }} padding={[30, 20, 50, 40]}
                        autoFit height={320} data={examStudentChartData} >
                        <Line shape="smooth" position="name*score" color="type" label="score" />
                        <Point position="name*score" color="type" />
                    </Chart>
                </TabPane>
                <TabPane tab="Bài assignment" key="2">
                    <Table dataSource={assignmentData} columns={columns} />
                </TabPane>

                <TabPane tab="Điểm tổng kết" key="3">

                    <h3 className="text--sub__bigger3 text-black mt-3">
                        Điểm tổng kết từ giảng viên: {finalScore || 'Chưa tổng kết điểm'}
                    </h3>
                    <p className="text--sub__bigger2">Tình trạng lớp: {
                        classStatus == 'pass' ? 'Đạt' : classStatus == 'fail' ? 'Không đạt' : 'Chưa tổng kết'
                    }
                    </p>

                    <Divider />
                    <h3 className="text--sub__bigger3 text-black">
                        Điểm tổng hiện tại của lớp: {totalGrade}
                    </h3>

                    <h3 className="text--sub__bigger3 text-black">
                        Điểm tổng hiện tại: {finalResult.finalResult ? finalResult.finalResult.toFixed(2) : 'Chưa có'}
                    </h3>

                    <h3 className="text--sub__bigger3 text-black">
                        Điểm tổng kết tạm tính (thang điểm 10): {normalizeGrade() ? normalizeGrade() : 'Chưa có'}
                    </h3>
                    <p className="text--sub__bigger2">Tình trạng điểm: {
                        finalResult.qualified ? 'Đạt yêu cầu' : 'Chưa đạt yêu cầu'
                    }
                    </p>
                    <p className="text--sub__bigger2">
                        {
                            !finalResult.qualified ?
                                `Lý do: ${normalizeGrade() < 5 ? 'Điểm dưới 5, và có' : null} các bài kiểm tra, hoặc bài assignment chưa đạt yêu cầu: ${finalResult.unDoneTasks}`
                                : null
                        }
                    </p>
                </TabPane>

            </Tabs>
        </section>
    )
};

export default CourseHomeGradesStudent
import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Tag } from 'antd'
import Constants from '../../constants'

import { getStudentGradesByCourseHomeAPI } from '../../api/grades.services'
import { formatDate } from '../../utils/text.utils'

import { Chart, Line, Point } from 'bizcharts';

const { TabPane } = Tabs

const CourseHomeGradesStudent = ({ token, courseHomeId }) => {

    const [loading, setLoading] = useState(false)
    const [assignments, setAssignments] = useState([])
    const [exams, setExams] = useState([])

    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const result = await getStudentGradesByCourseHomeAPI({ token, courseHomeId })
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
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Đạt yêu cầu',
            dataIndex: 'isPass',
            key: 'isPass',
            filters: [
                {
                    text: 'Đạt',
                    value: true,
                },
                {
                    text: 'Không đạt',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.isPass === value,
            render: isPass => <span>{isPass ? <Tag color="#63ace5">Đạt</Tag> : <Tag color="#f50">Không đạt</Tag>}</span>,
        },
        {
            title: 'Phần trăm điểm',
            dataIndex: 'percentage',
            key: 'percentage',
            render: percentage => <span>{percentage}%</span>
        }
    ];

    let examData = []
    let examStudentChartData = []
    exams.forEach((exam, index) => {
        examData.push({
            stt: index + 1,
            name: exam.exam ? exam.exam.name : 'N/A',
            date: exam.last_update,
            result: exam.final_result,
            isPass: exam.is_pass,
            percentage: exam.exam ? exam.exam.percentage : 'N/A'
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
        percentage: assignment.assignment.percentage
    }))

    const calFinalScore = () => {
        let finalResult = 0
        exams.forEach(exam => {
            if (exam.exam) {
                finalResult += exam.final_result * exam.exam.percentage / 100
            }
        })
        assignments.forEach(ass => {
            finalResult += ass.score * ass.assignment.percentage / 100
        })
        return finalResult
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
                    <h3 className="text--main">Điểm tổng kết tạm tính: {calFinalScore()}</h3>
                </TabPane>

            </Tabs>
        </section>
    )
};

export default CourseHomeGradesStudent
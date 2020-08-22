import React, { useState, useEffect } from 'react'
import { message, Tabs, Table } from 'antd'
import Constants from '../../constants'

import { getStudentGradesAPI } from '../../api/grades.services'
import { formatDate } from '../../utils/text.utils'

import { Chart, Line, Point } from 'bizcharts';

const { TabPane } = Tabs

const CourseHomeGradesStudent = ({ token, courseHomeId }) => {

    const [loading, setLoading] = useState(false)
    const [assignments, setAssingments] = useState([])
    const [exams, setExams] = useState([])

    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const result = await getStudentGradesAPI({ token, courseHomeId })
            setExams(result.data.student_exams)
            setAssingments(result.data.student_assignments)
            // calculateExam(result.data.student_exams)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token && courseHomeId) getStudentGrades()
    }, [token, courseHomeId])

    // const groupByExamId = (lst, key) => {
    //     return lst.reduce((rv, x) => {
    //         (rv[x['exam'][key]] = rv[x['exam'][key]] || []).push(x)
    //         return rv
    //     }, {})
    // }

    // const calculateResult = (type, exams) => {
    //     const resultList = exams.map(exam => exam.result)

    //     if (type === Constants.EXAM_GET_BEST) {
    //         return Math.max(...resultList)
    //     }
    //     if (type === Constants.EXAM_GET_AVERAGE) {
    //         const sum = resultList.reduce((x, y) => x + y, 0)
    //         return sum / resultList.length
    //     }
    //     return resultList[0]
    // }

    // const calculateExam = (exams) => {
    //     const res = groupByExamId(exams, 'id')
    //     let examList = []
    //     Object.keys(res).forEach(key => {
    //         const exams = res[key]
    //         const type = exams[0].exam.get_result_type
    //         const exam_type = exams[0].exam.exam_type
    //         const result = calculateResult(type, exams)
    //         examList.push({
    //             result,
    //             exam: exams[0].exam
    //         })
    //     })
    //     setExams(examList)
    // }

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
        }
    ];

    let examData = []
    let examStudentChartData = []
    exams.foreEach((exam, index) => {
        examData.push({
            stt: index + 1,
            name: exam.exam.name,
            date: exam.last_update,
            result: exam.final_result
        })
        examStudentChartData.push({
            name: exam.name.name,
            type: "Điểm đạt được",
            score: exam.final_result
        })

        examStudentChartData.push({
            name: exam.exam.name,
            type: "Điểm tối đa",
            score: exam.exam.max_score
        })
    });

    const assignmentData = assignments.map((assignment, index) => ({
        stt: index + 1,
        name: assignment.assignment.name,
        date: assignment.modified_date,
        result: assignment.score
    }))



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
                        <Line shape="smooth" position="name*score" color="name" label="score" />
                        <Point position="name*score" color="name" />
                    </Chart>
                </TabPane>
                <TabPane tab="Bài assignment" key="2">
                    <Table dataSource={assignmentData} columns={columns} />
                </TabPane>

            </Tabs>
        </section>
    )
};

export default CourseHomeGradesStudent
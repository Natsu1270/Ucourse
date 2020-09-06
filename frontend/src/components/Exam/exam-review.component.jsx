import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapKeys } from 'lodash'

import {
    Button, Checkbox, Form, Radio, message, Popconfirm, Row,
    Col, Tag, Space, Statistic, Result, Spin
} from 'antd'
import { parseHtml } from "../../utils/text.utils";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import {
    formItemLayout, renderChoice, renderQuestion, renderResultQuestion,
} from './exam.utils'
import { reviewExamAPI } from '../../api/exam.services';
import Constants from '../../constants';


const ExamReview = ({ token, exam, studentExamId }) => {

    const [responses, setResponses] = useState(null)
    const [loading, setLoading] = useState(false)
    const [studentExam, setStudentExam] = useState({})
    const questions = exam.questions

    const getStudentExam = async () => {
        setLoading(true)
        try {
            const { data } = await reviewExamAPI({ token, studentExamId })
            setStudentExam(data)
            setResponses(data.responses)
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }


    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })
    }, [])

    useEffect(() => {
        if (token, studentExamId) {
            getStudentExam()
        }
    }, [studentExamId])

    return (
        <section className="section-10 exam-detail">

            <Spin spinning={loading} indicator={Constants.SPIN_ICON}>
                <Row className="exam-detail--info">
                    <Col span={10}>
                        <h1 className="exam-detail--title">
                            {exam.name}
                        </h1>
                        <h3 className="exam-detail--sub-title">
                            Tổng điểm: {studentExam.result} / {exam.max_score}
                        </h3>
                    </Col>
                    <Col span={12} style={{ fontSize: '2.5rem', fontWeight: '500' }}>
                        {
                            <Tag style={{ fontSize: '2rem', padding: '1rem 2rem' }} color="#f50">Xem lại</Tag>
                        }

                    </Col>
                </Row>
                <div className="exam-detail--content">
                    <Form
                        name="exam-detail-form"
                        {...formItemLayout}
                    >
                        {
                            questions.map((question, index) => (
                                <div className="choices" key={question.id}>
                                    <div
                                        className="exam-detail--content--question__header dis-flex-start">
                                        <span>{index + 1}. </span> {parseHtml(question.content)}
                                    </div>

                                    <Form.Item
                                        name={question.id}
                                        label="">
                                        {
                                            responses ? renderResultQuestion(question, responses) : null
                                        }
                                    </Form.Item>
                                </div>
                            ))
                        }
                    </Form>
                </div>
            </Spin>

        </section>
    )
}

export default ExamReview
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapKeys } from 'lodash'

import {
    Button, Checkbox, Form, Radio, message, Popconfirm, Row,
    Col, Tag, Space, Statistic, Result, Spin, Alert
} from 'antd'
import { parseHtml } from "../../utils/text.utils";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import { isProcessingSelector } from "../../redux/Exam/exam.selects";
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import { submitExam } from '../../api/exam.services';
import { renderChoice, renderQuestion, renderResultQuestion, formItemLayout } from './exam.utils'
import Constants from '../../constants';

const { Countdown } = Statistic


const ExamDetail = ({ exam, token, courseHomeId, studentExamId, randomQuestions }) => {

    const [finished, setFinished] = useState(false)
    const [responses, setResponses] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const isSubmitting = useSelector(state => isProcessingSelector(state))
    // const questions = exam.questions


    const [form] = Form.useForm();
    const submitForm = () => {
        form.submit()
    }


    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })
    }, [])

    const calResult = (responses, questions) => {
        let result = 0;
        const norQuestions = mapKeys(questions, "id")
        Object.keys(responses).forEach(r => {
            const responseChoices = Array.isArray(responses[r]) ? responses[r] : [responses[r]]
            const rightChoices = norQuestions[r].answers
            const pointUnit = norQuestions[r].score / rightChoices.length
            rightChoices.forEach(c => {
                if (responseChoices.includes(c)) {
                    result += pointUnit
                }
            })
        })
        return result;
    }

    const onFinish = (values) => {
        console.log(values)
        setResponses(values)
        const questionResponses = Object.keys(values).map(q => {
            if (values[q]) {
                return {
                    question: q,
                    choices: Array.isArray(values[q]) ? values[q] : [values[q]]
                }
            }
        })
        const responses = questionResponses.filter(response => response)
        const result = calResult(values, randomQuestions)
        submitQuiz({ token, exam: exam.id, result, responses, courseHomeId, studentExamId })
    }

    const key = 'updatable';

    const submitQuiz = async (params) => {
        setLoading(false)
        message.loading({ content: 'Gửi bài làm...', key });
        try {
            const { data } = await submitExam(params)
            message.success({ content: 'Hoàn thành!', key, duration: 2 })
            setFinished(true)
        }
        catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }



    return (
        <section className="section-10 exam-detail">
            <Spin spinning={loading} indicator={Constants.SPIN_ICON}>

                {
                    !finished ?
                        randomQuestions.length > 0 ?
                            <div><Row className="exam-detail--info">
                                <Col span={10}>
                                    <h1 className="exam-detail--title">
                                        {exam.name}
                                    </h1>
                                    <h3 className="exam-detail--sub-title">
                                        Tổng điểm:
                                    </h3>
                                </Col>
                                <Col span={12} style={{ fontSize: '2.5rem', fontWeight: '500' }}>
                                    {
                                        !finished ? <Space>
                                            <ClockCircleTwoTone spin />
                                            <Countdown
                                                value={Date.now() + exam.duration * 1000}
                                                onFinish={submitForm}
                                            >
                                            </Countdown>
                                        </Space> : <Tag style={{ fontSize: '1.8rem' }} color="#f50">Hoàn thành</Tag>
                                    }

                                </Col>
                            </Row>
                                <div className="exam-detail--content">
                                    <Form
                                        name="exam-detail-form"
                                        onFinish={onFinish}
                                        form={form}
                                        {...formItemLayout}
                                    >
                                        {
                                            randomQuestions.map((question, index) => (
                                                <div className="choices" key={question.id}>
                                                    <div
                                                        className="exam-detail--content--question__header dis-flex-start">
                                                        <span>{index + 1}. </span> {parseHtml(question.content)}
                                                    </div>

                                                    <Form.Item
                                                        name={question.id}
                                                        label="">
                                                        {
                                                            renderQuestion(question)
                                                        }
                                                    </Form.Item>
                                                </div>
                                            ))
                                        }
                                        <Form.Item hidden={finished} className="text-center">
                                            <Popconfirm
                                                title="Hoàn thành bài kiểm tra ?"
                                                onConfirm={submitForm}
                                                okText="Xác nhận"
                                                cancelText="Tiếp tục làm"
                                            >
                                                <Button type="primary" htmlType="button">
                                                    Hoàn tất
                                </Button>
                                            </Popconfirm>

                                        </Form.Item>

                                    </Form>

                                </div>
                            </div>
                            :
                            <Result
                                status="404"
                                title="No questions"
                                subTitle="Xin lỗi, giảng viên chưa thêm câu hỏi cho bài kiểm tra này"
                            /> : <Alert
                            message="Nộp bài thành công"
                            description="Bài làm đã được ghi nhận"
                            type="success"
                            showIcon
                        />
                }

            </Spin>

        </section>
    )
}

export default ExamDetail
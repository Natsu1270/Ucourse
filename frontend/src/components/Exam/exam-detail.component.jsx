import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapKeys } from 'lodash'

import { Button, Checkbox, Form, Radio, message, Popconfirm, Row, Col, Tag, Space, Statistic } from 'antd'
import { parseHtml } from "../../utils/text.utils";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import { submitExamStart } from "../../redux/Exam/exam.actions";
import { isProcessingSelector } from "../../redux/Exam/exam.selects";
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";

const { Countdown } = Statistic


const ExamDetail = ({ exam, token }) => {

    const [finished, setFinished] = useState(false)
    const [responses, setResponses] = useState(null)
    const dispatch = useDispatch()
    const isSubmitting = useSelector(state => isProcessingSelector(state))
    const questions = exam.questions

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };
    const radioStyle = {
        display: 'flex',
        whiteSpace: 'normal',
        margin: '0.4rem 0 0 0',
        paddingLeft: '1.8rem',
        borderRadius: '0.5rem'
    };
    const radioStyleRight = {
        ...radioStyle,
        backgroundColor: 'rgba(102,255,102,0.2)'
    }

    const radioStyleRightChoice = {
        ...radioStyle,
        backgroundColor: '#66ff6675'
    }

    const radioStyleWrong = {
        ...radioStyle,
        backgroundColor: '#ff2c2c85'
    }

    const [form] = Form.useForm();
    const submitForm = () => {
        form.submit()
    }

    const key = 'updatable';

    const openMessage = () => {
        if (isSubmitting) {
            message.loading({ content: 'Đang xử lý', key });
        } else {
            message.success({ content: 'Hoàn tất!', key, duration: 2 });
            setFinished(true)
        }
    };


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
        const result = calResult(values, questions)
        dispatch(submitExamStart({ token, exam: exam.id, result, responses }))
        openMessage()
    }

    const renderChoice = (question, choice) => {
        const answers = question.answers;
        const responseChoices = Array.isArray(responses[question.id]) ? responses[question.id] : [responses[question.id]]
        if (responseChoices.includes(choice.id)) {
            if (answers.includes(choice.id)) {
                return (
                    <Radio defaultChecked key={choice.id} style={radioStyleRightChoice}
                        className='radio-choice'
                        value={choice.id}>
                        {parseHtml(choice.content)} <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </Radio>)
            } else {
                return (
                    <Radio defaultChecked key={choice.id} style={radioStyleWrong}
                        className='radio-choice'
                        value={choice.id}>
                        {parseHtml(choice.content)}
                    </Radio>)
            }
        } else if (answers.includes(choice.id)) {
            return (
                <Radio key={choice.id} style={radioStyleRight} className='radio-choice'
                    value={choice.id}>
                    {parseHtml(choice.content)}
                </Radio>)
        } else {
            return (
                <Radio key={choice.id} style={radioStyle} className='radio-choice'
                    value={choice.id}>
                    {parseHtml(choice.content)}
                </Radio>
            )
        }


    }

    const renderResultQuestion = (question) => {
        return (
            <Radio.Group>
                <p className="pl-4 mt-2">Chọn một hoặc hơn</p>
                {
                    question.choices.map(choice => {
                        return renderChoice(question, choice)
                    })
                }
            </Radio.Group>
        )
    }

    const renderQuestion = (question) => {
        const type = question.question_type
        if (type === "cb") {
            return (
                <Checkbox.Group>
                    <p className="pl-4 mt-2">Chọn một hoặc hơn</p>
                    {
                        question.choices.map(choice => (
                            <Checkbox key={choice.id} style={radioStyle}
                                className='radio-choice' value={choice.id}>
                                {parseHtml(choice.content)}
                            </Checkbox>
                        ))
                    }
                </Checkbox.Group>
            )
        } else {
            return (
                <Radio.Group>
                    <p className="pl-4 mt-2">Chọn một</p>
                    {
                        question.choices.map(choice => (
                            <Radio key={choice.id} style={radioStyle}
                                className='radio-choice' value={choice.id}>
                                {parseHtml(choice.content)}
                            </Radio>
                        ))
                    }
                </Radio.Group>
            )
        }
    }


    return (
        <section className="section-10 exam-detail">
            <Row className="exam-detail--info">
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
                        </Space> : <Tag color="red">Hết thời gian làm bài</Tag>
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
                                        !finished ?
                                            renderQuestion(question) : renderResultQuestion(question)
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
        </section>
    )
}

export default ExamDetail
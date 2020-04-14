import React, { useState, useRef, useEffect } from 'react'
import { Progress } from 'antd'
import { Form, Radio, Carousel, Button, notification } from 'antd'
import { parseHtml, secondToTime } from '../../utils/text.utils'
import { ClockCircleOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'

const AbilityTestForm = ({ duration, questions }) => {

    const [timer, setTimer] = useState(duration)
    const [timer2, setTimer2] = useState(duration)
    const carouselRef = useRef()
    const [index, setIndex] = useState(0)
    const [form] = Form.useForm()

    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })
    }, [])

    setTimeout(() => {
        setTimer(timer - 0.05)
    }, 50)

    setTimeout(() => {
        setTimer2(timer2 - 1)
    }, 1000)

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };

    const nextQuestion = () => {
        carouselRef.current.next()
    }

    const prevQuestion = () => {
        carouselRef.current.prev()
    }

    const be4Change = (prev, next) => {
        setIndex(next)
    }

    const unDoneNotification = () => {
        const key = `open${Date.now()}`
        const btn = (<Button type="primary" size="small" onClick={() => notification.close(key)}>
            Xác nhận
        </Button>)
        notification.open({
            message: 'Xác nhận',
            description: 'Một số câu hỏi chưa được trả lời, bạn vẫn muốn submit?',
            btn,
            key,
        })
    }

    const onFinish = (values) => {
        console.log('responses: ', values)
        const valuesList = Object.values(values)
        const isDone = valuesList.some(choice => choice === undefined)
        if (isDone) {
            unDoneNotification()
        } else {
            notification.close()
        }
    }

    const submitForm = () => {
        form.submit()
    }

    const radioStyle = {
        display: 'flex',
        whiteSpace: 'normal',
        marginTop: '2rem'
    };


    const timeToPercentage = time => time / duration * 100
    const percentageToTime = percent => percent / 100 * duration

    return (
        <div className="ability-test-form">
            <div className="ability-test-form__timer">
                <h3 className="ability-test-form__timer--info">
                    Thời gian còn lại: <ClockCircleOutlined /> {secondToTime(timer2)}
                </h3>

                <div className="ability-test-form__timer--progress">
                    <Progress
                        type="line"
                        percent={timeToPercentage(timer)}
                        showInfo={false}
                    />
                </div>
                <div className="ability-test-form__arrow">
                    <div className="ability-test-form__arrow--left dis-flex-start">
                        <Button
                            onClick={prevQuestion}
                            disabled={index === 0}
                            type="primary"><LeftCircleOutlined /> Câu trước</Button>
                    </div>

                    <Button onClick={submitForm} type="danger">
                        Hoàn tất
                    </Button>

                    <div className="ability-test-form__arrow--right dis-flex-start">
                        <Button
                            onClick={nextQuestion}
                            disabled={index === questions.length - 1}
                            type="primary">Câu tiếp <RightCircleOutlined /></Button>
                    </div>
                </div>

            </div>
            <div className="ability-test-form__content mt-4">
                <div className="ability-test-form__content--question">
                    <Form
                        name="questionsForm"
                        onFinish={onFinish}
                        form={form}
                        {...formItemLayout}>
                        <Carousel
                            ref={ref => carouselRef.current = ref}
                            dots={false}
                            infinite={false}
                            beforeChange={be4Change}
                            className="ability-test-form__content--carousel">
                            {
                                questions.map((question, index) => (
                                    <div className="choices">
                                        <div className="ability-test-form__content--question__header dis-flex-start">
                                            <span>{`Câu ${index + 1}: `}</span>{parseHtml(question.content)}
                                        </div>

                                        <Form.Item
                                            name={question.id}
                                            key={question.id}
                                            label="">

                                            <Radio.Group>
                                                {
                                                    question.choices.map(choice => (
                                                        <Radio key={choice.id} style={radioStyle} className='radio-choice' value={choice.id}>
                                                            {parseHtml(choice.content)}
                                                        </Radio>
                                                    ))
                                                }
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                ))
                            }

                        </Carousel>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AbilityTestForm
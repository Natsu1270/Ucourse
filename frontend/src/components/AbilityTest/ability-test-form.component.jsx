import React, { useState, useRef } from 'react'
import { Progress } from 'antd'
import { Form, Radio, Carousel, Button } from 'antd'
import { parseHtml, secondToTime } from '../../utils/text.utils'
import { ClockCircleOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'


const AbilityTestForm = ({ duration, questions }) => {

    const [timer, setTimer] = useState(duration)
    const [timer2, setTimer2] = useState(duration)
    const carouselRef = useRef()
    const [index, setIndex] = useState(0)

    setTimeout(() => {
        setTimer(timer - 0.05)
    }, 50)

    setTimeout(() => {
        setTimer2(timer2 - 1)
    }, 1000)

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
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
                        {...formItemLayout}>
                        <Carousel
                            ref={ref => carouselRef.current = ref}
                            dots={false}
                            infinite={false}
                            beforeChange={be4Change}
                            className="ability-test-form__content--carousel">
                            {
                                questions.map((question, index) => (
                                    <Form.Item
                                        name="radio-group"
                                        label={`Câu hỏi ${index + 1}/${questions.length}`}>
                                        <div className="ability-test-form__content--question__header">
                                            {parseHtml(question.content)}
                                        </div>
                                        <Radio.Group>
                                            {
                                                question.choices.map(choice => (
                                                    <Radio value={choice.id}>
                                                        {parseHtml(choice.content)}
                                                    </Radio>
                                                ))
                                            }
                                        </Radio.Group>
                                    </Form.Item>
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
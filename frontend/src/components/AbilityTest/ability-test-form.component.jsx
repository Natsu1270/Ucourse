import React, {useState, useRef, useEffect} from 'react'
import {Progress} from 'antd'
import {Form, Radio, Carousel, Button, notification} from 'antd'
import {parseHtml, secondToTime} from '../../utils/text.utils'
import {ClockCircleOutlined, LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import {useDispatch, useSelector} from "react-redux";
import {submitAbilityTestStart} from "../../redux/AbilityTest/abilityTest.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import AbilityTestResult from "./ability-test-result.component";

const AbilityTestForm = ({duration, questions, uATId}) => {

    const dispatch = useDispatch()
    const [timer, setTimer] = useState(duration)
    const [isFinish, setIsFinish] = useState(false)
    const [result, setResult] = useState(0)
    const [response, setResponse] = useState(null)
    const carouselRef = useRef()
    const [index, setIndex] = useState(0)
    const [form] = Form.useForm()
    const token = useSelector(state => tokenSelector(state));


    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })
    }, [])

    useEffect(() => {
        if (timer === 0) {
            // dispatch(submitAbilityTestStart({token, result, user_responses, id: uATId}))
            setIsFinish(true)
        } else {
            setTimeout(() => {
                setTimer(timer - 1)
            }, 1000)
        }
    }, [timer])


    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 24},
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

    const unDoneNotification = (result, user_responses) => {
        const key = `open${Date.now()}`
        const btn = (<div>
            <Button className="mr-2" danger size="small" onClick={() => {
                notification.close(key)
                const params = {
                    token, result, user_responses, id: uATId
                }
                dispatch(submitAbilityTestStart(params))
                setIsFinish(true)
            }}>
                Xác nhận
            </Button>
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Huỷ
            </Button>
        </div>)
        notification.open({
            message: 'Xác nhận',
            description: 'Một số câu hỏi chưa được trả lời, bạn vẫn muốn submit?',
            btn,
            key,
            duration: null
        })
    }


    const onFinish = (values) => {
        console.log('responses: ', values)
        setResponse(values)
        const user_responses = Object.values(values).filter(c => c)
        const valuesList = Object.values(values)
        const isUnCompleted = valuesList.some(choice => choice === undefined)
        const result = calResult(values)
        setResult(result)
        if (isUnCompleted) {
            unDoneNotification(result, user_responses)
        } else {
            dispatch(submitAbilityTestStart({token, result, user_responses, id: uATId}))
            setIsFinish(true)
        }
    }

    const submitForm = () => {
        form.submit()
    }

    const calResult = response => {
        const choices = Object.values(response)
        let answers = []
        let score = 0

        questions.forEach(question => {
            const answer = question.choices.find(choice => choice.is_answer === true)
            answer ? answers.push(answer.id) : answers.push(-1)
        })
        choices.forEach((c, index) => {
            if (c === answers[index]) {
                score += 1
            }
        })
        return score
    }


    const radioStyle = {
        display: 'flex',
        whiteSpace: 'normal',
        marginTop: '2rem'
    };


    const timeToPercentage = time => time / duration * 100

    if (isFinish) {
        return <AbilityTestResult result={result} questions={questions} responses={response}/>
    } else {
        return (
            <div className="ability-test-form">
                <div className="ability-test-form__timer">
                    <h3 className="ability-test-form__timer--info">
                        Thời gian còn lại: <ClockCircleOutlined/> {secondToTime(timer)}
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
                                type="primary"><LeftCircleOutlined/> Câu trước</Button>
                        </div>

                        <Button onClick={submitForm} type="danger">
                            Hoàn tất
                        </Button>

                        <div className="ability-test-form__arrow--right dis-flex-start">
                            <Button
                                onClick={nextQuestion}
                                disabled={index === questions.length - 1}
                                type="primary">Câu tiếp <RightCircleOutlined/></Button>
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
                                        <div className="choices" key={question.id}>
                                            <div
                                                className="ability-test-form__content--question__header dis-flex-start">
                                                <span>{`Câu ${index + 1}: `}</span>{parseHtml(question.content)}
                                            </div>

                                            <Form.Item
                                                name={question.id}

                                                label="">

                                                <Radio.Group>
                                                    {
                                                        question.choices.map(choice => (
                                                            <Radio key={choice.id} style={radioStyle}
                                                                   className='radio-choice' value={choice.id}>
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
}

export default AbilityTestForm
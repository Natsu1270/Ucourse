import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Button, Form, Radio} from 'antd'
import {parseHtml} from "../../utils/text.utils";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import {submitExamStart} from "../../redux/Exam/exam.actions";


const ExamDetail = ({exam, token}) => {

    const dispatch = useDispatch()

    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 24},
    };
    const questions = exam.questions
    const radioStyle = {
        display: 'flex',
        whiteSpace: 'normal',
        marginTop: '0.4rem',
        paddingLeft: '1.8rem'
    };
    const [form] = Form.useForm();
    const submitForm = () => {
        form.submit()
    }


    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })
    }, [])

    const onFinish = (values) => {
        console.log(values)
        const questionResponses = Object.keys(values).map(q => {
            if (values[q]) {
                return {
                    question: q,
                    choices: [values[q]]
                }
            }
        })
        const responses = questionResponses.filter(response => response)
        dispatch(submitExamStart({token, exam: exam.id, result:1, responses}))
    }


    return (
        <section className="section-10 exam-detail">
            <div className="exam-detail--info">
                <h1 className="exam-detail--title">
                    {exam.name}
                </h1>
                <h3 className="exam-detail--sub-title">
                    Tổng điểm:
                </h3>
            </div>
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
                </Form>
                <Button onClick={submitForm} type="primary">
                    Hoàn tất
                </Button>
            </div>
        </section>
    )
}

export default ExamDetail
import React from 'react'
import {parseHtml, secondToTime} from "../../utils/text.utils";
import {Button, Form, Radio} from "antd";
import {CheckCircleTwoTone} from '@ant-design/icons'

const AbilityTestResult = ({questions, responses, result}) => {

    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 24},
    };

    const radioStyle = {
        display: 'flex',
        whiteSpace: 'normal',
        marginTop: '2rem'
    };

    const renderChoice = (question, choice) => {
        if (responses[question.id] === choice.id) {
            if (choice.is_answer) {
                return (
                    <Radio defaultChecked key={choice.id} style={{...radioStyle, backgroundColor: '#66ff6675'}} className='radio-choice'
                           value={choice.id}>
                        {parseHtml(choice.content)} <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </Radio>)
            } else {
                return (
                    <Radio defaultChecked key={choice.id} style={{...radioStyle, backgroundColor: '#ff2c2c85'}} className='radio-choice'
                           value={choice.id}>
                        {parseHtml(choice.content)}
                    </Radio>)
            }
        } else if (choice.is_answer) {
            return (
                <Radio key={choice.id}  style={{...radioStyle, backgroundColor: '#66ff6675'}} className='radio-choice'
                       value={choice.id}>
                    {parseHtml(choice.content)}
                </Radio>)
        } else {
            return (
                <Radio key={choice.id}  style={radioStyle} className='radio-choice'
                       value={choice.id}>
                    {parseHtml(choice.content)}
                </Radio>
            )
        }


    }

    return (
        <div className="ability-test-form">
            <div className="ability-test-form__timer">
                <h3 className="ability-test-form__timer--info">
                    Bạn trả lời đúng {`${result}/${questions.length}`} câu
                </h3>
            </div>
            <div className="ability-test-form__content mt-4">
                <div className="ability-test-form__content--question">
                    <Form
                        name="questionsForm"
                        {...formItemLayout}>
                        {
                            questions.map((question, index) => (
                                <div className="choices" key={question.id}>
                                    <div className="ability-test-form__content--question__header dis-flex-start">
                                        <span>{`Câu ${index + 1}: `}</span>{parseHtml(question.content)}
                                    </div>
                                    <Form.Item
                                        name={question.id}
                                        label="">
                                        <Radio.Group>
                                            {
                                                question.choices.map(choice => {
                                                    return renderChoice(question, choice)
                                                })
                                            }
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            ))
                        }
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AbilityTestResult
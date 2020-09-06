import React from 'react'
import { Radio, Checkbox } from 'antd'
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import { parseHtml } from '../../utils/text.utils';


export const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
};
export const radioStyle = {
    display: 'flex',
    whiteSpace: 'normal',
    margin: '0.4rem 0 0 0',
    paddingLeft: '1.8rem',
    borderRadius: '0.5rem'
};
export const radioStyleRight = {
    ...radioStyle,
    backgroundColor: 'rgba(102,255,102,0.2)'
}

export const radioStyleRightChoice = {
    ...radioStyle,
    backgroundColor: '#66ff6675'
}

export const radioStyleWrong = {
    ...radioStyle,
    backgroundColor: '#ff2c2c85'
}


export const renderChoice = (question, choice, responses) => {
    const answers = question.answers;
    const repsonseQuestion = responses.find(response => response.question == question.id)
    const responseChoices = repsonseQuestion.choices
    if (responseChoices.includes(choice.id)) {
        if (answers.includes(choice.id)) {
            return (
                <div>
                    <p className="text--sub__bigger" style={{ fontStyle: 'italic', color: "#7bc043" }}>
                        Bạn đã trả lời chính xác
                    </p>
                    <Radio defaultChecked key={choice.id} style={radioStyleRightChoice}
                        className='radio-choice'
                        value={choice.id}>
                        {parseHtml(choice.content)} <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </Radio>
                </div>)
        } else {
            return (
                <div>
                    <p className="text--sub__bigger" style={{ fontStyle: 'italic', color: "#f50" }}>
                        Bạn đã trả lời sai
                    </p>
                    <Radio defaultChecked key={choice.id} style={radioStyleWrong}
                        className='radio-choice'
                        value={choice.id}>
                        {parseHtml(choice.content)}
                    </Radio>
                </div>
            )
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

export const renderResultQuestion = (question, responses) => {
    return (
        <Radio.Group>
            <p className="pl-4 mt-2">Chọn một hoặc hơn</p>
            {
                question.choices.map(choice => {
                    return renderChoice(question, choice, responses)
                })
            }
        </Radio.Group>
    )
}

export const renderQuestion = (question) => {
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

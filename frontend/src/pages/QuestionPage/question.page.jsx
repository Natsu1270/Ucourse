import React from 'react'
import { Form, Input, Button, DatePicker, Select } from "antd";



const QuestionPage = ({ cusquestion, isLoading, token }) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields()
    };
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };
    const { Option } = Select;
    const { TextArea } = Input;
    const config = {
        rules: [{ type: 'object', required: false }],
    };
    const onFinish = fieldValues => {
        const values = {
            ...fieldValues,
            'birthday': fieldValues['birthday'] ? fieldValues['birthday'].format('YYYY-MM-DD') : undefined,
        };
        console.log('Received values of form: ', values);
    };

    return (
        <section className="section-10 page section--about cs-about">
            <h2 className="title--big text-center">Câu hỏi thường gặp</h2>
            <div className="row slide">
                <div className="col-md-7 cs-about--text cs-about--left bradius mt-3">
                    <span className="cs-about--text__main">Thắc mắc</span>
                    <p></p>
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    // initialValues={initFormValues}
                    >
                        <Form.Item name="full_name" label="Full Name">
                            <Input placeholder="Nguyen Van A..." />
                        </Form.Item>
                        <Form.Item name="email" label="Email">
                            <Input placeholder="abc@gmail.com..." />
                        </Form.Item>
                        <Form.Item name="phone_number" label="Phone Number">
                            <Input placeholder="Phone number..." />
                        </Form.Item>
                        <Form.Item name="birth_date" label="Birth Date" {...config}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Select placeholder="Gender..." style={{ width: '25%' }}>
                                <Option value="M">Male</Option>
                                <Option value="F">Female</Option>
                                <Option value="O">Other</Option>
                                <Option value="N">Rather not say</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="question" label="Question">
                            <textarea rows="4" cols="50" placeholder="Input question here..."></textarea>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className="mr-3">Submit</Button>
                            <Button htmlType="button" onClick={() => window.open('/', '_self')}>
                                Cancel
                    </Button>
                        </Form.Item>
                    </Form>
                    <br />
                </div>

                <div className="col-md-5 cs-about--text cs-about--left bradius mt-3">
                    <span className="cs-about--text__main">Các câu hỏi</span>
                    <div className="cs-about--text__sub">
                        <p>1. Giáo viên giảng dạy có nhiều kinh nghiệm không? </p>
                        <p>Trả lời: Đội ngũ Giảng viên của trung tâm Ucourse có dày dặn kinh nghiệm trong việc giảng dạy. Kể cả giảng dạy trực tuyến cũng như giảng dạy trực tiếp với học viên. Nên bạn hoàn toàn không cần lo ngại về vấn đề này nhé.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default QuestionPage
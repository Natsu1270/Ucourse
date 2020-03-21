import React from 'react'

import { Form, Input, Button, DatePicker, Select, Switch, Checkbox } from "antd";
import moment from 'moment';
import Constants from "../../../constants";

const ProfileSetting = () => {
    const [form] = Form.useForm()

    const onReset = () => {
        form.resetFields()
    }
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    }
    const { Option } = Select
    const { TextArea } = Input;
    const config = {
        rules: [{ type: 'object', required: false }],
    };
    const onFinish = fieldValues => {
        const values = {
            ...fieldValues,
            'birthday': fieldValues['birthday'].format('YYYY-MM-DD'),
        }
        console.log('Received values of form: ', values);
    };

    return (
        <div className="profile-setting">
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Form.Item name="firstname" label="First Name">
                    <Input placeholder="First name..." />
                </Form.Item>
                <Form.Item name="lastname" label="Last Name">
                    <Input placeholder="Last name..." />
                </Form.Item>
                <Form.Item name="phone" label="Phone Number">
                    <Input placeholder="Phone number..." />
                </Form.Item>
                <Form.Item name="birthday" label="Birth Date" {...config}>
                    <DatePicker format={Constants.DATE_FORMAT} />
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                    <Select placeholder="Gender..." style={{ width: '25%' }}>
                        <Option value="M">Male</Option>
                        <Option value="F">Female</Option>
                        <Option value="O">Other</Option>
                        <Option value="N">Rather not say</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="adress" label="Address">
                    <Input placeholder="Address..." />
                </Form.Item>
                <Form.Item name="bio" label="Bio">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item name="university" label="University">
                    <Input placeholder="University..." />
                </Form.Item>

                <Form.Item name="major" label="Major">
                    <Input placeholder="Major..." />
                </Form.Item>

                <Form.Item name="occupation" label="Occupation">
                    <Input placeholder="Occupation..." />
                </Form.Item>

                <Form.Item name="public-info" valuePropName="checked" label="Show info">
                    <Switch />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="mr-3">Submit</Button>
                    <Button htmlType="button" onClick={onReset} className="mr-3">
                        Reset
                    </Button>
                    <Button htmlType="button" onClick={() => window.open('/', '_self')}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProfileSetting
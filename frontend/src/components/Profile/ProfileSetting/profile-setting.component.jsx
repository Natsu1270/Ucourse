import React, {useState} from 'react'

import {Form, Input, Button, DatePicker, Select, Switch, Checkbox, message} from "antd";
import moment from 'moment';
import Constants from "../../../constants";
import WithSpinner from "../../Hocs/with-spinner.component";
import {updateProfileAPI} from "../../../api/profile.services";

const ProfileSetting = ({profile, isLoading, token}) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const initFormValues = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        address: profile.address,
        bio: profile.bio,
        university: profile.university,
        major: profile.major,
        occupation: profile.occupation,
        public_info: profile.public_info,
        birth_date: profile.birth_date ? moment(profile.birth_date, Constants.DATE_FORMAT) : undefined,
        gender: profile.gender,
    };
    const onReset = () => {
        form.resetFields()
    };
    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
    const {Option} = Select;
    const {TextArea} = Input;
    const config = {
        rules: [{type: 'object', required: false}],
    };
    const onFinish = async fieldValues => {
        setLoading(true)
        const values = {
            ...fieldValues,
            'birthday': fieldValues['birthday'] ? fieldValues['birthday'].format('YYYY-MM-DD') : undefined,
        };
        console.log('Received values of form: ', values);
        try {
            await updateProfileAPI({
                ...values,
                birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : undefined,
                token
            })
            message.success("Cập nhật thông tin cá nhân thành công!")
        } catch (e) {
            message.error("Có lỗi xảy ra: " + e.message)
        }
        setLoading(false)

        // dispatch(updateProfileStart(
        //     {...values,
        //         birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : undefined,
        //         token
        //     }
        //     ))
    };

    return (
        <div className="profile-setting">
            <h3 className="text--main profile-setting__title">
                Thông tin cá nhân
            </h3>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                initialValues={initFormValues}
            >
                <Form.Item name="first_name" label="Họ và lót">
                    <Input placeholder="First name..."/>
                </Form.Item>
                <Form.Item name="last_name" label="Tên">
                    <Input placeholder="Last name..."/>
                </Form.Item>
                <Form.Item name="phone_number" label="Số điện thoại">
                    <Input placeholder="Phone number..."/>
                </Form.Item>
                <Form.Item name="birth_date" label="Ngày sinh" {...config}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item name="gender" label="Giới tính">
                    <Select placeholder="Gender..." style={{width: '25%'}}>
                        <Option value="M">Male</Option>
                        <Option value="F">Female</Option>
                        <Option value="O">Other</Option>
                        <Option value="N">Rather not say</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ">
                    <Input placeholder="Address..."/>
                </Form.Item>
                <Form.Item name="bio" label="Giới thiệu bản thân">
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item name="university" label="Trường đại học/ cao đẳng">
                    <Input placeholder="BKU, HUTECH..."/>
                </Form.Item>

                <Form.Item name="major" label="Chuyên môn">
                    <Input placeholder="Computer science..."/>
                </Form.Item>

                <Form.Item name="occupation" label="Nghê nghiệp">
                    <Input placeholder="IT..."/>
                </Form.Item>

                <Form.Item name="public_info" valuePropName="checked" label="Công khai thông tin">
                    <Switch/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button loading={loading} type="primary" htmlType="submit" className="mr-3">Cập nhật</Button>
                    <Button loading={loading} danger htmlType="button" onClick={onReset} className="mr-3">
                        Reset
                    </Button>
                    <Button loading={loading} htmlType="button" onClick={() => window.open('/', '_self')}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default WithSpinner(ProfileSetting)
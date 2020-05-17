import React from 'react'

import {Form, Input, Button, DatePicker, Select, Switch, Checkbox} from "antd";
import moment from 'moment';
import Constants from "../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {profileLoadingSelector} from "../../../redux/Profile/profile.selects";
import WithSpinner from "../../Hocs/with-spinner.component";
import {updateProfileStart} from "../../../redux/Profile/profile.actions";

const ProfileSetting = ({profile, isLoading, token}) => {
    const dispatch = useDispatch()
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
        labelCol: {span: 4},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 4, span: 16},
    };
    const {Option} = Select;
    const {TextArea} = Input;
    const config = {
        rules: [{type: 'object', required: false}],
    };
    const onFinish = fieldValues => {
        const values = {
            ...fieldValues,
            'birthday': fieldValues['birthday'] ? fieldValues['birthday'].format('YYYY-MM-DD') : undefined,
        };
        console.log('Received values of form: ', values);

        dispatch(updateProfileStart(
            {...values,
                birth_date: values.birth_date ? values.birth_date.format('YYYY-MM-DD') : undefined,
                token
            }
            ))
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
                <Form.Item name="first_name" label="First Name">
                    <Input placeholder="First name..."/>
                </Form.Item>
                <Form.Item name="last_name" label="Last Name">
                    <Input placeholder="Last name..."/>
                </Form.Item>
                <Form.Item name="phone_number" label="Phone Number">
                    <Input placeholder="Phone number..."/>
                </Form.Item>
                <Form.Item name="birth_date" label="Birth Date" {...config}>
                    <DatePicker format={Constants.DATE_FORMAT}/>
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                    <Select placeholder="Gender..." style={{width: '25%'}}>
                        <Option value="M">Male</Option>
                        <Option value="F">Female</Option>
                        <Option value="O">Other</Option>
                        <Option value="N">Rather not say</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input placeholder="Address..."/>
                </Form.Item>
                <Form.Item name="bio" label="Bio">
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item name="university" label="University">
                    <Input placeholder="University..."/>
                </Form.Item>

                <Form.Item name="major" label="Major">
                    <Input placeholder="Major..."/>
                </Form.Item>

                <Form.Item name="occupation" label="Occupation">
                    <Input placeholder="Occupation..."/>
                </Form.Item>

                <Form.Item name="public_info" valuePropName="checked" label="Show info">
                    <Switch/>
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

export default WithSpinner(ProfileSetting)
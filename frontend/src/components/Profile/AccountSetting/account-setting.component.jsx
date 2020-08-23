import React from 'react'
import { Form, Input, Button, Tooltip, Avatar, Upload, Spin, message } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getBase64, beforeUpload } from '../../../utils/File/file.utils'
import { updateAccountStart } from '../../../redux/Auth/auth.actions'
import { Empt2Undefined } from '../../../utils/File/common.utils'

const AccountSetting = ({ currentUser, token, userProfile }) => {
    const dispatch = useDispatch()
    const [isUploading, setIsUploading] = React.useState(false)
    const [imgUrl, setImgUrl] = React.useState(null)
    const [form] = Form.useForm()
    const initValues = {
        email: currentUser.email,
        username: currentUser.username || currentUser.displayName
    }
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    }
    const tailLayout = {
        wrapperCol: { offset: 6, span: 16 },
    }
    const onSubmitForm = (values) => {
        console.log(values)
        values = {
            ...values,
            'username': Empt2Undefined(values.username),
            'email': Empt2Undefined(values.email),
            'old_password': Empt2Undefined(values.old_password),
            'password': Empt2Undefined(values.password)
        }
        const { username, email, old_password, password, confirm } = values
        console.log(values)
        if (password && !confirm) {
            return message.error('Please confirm the password!')
        }
        dispatch(updateAccountStart({
            token, username, email, old_password, password
        }))
    }

    const onReset = () => {
        form.resetFields()
    }

    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setIsUploading(true)
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setImgUrl(imageUrl)
                setIsUploading(false)
            })
        }
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

    return (
        <div className="profile-setting">
            <h3 className="text--main profile-setting__title">
                Cài đặt tài khoản
            </h3>
            <Form
                {...layout}
                form={form}
                name="account-form"
                onFinish={onSubmitForm}
                initialValues={initValues}
            >
                <Form.Item
                    name="upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    {...tailLayout}>
                    <Avatar
                        className='mr-5'
                        size={120}
                        src={
                            isUploading ? '' :
                                imgUrl ? imgUrl :
                                    userProfile.avatar ? userProfile.avatar : currentUser.photoURL}
                    >
                        {isUploading ? <Spin indicator={antIcon} /> : null}
                    </Avatar>
                    <Upload
                        name="avatar"
                        beforeUpload={beforeUpload}
                        action="/api/profile/"
                        method="PUT"
                        headers={
                            {
                                "Authorization": `Token ${token}`
                            }
                        }
                        onChange={handleChange}
                        showUploadList={false}
                    >

                        <Button>
                            <UploadOutlined />
                            Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                >
                    <Input allowClear={true} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    name="old_password"
                    label="Mật khẩu hiện tại"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mật khẩu hiện tại!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu mới"
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="mr-3">Save</Button>
                    <Button htmlType="button" onClick={() => window.open('/', '_self')}>
                        Cancel
                    </Button>

                </Form.Item>

            </Form>
        </div>
    )
}

export default AccountSetting
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { registerStart, googleSignInStart } from '../../redux/Auth/auth.actions'


import { Input, Spin, Form } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { UserOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons'

const Register = (props) => {
    const dispatch = useDispatch()
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const handleFormSubmit = values => {
        dispatch(registerStart({
            username: values['username'],
            email: values['email'],
            password: values['password']
        }))

    }

    const spinIcon = <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />;

    return (
        <div className="form-container sign-up-container" id="sign-up-container">
            <Form
                {...layout}
                onFinish={handleFormSubmit}
                id="signup-form">
                <h1 className="cs-account-form__title1">Create Account</h1>
                <div className="social-container">
                    <button type="button" className="social social--fb">
                        <i className="fab fa-facebook-f" />
                    </button>
                    <button onClick={() => dispatch(googleSignInStart())} type="button" className="social social--gm">
                        <i className="fab fa-google-plus-g" />
                    </button>
                    <button type="button" className="social social--lk">
                        <i className="fab fa-github" />
                    </button>
                </div>
                <div className="alert alert-danger alert-signup" role="alert">
                    <span className="error-message" id="signup-err-msg" />
                </div>
                <span className="text--sub__bigger">or use your email for registration</span>
                <div className="form-group">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="username"
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            allowClear={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="email"
                            size="large"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            allowClear={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size="large"
                            prefix={<UnlockOutlined />}
                            placeholder="Password" />
                    </Form.Item>

                </div>
                <button className="cs-form-btn" type="submit" name="signup">
                    {props.isLoading ? <Spin indicator={spinIcon} /> : 'Register'}
                </button>
            </Form>
        </div>

    )
}

export default Register
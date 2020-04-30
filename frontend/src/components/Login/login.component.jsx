import React from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {loginStart, googleSignInStart} from "../../redux/Auth/auth.actions";
import {Input, Spin, Form} from 'antd'
import {UserOutlined, UnlockOutlined, LoadingOutlined} from '@ant-design/icons'


const Login = (props) => {

    const dispatch = useDispatch();
    const layout = {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const buttonItemLayout = {
        wrapperCol: {span: 24, offset: 8}
    };


    const handleFormSubmit = (values) => {
        dispatch(loginStart({
            username: values['username'],
            password: values['password']
        }))
    };

    const spinIcon = <LoadingOutlined style={{fontSize: 24, color: "#fff"}} spin/>;

    return (
        <div className="form-container sign-in-container" id="login-container">
            <Form
                {...layout}
                onFinish={handleFormSubmit}
                id="login-form"
            >
                <h1 className="cs-account-form__title1">Đăng nhập</h1>
                <div className="social-container">
                    <button type="button" className="social social--fb">
                        <i className="fab fa-facebook-f"/>
                    </button>
                    <button
                        onClick={() => dispatch(googleSignInStart())} type="button"
                        className="social social--gm">
                        <i className="fab fa-google-plus-g"/>
                    </button>
                    <button type="button" className="social social--lk">
                        <i className="fab fa-github"/>
                    </button>
                </div>
                <span className="text--sub__bigger">hoặc sử dụng tài khoản</span>


                <div className="form-group">
                    <Form.Item
                        label="Username/email"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Username or email"
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            allowClear={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size="large"
                                        prefix={<UnlockOutlined/>}
                                        placeholder="Password"/>
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Link to="#"><span className="text--sub">Quên mật khẩu?</span></Link>
                    </Form.Item>
                </div>
                <button className="cs-form-btn" type="submit" name="login" id="btn-login">
                    {props.isLoading ? <Spin indicator={spinIcon}/> : 'Đăng Nhập'}
                </button>
            </Form>
        </div>
    );
};

export default Login;
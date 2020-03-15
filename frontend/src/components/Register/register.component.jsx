import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { registerStart, googleSignInStart } from '../../redux/Auth/auth.actions'


import { Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { UserOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons'

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleFormSubmit = event => {
        event.preventDefault()
        dispatch(registerStart({ username, email, password }))

    }

    // useEffect(() => {
    //     if (registerErrMessage !== null && isRegisterLoading === false) {
    //         let err = ""
    //         const errResponse = registerErrMessage.response
    //         if (errResponse.status === 500) {
    //             err = "Opps! Server is down, try again later"
    //         } else {
    //             err = errResponse.data['email'] ? errResponse.data['email'] : '' +
    //                 errResponse.data['username'] ? errResponse.data['username'] : '' +
    //                     errResponse.data['password'] ? errResponse.data['password'] : ''
    //         }
    //         message.error(err)
    //     } else if (registerErrMessage === null && isRegisterLoading === false) {
    //         message.success("Register successfully!")
    //     }
    // }, [isRegisterLoading, registerErrMessage])

    const handleInputChange = event => {
        const { name, value } = event.target
        name === "username" ? setUsername(value) :
            name === "email" ? setEmail(value) :
                setPassword(value)
    }

    const inputStyle = {
        transform: "translateY(-25%)"
    }

    const spinIcon = <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />;

    return (
        <div className="form-container sign-up-container" id="sign-up-container">
            <form onSubmit={handleFormSubmit} id="signup-form">
                <h1 className="cs-account-form__title1">Create Account</h1>
                <div className="social-container">
                    <button type="button" className="social social--fb"><i className="fab fa-facebook-f"></i></button>
                    <button onClick={() => dispatch(googleSignInStart())} type="button" className="social social--gm"><i className="fab fa-google-plus-g"></i></button>
                    <button type="button" className="social social--lk"><i className="fab fa-github"></i></button>
                </div>
                <div className="alert alert-danger alert-signup" role="alert">
                    <span className="error-message" id="signup-err-msg"></span>
                </div>
                <span className="text--sub__bigger">or use your email for registration</span>
                <div className="form-group">
                    <label htmlFor="signup-username">Username</label>
                    <Input
                        required
                        onChange={handleInputChange}
                        name="username"
                        value={username}
                        size="large"
                        prefix={<UserOutlined style={inputStyle} className="site-form-item-icon" />}
                        allowClear={true}
                        placeholder="Username" id="signup-username" />
                    <label htmlFor="signup-email">Email</label>
                    <Input
                        required
                        onChange={handleInputChange}
                        name="email"
                        value={email}
                        size="large"
                        allowClear={true}
                        prefix={<MailOutlined style={inputStyle} className="site-form-item-icon" />}
                        type="email" id="signup-email" placeholder="Email" />
                    <label htmlFor="signup-password">Password</label>
                    <Input.Password
                        required
                        onChange={handleInputChange}
                        name="password"
                        value={password}
                        prefix={<UnlockOutlined style={inputStyle} />}
                        size="large" id="signup-password" placeholder="Password" />
                </div>
                <button className="cs-form-btn" type="submit" name="signup">
                    {props.isLoading ? <Spin indicator={spinIcon} /> : 'Register'}
                </button>
            </form>
        </div>

    )
}

export default Register
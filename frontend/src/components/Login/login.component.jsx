import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isLoginLoadingSelector, loginErrMessageSelector, currentUserSelector } from '../../redux/Auth/auth.selects'
import { loginStart, googleSignInStart } from "../../redux/Auth/auth.actions";
import { toggleRLModal } from '../../redux/UI/ui.actions'
import { Input, Spin, message } from 'antd'
import { UserOutlined, UnlockOutlined, LoadingOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { isLoginLoading, loginErrorMessage, currentUser } = useSelector(createStructuredSelector({
        isLoginLoading: isLoginLoadingSelector,
        loginErrorMessage: loginErrMessageSelector,
        currentUser: currentUserSelector
    }))

    const loginError = (err) => {
        message.error(err)
    }


    const handleFormSubmit = (event) => {
        event.preventDefault()
        dispatch(loginStart({
            username, password
        }))
    }

    useEffect(() => {
        if (loginErrorMessage !== null && isLoginLoading == false) {
            let err = ""
            if (loginErrorMessage.response.status === 500) {
                err = "Opps! Server is down, try again later"
            } else {
                err = "Invalid username/email or password"
            }
            loginError(err)
        } else if (currentUser !== null) {
            dispatch(toggleRLModal())
        }
    }, [isLoginLoading, currentUser])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        name === "username" ? setUsername(value) : setPassword(value)
    }

    const inputStyle = {
        transform: "translateY(-25%)"
    }

    const spinIcon = <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />;

    return (
        <div className="form-container sign-in-container" id="login-container">
            <form onSubmit={handleFormSubmit} id="login-form">
                <h1 className="cs-account-form__title1">Log In</h1>
                <div className="social-container">
                    <button type="button" className="social social--fb"><i className="fab fa-facebook-f"></i></button>
                    <button onClick={() => dispatch(googleSignInStart())} type="button" className="social social--gm"><i className="fab fa-google-plus-g"></i></button>
                    <button type="button" className="social social--lk"><i className="fab fa-github"></i></button>
                </div>
                <span className="text--sub__bigger">or use your account</span>
                <div className="alert alert-danger alert-login" role="alert">
                    <span className="error-message" id="login-err-msg"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="login-username">Username or email</label>
                    <Input
                        required
                        onChange={handleInputChange}
                        name="username"
                        value={username}
                        placeholder="Username or email"
                        size="large"
                        prefix={<UserOutlined style={inputStyle} className="site-form-item-icon" />}
                        allowClear={true}
                        id="login-username" />
                    <label htmlFor="login-password">
                        <FormattedMessage id='auth.password' defaultMessage='Password' />
                    </label>
                    <Input.Password
                        required
                        name="password"
                        onChange={handleInputChange}
                        value={password}
                        size="large"
                        prefix={<UnlockOutlined style={inputStyle} />}
                        placeholder="Password"
                        id="login-password" />
                    <a href="#"><span className="text--sub">Forgot your password?</span></a>
                </div>
                <button className="cs-form-btn" type="submit" name="login" id="btn-login">
                    {isLoginLoading ? <Spin indicator={spinIcon} /> : 'LOG IN'}
                </button>
            </form>
        </div>
    );
}

export default Login;
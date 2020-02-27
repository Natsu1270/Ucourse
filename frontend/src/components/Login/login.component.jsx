import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginStart } from "../../redux/User/user.actions";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleFormSubmit = (event) => {
        event.preventDefault()
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        name === "username" ? setUsername(value) : setPassword(value)
    }

    return (
        <div className="form-container sign-in-container" id="login-container">
            <form action="" method="post" id="login-form">
                <h1 className="cs-account-form__title1">Log In</h1>
                <div className="social-container">
                    <a href="" className="social social--fb"><i className="fab fa-facebook-f"></i></a>
                    <a href="" className="social social--gm"><i className="fab fa-google-plus-g"></i></a>
                    <a href="" className="social social--lk"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span className="text--sub__bigger">or use your account</span>
                <div className="alert alert-danger alert-login" role="alert">
                    <span className="error-message" id="login-err-msg"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="login-username">Username or email</label>
                    <input type="text" placeholder="Username" id="login-username" />
                    <label htmlFor="login-password">Password</label>
                    <input type="password" placeholder="Password" id="login-password" />
                    <a href="#"><span className="text--sub">Forgot your password?</span></a>
                </div>
                <button className="cs-form-btn" type="submit" name="login" id="btn-login">Log In</button>
            </form>
        </div>
    );
}

export default Login;
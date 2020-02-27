import React from 'react'

const Register = () => {

    return (
        <div className="form-container sign-up-container" id="sign-up-container">
            <form action="" method="post" id="signup-form">
                <h1 className="cs-account-form__title1">Create Account</h1>
                <div className="social-container">
                    <a href="" className="social social--fb"><i className="fab fa-facebook-f"></i></a>
                    <a href="" className="social social--gm"><i className="fab fa-google-plus-g"></i></a>
                    <a href="" className="social social--lk"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="alert alert-danger alert-signup" role="alert">
                    <span className="error-message" id="signup-err-msg"></span>
                </div>
                <span className="text--sub__bigger">or use your email for registration</span>
                <div className="form-group">
                    <label htmlFor="signup-username">Username</label>
                    <input type="text" name="" placeholder="Username" id="signup-username" />
                    <label htmlFor="signup-email">Email</label>
                    <input type="email" name="" id="signup-email" placeholder="Email" />
                    <label htmlFor="signup-password">Password</label>
                    <input type="password" name="" id="signup-password" placeholder="Password" />
                </div>
                <button className="cs-form-btn" type="submit" name="signup">Sign Up</button>
            </form>
        </div>

    )
}

export default Register
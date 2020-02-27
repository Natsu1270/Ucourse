import React from 'react'


const LoginSignUpOverlay = () => {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1 className="cs-account-form__title2">Already Sign Up</h1>
                    <p className="text--sub">Time to learn</p>
                    <button className="cs-form-btn ghost" id="cs-form-signIn">Log In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1 className="cs-account-form__title2">New To CSourse</h1>
                    <p className="text--sub">Sign up now to start</p>
                    <button className="cs-form-btn ghost" id="cs-form-signUp">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUpOverlay
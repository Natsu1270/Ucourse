import React from 'react'

import Login from "../../components/Login/login.component";
import Register from "../../components/Register/register.component";
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {currentUserSelector, errMessageSelector, isLoadingSelector} from "../../redux/Auth/auth.selects";
import LoginSignUpOverlay from "../../components/RegisterOrLogin/login-signup-overlay.ulti";
import {isSignupPanelActiveSelector} from "../../redux/UI/ui.selects";

const LoginAndRegisterPage = () => {
    const {
        isSignupFormActive,
        isLoading
    } = useSelector(createStructuredSelector(
        {
            isSignupFormActive: isSignupPanelActiveSelector,
            currentUser: currentUserSelector,
            errMessage: errMessageSelector,
            isLoading: isLoadingSelector
        }
    ))
    return (
        <div className='login-register-page'>
            <div className={`cs-account-form__container cs-signup${isSignupFormActive ? ' right-panel-active' : ''}`}
                id="cs-form-container">
                <Login isLoading={isLoading} />
                <Register isLoading={isLoading} />
                <LoginSignUpOverlay />
            </div>
        </div>
    )
}

export default LoginAndRegisterPage
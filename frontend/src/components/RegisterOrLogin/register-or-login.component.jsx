import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isRLModalActiveSelector, isSignupPanelActiveSelector } from '../../redux/UI/ui.selects'
import { toggleRLModal, switchRLForm } from '../../redux/UI/ui.actions'
import Login from '../Login/login.component'
import Register from '../Register/register.component'
import LoginSignUpOverlay from './login-signup-overlay.ulti'
import { Modal } from 'antd'

import './register-or-login.style.scss'


const RegisterOrLogin = () => {

    const dispatch = useDispatch()
    const { isRLModalActive, isSignupFormActive } = useSelector(createStructuredSelector({
        isRLModalActive: isRLModalActiveSelector,
        isSignupFormActive: isSignupPanelActiveSelector
    }))
    const handleClose = (e) => {
        dispatch(toggleRLModal())
    }


    return (
        <Modal
            title=""
            closeIcon={<i></i>}
            visible={isRLModalActive}
            onCancel={handleClose}
            footer={null}
            width={800}
            style={
                {
                    top: 10
                }
            }
        >
            <div className={`cs-account-form__container cs-signup${isSignupFormActive ? ' right-panel-active' : ''}`}
                id="cs-form-container">
                <Login />
                <Register />
                <LoginSignUpOverlay />
            </div>
        </Modal>

    )
}

export default RegisterOrLogin
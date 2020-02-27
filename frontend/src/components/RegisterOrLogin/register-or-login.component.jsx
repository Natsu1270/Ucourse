import React, { useState } from 'react'

import Login from '../Login/login.component'
import Register from '../Register/register.component'
import LoginSignUpOverlay from './login-signup-overlay.ulti'
import { Modal } from 'antd'

import './register-or-login.style.scss'


const RegisterOrLogin = (props) => {
    const [visible, setVisible] = useState(props.visible)
    const handleClose = (e) => {
        setVisible(false)
    }


    return (
        <Modal
            title=""
            visible={visible}
            onCancel={handleClose}
            footer={null}
            width={800}
            style={
                {
                    top: 10
                }
            }
        >
            <div className="cs-account-form__container cs-signup" id="cs-form-container">
                <Login />
                <Register />
                <LoginSignUpOverlay />
            </div>
        </Modal>

    )
}

export default RegisterOrLogin
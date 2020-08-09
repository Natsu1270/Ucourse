import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isRLModalActiveSelector, isSignupPanelActiveSelector } from '../../redux/UI/ui.selects'
import { currentUserSelector, errMessageSelector, isLoadingSelector } from '../../redux/Auth/auth.selects'
import { hideRLModal } from '../../redux/UI/ui.actions'
import Login from '../Login/login.component'
import Register from '../Register/register.component'
import LoginSignUpOverlay from './login-signup-overlay.ulti'
import { Modal, message } from 'antd'

import './register-or-login.style.scss'


const RegisterOrLogin = () => {

    const dispatch = useDispatch()

    const {
        isRLModalActive,
        isSignupFormActive,
        currentUser,
        errMessage,
        isLoading
    } = useSelector(createStructuredSelector(
        {
            isRLModalActive: isRLModalActiveSelector,
            isSignupFormActive: isSignupPanelActiveSelector,
            currentUser: currentUserSelector,
            errMessage: errMessageSelector,
            isLoading: isLoadingSelector
        }
    ))

    useEffect(() => {
        if (currentUser) {
            dispatch(hideRLModal())
        }
        if (errMessage) {
            if (errMessage.status === 500) {
                message.error(errMessage.statusText)
            } else {
                if (errMessage.data) {
                    const errorLists = (errMessage.data.error_message || []).map(
                        e => e = e.replace(e[0], e[0].toUpperCase())
                    )
                    const errText = errorLists.join('\n')
                    message.error(errText)
                } else {
                    message.error(errMessage)
                }
            }
        }
    }, [errMessage, currentUser, dispatch])

    const handleClose = (e) => {
        dispatch(hideRLModal())
    }

    return (
        <Modal
            title=""
            closeIcon={<i></i>}
            visible={isRLModalActive}
            onCancel={handleClose}
            footer={null}
            width={800}
            style={{ top: 10 }}>
            <div className={`cs-account-form__container cs-signup${isSignupFormActive ? ' right-panel-active' : ''}`}
                id="cs-form-container">
                <Login isLoading={isLoading} />
                <Register isLoading={isLoading} />
                <LoginSignUpOverlay />
            </div>
        </Modal>

    )
}

export default RegisterOrLogin
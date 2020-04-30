import React from 'react'
import { useDispatch } from 'react-redux'
import { switchRLForm } from '../../redux/UI/ui.actions'
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'

const LoginSignUpOverlay = () => {

    const dispatch = useDispatch();
    const handleSwitch = () => dispatch(switchRLForm());
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1 className="cs-account-form__title2">Đã đăng ký thành viên</h1>
                    <p className="text--sub">Đăng nhập ngay</p>
                    <button className="cs-form-btn ghost" id="cs-form-signIn" onClick={handleSwitch}><ArrowLeftOutlined /></button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1 className="cs-account-form__title2">Chưa đăng ký thành viên</h1>
                    <p className="text--sub">Đăng ký để bắt đầu</p>
                    <button className="cs-form-btn ghost" id="cs-form-signUp" onClick={handleSwitch}><ArrowRightOutlined /></button>
                </div>
            </div>
        </div>
    )
};

export default LoginSignUpOverlay
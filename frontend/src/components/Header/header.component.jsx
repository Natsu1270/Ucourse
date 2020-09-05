import React, { Suspense, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutStart } from '../../redux/Auth/auth.actions';
import { showRLModal } from '../../redux/UI/ui.actions'

import { Button, Layout, Badge } from 'antd'
import SearchInput from '../SearchInput/search-input.component';
import ProfileHeaderDropdown from './profile-header-dropdown.component'
import { clearCurrentProfile } from "../../redux/Profile/profile.actions";
import { NotificationTwoTone, BellTwoTone } from '@ant-design/icons';

const RegisterOrLogin = React.lazy(() => import('../RegisterOrLogin/register-or-login.component'))


const Header = ({ token, currentUser, notifications, isFetching }) => {
    const dispatch = useDispatch();
    const [unRead, setUnRead] = useState([])

    useEffect(() => {
        if (notifications.length) {
            const unRead = notifications.filter(n => n.is_read == false)
            setUnRead(unRead)
        }
    }, [notifications])

    const { Header } = Layout;

    const handleLogout = () => {
        dispatch(logoutStart(token));
        dispatch(clearCurrentProfile())
    };

    return (
        <Header className='cs-main-header' id="main-header">
            <ul className='cs-navbar' mode="horizontal">
                <li>
                    <Link to="/" className="cs-logo text--main bold">
                        UCourse
                    </Link>
                </li>
                <li className='header-item-text'>
                    <Link to="/field">Khám phá</Link>
                    <Link to="/about">Giới Thiệu</Link>
                    <Link to="/event">Sự kiện</Link>
                    <Link to="/guideline">Trợ giúp</Link>
                    <Link to="/register-class">Đăng ký lớp</Link>
                    {
                        token ? <Link to="/notification">
                            <Badge count={unRead.length} >
                                <Button
                                    type="ghost"
                                    style={{ border: '1px solid white', color: '#fff', fontWeight: '600' }}>
                                    <BellTwoTone style={{ fontSize: '1.8rem' }} twoToneColor="white" /></Button>
                            </Badge>
                        </Link> : null
                    }
                </li>
                <li className='header-search'>
                    <SearchInput width={400} />
                </li>
                {
                    currentUser ? (
                        <li>
                            <ProfileHeaderDropdown currentUser={currentUser} handleLogout={handleLogout} />
                        </li>
                    ) : (
                            <li className="nav-item active-nav" id="logout-btn">
                                <Button type="primary" onClick={() => dispatch(showRLModal())}>
                                    Đăng ký
                                </Button>
                            </li>
                        )
                }
            </ul>
            <Suspense fallback={<span />}>
                <RegisterOrLogin />
            </Suspense>
        </Header>
    )
};

export default Header


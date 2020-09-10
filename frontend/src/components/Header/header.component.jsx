import React, { Suspense, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutStart } from '../../redux/Auth/auth.actions';
import { showRLModal } from '../../redux/UI/ui.actions'

import { Button, Layout, Badge, Row, Col } from 'antd'
import SearchInput from '../SearchInput/search-input.component';
import ProfileHeaderDropdown from './profile-header-dropdown.component'
import { clearCurrentProfile } from "../../redux/Profile/profile.actions";
import { NotificationTwoTone, BellTwoTone, HeartTwoTone } from '@ant-design/icons';

const RegisterOrLogin = React.lazy(() => import('../RegisterOrLogin/register-or-login.component'))


const Header = ({ token, currentUser, notifications, isFetching, favCourseCount }) => {
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
        // <Header  >
        <Row align="middle" className='cs-main-header pl-5 pr-5 pb-3 pt-3' gutter={16}>
            <Col span={3}>
                <Link to="/" className="cs-logo text--main bold">
                    UCourse
                    </Link>
            </Col>
            <Col span={8}>
                <Row gutter={16}>
                    <Col><Link className="header_link" to="/field">Khám phá</Link></Col>
                    <Col><Link className="header_link" to="/about">Giới Thiệu</Link></Col>
                    <Col><Link className="header_link" to="/event">Sự kiện</Link></Col>
                    <Col><Link className="header_link" to="/guideline">Trợ giúp</Link></Col>
                    <Col><Link className="header_link" to="/register-class">Đăng ký lớp</Link></Col>
                </Row>

            </Col>
            <Col className='header-search'>
                <SearchInput width={400} />
            </Col>
            <Col>
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
            </Col>
            <Col>
                {
                    token ? <Link to="/favorite-courses">
                        <Badge count={favCourseCount} >
                            <Button
                                type="ghost"
                                style={{ border: '1px solid white', color: '#fff', fontWeight: '600' }}>
                                <HeartTwoTone style={{ fontSize: '1.8rem' }} twoToneColor="white" /></Button>
                        </Badge>
                    </Link> : null
                }
            </Col>

            {
                currentUser ? (
                    <Col>
                        <ProfileHeaderDropdown currentUser={currentUser} handleLogout={handleLogout} />
                    </Col>
                ) : (
                        <Col className="nav-item active-nav" id="logout-btn">
                            <Button type="primary" onClick={() => dispatch(showRLModal())}>
                                Đăng ký
                                </Button>
                        </Col>
                    )
            }
            <Suspense fallback={<span />}>
                <RegisterOrLogin />
            </Suspense>
        </Row>

        // </Header>
    )
};

export default Header


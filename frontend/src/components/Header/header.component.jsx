import React, {useEffect, useState, Suspense} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom'
import {loadUserStart, logoutStart} from '../../redux/Auth/auth.actions';
import {showRLModal} from '../../redux/UI/ui.actions'

import {Button, Spin, Layout} from 'antd'
import SearchInput from '../SearchInput/search-input.component';
import ProfileHeaderDropdown from './profile-header-dropdown.component'
import logo from '../../assets/temp-logo.png'
import {clearCurrentProfile} from "../../redux/Profile/profile.actions";

const RegisterOrLogin = React.lazy(() => import('../RegisterOrLogin/register-or-login.component'))


const Header = ({token, currentUser}) => {
    // load token and get current user if logged in
    const [stick, setStick] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', () => handleScroll)
        }
    }, []);

    const handleScroll = () => {
        setStick(window.pageYOffset > 50)
    };

    const handleLogout = () => {
        dispatch(logoutStart(token))
        dispatch(clearCurrentProfile())
    };

    return (
        <header className={`cs-main-header ${stick ? ' cs-header-fixed' : ''}`} id="main-header">
            <div className="header-content">
                <nav className="navbar navbar-extend-lg cs-navbar">
                    <Link to="/" className="navbar-brand cs-logo text--main bold">
                        UCourse
                    </Link>
                    <div className="navbar_supported cs-navbar-item">
                        <ul className="navbar-nav">
                            <li className="header-item navbar-nav--search">
                                <SearchInput width={400} />
                            </li>
                            <li className="header-item nav-item">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="header-item nav-item">
                                <Link to="/field">Explore</Link>
                            </li>

                            {
                                currentUser ? (
                                    <li className="nav-item active-nav">
                                        <ProfileHeaderDropdown currentUser={currentUser} handleLogout={handleLogout}/>
                                    </li>
                                ) : (
                                    <li className="nav-item active-nav" id="logout-btn">
                                        {stick ? <Button type="primary" onClick={() => dispatch(showRLModal())}>
                                            Get Started
                                        </Button> :
                                        <Button className="nav-item--btn" ghost onClick={() => dispatch(showRLModal())}>
                                            Get Started
                                        </Button>}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
            <Suspense fallback={<Spin/>}>
                <RegisterOrLogin/>
            </Suspense>
        </header>
    )
}

export default Header


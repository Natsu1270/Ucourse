import React, { useEffect, useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom'
import { tokenSelector, currentUserSelector, isLoadUserLoadingSelector } from '../../redux/Auth/auth.selects'
import { loadUserStart, logoutStart } from "../../redux/Auth/auth.actions";
import { toggleRLModal } from '../../redux/UI/ui.actions'

import { Button, Spin, Icon } from 'antd'
import SearchInput from "../SearchInput/search-input.component";
import logo from '../../assets/temp-logo.png'

const RegisterOrLogin = React.lazy(() => import('../RegisterOrLogin/register-or-login.component'))

const Header = () => {
    // load token and get current user if logged in
    const [stick, setStick] = useState(false)
    const dispatch = useDispatch()
    const { token, currentUser, isUserLoading } = useSelector(createStructuredSelector({
        token: tokenSelector,
        currentUser: currentUserSelector,
        isUserLoading: isLoadUserLoadingSelector
    }))
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        dispatch(loadUserStart(token))
        return () => {
            window.removeEventListener('scroll', () => handleScroll)
        }
    }, [dispatch])

    const handleScroll = () => {
        setStick(window.pageYOffset > 50)
    }

    return (
        <header className={`cs-main-header ${stick ? ' cs-header-fixed' : ''}`} id="main-header">
            <div className="header-content">
                <nav className="navbar navbar-extend-lg cs-navbar">
                    <Link to="/" className="navbar-brand cs-logo">
                        <img src={logo} className="cs-logo__img" alt="cs-logo" />
                    </Link>
                    <div className="navbar_supported cs-navbar-item">
                        <ul className="navbar-nav">
                            <li className="header-item">
                                <SearchInput />
                            </li>
                            <li className="header-item">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="header-item">
                                <Link to="/explore">Explore</Link>
                            </li>

                            {
                                isUserLoading ? (
                                    <li className="nav-item active-nav" id="logout-btn">
                                        <Spin />
                                    </li>
                                ) :
                                    currentUser ? (
                                        <li className="nav-item active-nav" id="logout-btn">
                                            <Button type="danger" onClick={() => dispatch(logoutStart(token))}>Logout</Button>
                                        </li>
                                    ) : (
                                            <li className="nav-item active-nav" id="logout-btn">
                                                <Button type="primary" onClick={() => dispatch(toggleRLModal())}>Get Started</Button>
                                            </li>
                                        )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
            <Suspense fallback={<Spin />}>
                <RegisterOrLogin />
            </Suspense>
        </header>
    )
}

export default Header


import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createStructuredSelector} from "reselect";
import {Link} from 'react-router-dom'
import {tokenSelector, currentUserSelector} from '../../redux/User/user.selects'
import {loadUserStart,logoutStart} from "../../redux/User/user.actions";

import {Button} from 'antd'
import SearchInput from "../SearchInput/search-input.component";
import logo from '../../assets/temp-logo.png'

const Header = () => {
    // load token and get current user if logged in
    const dispatch = useDispatch()
    const {token, currentUser} = useSelector(createStructuredSelector({
        token: tokenSelector,
        currentUser: currentUserSelector
    }))
    useEffect(() => {
        dispatch(loadUserStart(token))
    }, [dispatch])


    return (
        <header className="cs-main-header" id="main-header">
            <div className="header-content">
                <nav className="navbar navbar-extend-lg cs-navbar">
                    <Link to="/" className="navbar-brand cs-logo">
                        <img src={logo} className="cs-logo__img" alt="cs-logo"/>
                    </Link>
                    <div className="navbar_supported cs-navbar-item">
                        <ul className="navbar-nav">
                            {/*<li className="search_box">*/}
                            {/*    <form action="" method="get" className="form-inline">*/}
                            {/*        <div className="input-group">*/}
                            {/*            <input type="text" className="form-control" name="search"*/}
                            {/*                   aria-label="search" placeholder="Tìm khoá học..."/>*/}
                            {/*            <button type="submit" className="btn cs-search-btn">*/}
                            {/*                <i className="fa fa-search"></i>*/}
                            {/*            </button>*/}
                            {/*        </div>*/}
                            {/*    </form>*/}
                            {/*</li>*/}
                            <li className="header-item">
                                <SearchInput/>
                            </li>
                            <li className="header-item">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="header-item">
                                <Link to="/explore">Explore</Link>
                            </li>

                            {
                                currentUser ? (
                                    <li className="nav-item active-nav" id="logout-btn">
                                        <Button type="danger" onClick={()=>dispatch(logoutStart(token))}>Logout</Button>
                                    </li>
                                ) : (
                                    <li className="nav-item active-nav" id="logout-btn">
                                        <Button type="primary"><Link to="/auth">Login</Link></Button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header


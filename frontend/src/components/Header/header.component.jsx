import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/temp-logo.png'

const Header = () => {

    return (
        <header className="cs-main-header" id="main-header">
            <div className="header-content">
                <nav className="navbar navbar-extend-lg cs-navbar">
                    <a href="" className="navbar-brand cs-logo">
                        <img src={logo} className="cs-logo__img" alt="cs-logo"/>
                    </a>
                    <div className="navbar_supported cs-navbar-item">
                        <ul className="navbar-nav">
                            <li className="search_box">
                                <form action="" method="get" className="form-inline">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="search"
                                               aria-label="search" placeholder="Tìm khoá học..."/>
                                        <button type="submit" className="btn cs-search-btn">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </li>
                            <li className="header-item">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="header-item">
                                <Link to="/explore">Explore</Link>
                            </li>

                            <li className="nav-item active-nav" id="logout-btn">
                                <Link to="/auth">Login</Link>
                            </li>

                            <li className="nav-item active-nav" id="logout-btn">
                                <form method="post" action="">
                                    <input type="submit"
                                           className="btn cs-btn cs-btn--animated cs-btn--fixed nav-link"
                                           id="logout-input" value="Logout"/>
                                </form>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header


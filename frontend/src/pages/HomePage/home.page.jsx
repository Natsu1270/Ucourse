import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showRLModal } from '../../redux/UI/ui.actions'

import banner from '../../assets/banner.png'

const HomePage = ({ currentUser }) => {
    const dispatch = useDispatch()
    return (
        <section className="section-10 section-banner" id="cs-banner">
            <div className="banner-content">
                <div className="banner-content-left">
                    <div className="container">
                        <div className="banner-slogan">
                            <h1 id="main-slogan">Learn online earn <p className="title--big main-slogan--text">Certificates</p></h1>
                        </div>
                        <div className="banner-description mt-5" id="main-slogan-des">
                            <h5>Develop your skills through online courses, certificates and diplomas offered by the
                                best universities and companies in the world</h5>
                        </div>
                        {
                            currentUser ? (
                                <Link to="/explore" className="cs-btn cs-btn--animated cs-btn--banner" id="main-btn">
                                    Explore Now
                                </Link>) : (
                                <a href="#" className="cs-btn cs-btn--animated cs-btn--banner" id="main-btn" onClick={()=> dispatch(showRLModal())}>
                                    Register Now
                                </a>)
                        }
                        
                        
                    </div>
                </div>
                <div className="banner-content-right">
                    <img src={banner} id="banner-img" alt="" />
                </div>
            </div>
        </section>
    )
}

export default HomePage
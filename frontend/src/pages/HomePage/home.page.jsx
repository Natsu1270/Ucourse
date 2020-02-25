import React from 'react'

const HomePage = () => {
    return (
        <section className="section section-banner" id="cs-banner">
            <div className="banner-content">
                <div className="banner-content-left">
                    <div className="container">
                        <div className="banner-slogan">
                            <h1 id="main-slogan">Learn online earn <p className="title--big">Certificates</p></h1>
                        </div>
                        <div className="banner-description mt-5" id="main-slogan-des">
                            <h5>Develop your skills through online courses, certificates and diplomas offered by the
                                best universities and companies in the world</h5>
                        </div>
                        <a href="#" className="cs-btn cs-btn--animated cs-btn--banner" id="main-btn">
                            Register Now
                        </a>
                    </div>
                </div>
                <div className="banner-content-right">
                    <img src="" id="banner-img" alt="" />
                </div>
            </div>
        </section>
    )
}

export default HomePage
import React from 'react'
import {Link} from "react-router-dom";
import {showRLModal} from "../../redux/UI/ui.actions";
import banner from "../../assets/banner.png";
import {useDispatch} from "react-redux";

const MainBanner = ({currentUser}) => {
    const dispatch = useDispatch();

    return (
        <section className="section-10 section-banner" id="cs-banner">
            <div className="banner-content">
                <div className="banner-content-left">
                    <div className="container">
                        <div className="banner-slogan">
                            <h1 id="main-slogan">Học trực tuyến dành <p className="title--big main-slogan--text">Chứng chỉ</p></h1>
                        </div>
                        <div className="banner-description" id="main-slogan-des">
                            <h5>Website học trực tuyến với các chương trình và khóa học chất lượng, cung cấp chứng chỉ sau khi hoàn thành khóa học</h5>
                        </div>
                        {
                            currentUser ? (
                                <Link to="/explore" className="cs-btn cs-btn--animated cs-btn--banner" id="main-btn">
                                    Khám phá
                                </Link>) : (
                                <a href="#" className="cs-btn cs-btn--animated cs-btn--banner" id="main-btn" onClick={()=> dispatch(showRLModal())}>
                                    Đăng ký
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
};

export default MainBanner
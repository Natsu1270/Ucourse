import React from 'react'
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/text.utils";
import Constants from "../../constants";

import programBg1 from '../../assets/program-bg1.png'

const ProgramDetailBanner = ({program}) => {
    const s = {
        background: `linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.8)
        ),
        url(${programBg1}) no-repeat center center / cover`,

    }
    return (
        <section style={s} className="pd-5 section-course-banner" id="cs-course-banner">
            <div className="course-banner d-flex justify-content-start">
                <div className="course-detail">
                    <h4 className="text--sub__smaller text-white">
                        PROGRAM
                    </h4>
                    <h1 className="text--main text--main__bigger text-white">
                        {program.name}
                    </h1>
                    <p className="course-description text--sub text--sub__bigger mt-4">
                        {program.short_description}
                    </p>
                    <div className="d-flex enroll-area mt-5">
                        <Link to="" className="cs-btn cs-btn--animated cs-btn--banner cs-btn--white">
                            Đăng ký học
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ProgramDetailBanner
import React from 'react'

const SubBanner = () => {

    return (
        <section className="sub-banner">
            <div className="sub-banner__container">
                <ul className="sub-banner__container--items">
                    <li className="sub-banner__container--item">
                        <p className="sub-banner__container--item--num">30</p>
                        <p className="sub-banner__container--item--text">Programs</p>
                        <p className="sub-banner__container--item--small">
                            Complete learning path
                        </p>
                    </li>
                    <li className="sub-banner__container--item">
                        <p className="sub-banner__container--item--num">100</p>
                        <p className="sub-banner__container--item--text">Courses</p>
                        <p className="sub-banner__container--item--small">
                            Individual course and certificate
                        </p>
                    </li>
                    <li className="sub-banner__container--item">
                        <p className="sub-banner__container--item--num">20</p>
                        <p className="sub-banner__container--item--text">Teachers</p>
                        <p className="sub-banner__container--item--small">
                            Experienced teachers in many fields
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    )
};

export default SubBanner;
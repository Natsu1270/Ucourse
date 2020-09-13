import React from 'react'

const SubBanner = ({ countMat }) => {

    return (
        <section className="sub-banner">
            <div className="sub-banner__container">
                <ul className="sub-banner__container--items">
                    <li className="sub-banner__container--item">
                        <p className="sub-banner__container--item--num">{countMat.programCount}</p>
                        <p className="sub-banner__container--item--text">Chương trình học</p>
                        <p className="sub-banner__container--item--small">
                            Chương trình học toàn diện
                        </p>
                    </li>
                    <li className="sub-banner__container--item">
                        <p className="sub-banner__container--item--num">{countMat.courseCount}</p>
                        <p className="sub-banner__container--item--text">Khóa học</p>
                        <p className="sub-banner__container--item--small">
                            Các khóa học
                        </p>
                    </li>
                    <li className="sub-banner__container--item">
                        <p className="sub-banner__container--item--num">{countMat.teacherCount}</p>
                        <p className="sub-banner__container--item--text">Giảng viên</p>
                        <p className="sub-banner__container--item--small">
                            Các giảng viên hàng đầu
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    )
};

export default SubBanner;
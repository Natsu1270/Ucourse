import React from 'react'

const CourseDetailOverview = ({course}) => {
    return (
        <section className="mt-10 section-10 section-course-overview" id="cs-course-overview">
            <div className="section-course-overview__content">
                <h2 className="text--main section-course-overview__header" id="cs-course-overview">
                    Course overview
                </h2>
                <span className="text--sub section-course-overview__description">
                        This Specialization builds on the success of the Python for Everybody course and will introduce fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. In the Capstone Project, you’ll use the technologies learned throughout the Specialization to design and create your own applications for data retrieval, processing, and visualization.
                </span>
                <div className="section-course-overview__right">
                    <div className="section-course-overview__right--items">
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico" />
                            <div className="section-course-overview__right--item__text">
                                {course.level}
                            </div>
                        </div>
                        <div className="section-course-overview__right--item">
                                <span className="section-course-overview__right--item__ico">

                                </span>
                            <div className="section-course-overview__right--item__text">
                                {course.level}
                            </div>
                        </div>
                        <div className="section-course-overview__right--item"></div>
                        <div className="section-course-overview__right--item"></div>
                    </div>
                </div>
                <div className="section-course-overview__detail">
                    <h3>What you will learn</h3>
                    <div className="section-course-overview__detail-items">
                        <div className="section-course-overview__detail-item">

                            <div className="section-course-overview__detail-text">
                                Understand fundamental programming concepts such as data structures
                            </div>
                        </div>
                        <div className="section-course-overview__detail-item">
                            <div className="section-course-overview__detail-text">
                                Explain the basics of programming computers using Python
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-course-overview__skill">
                    <h3>Skill you will earn</h3>
                    <ul className="section-course-overview__skill--sets">
                        <li className="section-course-overview__skill--item">
                            SQL
                        </li>
                        <li className="section-course-overview__skill--item">
                            Excel
                        </li>
                        <li className="section-course-overview__skill--item">
                            Data scrawl
                        </li>
                        <li className="section-course-overview__skill--item">
                            Database (DBMS)
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
};

export default CourseDetailOverview
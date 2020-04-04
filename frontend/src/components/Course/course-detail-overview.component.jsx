import React, {useState} from 'react'
import Truncate from 'react-truncate'
import {formatDate, parseHtml} from "../../utils/text.utils";
import Constants from "../../constants";


const CourseDetailOverview = ({course}) => {

    const [expanded, setExpand] = useState(false)
    const [truncated, setTruncate] = useState(false)

    const handleTruncate = (trunc) => {
        if (truncated !== trunc) {
            setTruncate(trunc)
        }
    }
    const toggleLines = (event) => {
        event.preventDefault();
        setExpand(!expanded);
    }
    return (
        <section className="mt-10 section-course-overview" id="cs-course-overview">
            <div className="section-course-overview__content">
                <h2 className="text--main section-course-overview__header" id="cs-course-overview">
                    Course overview
                </h2>
                <span className="text--sub section-course-overview__description">
                        <Truncate
                            lines={!expanded && 5}
                            ellipsis={(
                                <span>... <a href='#' onClick={toggleLines}>{'more'}</a></span>
                            )}
                            onTruncate={handleTruncate}
                        >
                            {parseHtml(course.course_detail.full_description)}
                        </Truncate>
                    {!truncated && expanded && (
                        <span> <a href='#' onClick={toggleLines}>{'less'}</a></span>
                    )}
                </span>
                <div className="section-course-overview__right">
                    <div className="section-course-overview__right--items">
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico"/>
                            <div className="section-course-overview__right--item__text">
                                {course.level}
                            </div>
                        </div>
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico">

                            </span>
                            <div className="section-course-overview__right--item__text">
                                {formatDate(course.course_detail.open_date, Constants.MMM_Do_YYYY)}
                            </div>
                        </div>
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico">

                            </span>
                            <div className="section-course-overview__right--item__text">
                                {formatDate(course.course_detail.end_date, Constants.MMM_Do_YYYY)}

                            </div>
                        </div>

                    </div>
                </div>
                <div className="section-course-overview__detail">
                    <h3>What you will learn</h3>
                    <div className="section-course-overview__detail-items">
                        <div className="section-course-overview__detail-item">

                            <div className="section-course-overview__detail-text">
                                {
                                    parseHtml(course.course_detail.benefits)
                                }
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
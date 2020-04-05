import React, { useRef, useState } from 'react'
import Truncate from 'react-truncate'
import { formatDate, parseHtml } from "../../utils/text.utils";
import Constants from "../../constants";
import { ArrowDownOutlined, ArrowUpOutlined, ThunderboltOutlined, ClockCircleOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import Skill from "./skill.component";

const CourseDetailOverview = ({full_description, open_date, end_date, level, benefits, skills, num_course }) => {
    const overviewRef = useRef()
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

    const toggleLinesAndScrollback = (event) => {
        event.preventDefault();
        setExpand(!expanded);
        window.scrollTo(0, overviewRef.current.offsetTop)
    }
    return (
        <section ref={overviewRef} className="mt-10 section-course-overview" id="cs-course-overview">
            <div className="section-course-overview__content">
                <h2 className="text--main section-header" id="cs-course-overview">
                    Course overview
                </h2>
                <span className="text--sub__bigger section-course-overview__description">
                    <Truncate
                        lines={!expanded && 3}
                        ellipsis={(
                            <span>... <p className='toggle-text' onClick={toggleLines}>Show all <ArrowDownOutlined /></p></span>
                        )}
                        onTruncate={handleTruncate}
                    >
                        {parseHtml(full_description)}
                    </Truncate>
                    {!truncated && expanded && (
                        <span> <p className='toggle-text' onClick={toggleLinesAndScrollback}>Show less <ArrowUpOutlined /></p></span>
                    )}
                </span>
                <div className="section-course-overview__right">
                    <div className="section-course-overview__right--items">
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico">
                                {
                                    num_course ? <DeploymentUnitOutlined /> : <ThunderboltOutlined />
                                }
                            </span>
                            <div className="section-course-overview__right--item__text">
                                {num_course ? num_course : level}
                            </div>
                        </div>
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico">
                                <ClockCircleOutlined />
                            </span>
                            <div className="section-course-overview__right--item__text">
                                {formatDate(open_date, Constants.MMM_Do_YYYY)}
                            </div>
                        </div>
                        <div className="section-course-overview__right--item">
                            <span className="section-course-overview__right--item__ico">
                                <ClockCircleOutlined />
                            </span>
                            <div className="section-course-overview__right--item__text">
                                {formatDate(end_date, Constants.MMM_Do_YYYY)}

                            </div>
                        </div>

                    </div>
                </div>
                { benefits ?  <div className="section-course-overview__detail">
                    <h3>What you will learn</h3>
                    <div className="section-course-overview__detail-items">
                        <div className="section-course-overview__detail-item">

                            <div className="section-course-overview__detail-text">
                                {
                                    parseHtml(benefits)
                                }
                            </div>
                        </div>
                    </div>
                </div> : <span />}
                {
                    skills ? (<div className="section-course-overview__skill">
                        <h3>Skill you will earn</h3>
                        <ul className="section-course-overview__skill--sets">
                            {
                                skills.map(skill => <Skill skill={skill} />)
                            }
                        </ul>
                    </div>) : <span />
                }
            </div>
        </section>
    )
};

export default CourseDetailOverview
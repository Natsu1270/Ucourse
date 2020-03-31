import React from 'react'
import {Link} from 'react-router-dom'

import {Breadcrumb} from 'antd'
import {HomeOutlined} from '@ant-design/icons'

const CourseDetail = ({course}) => {
    return (
        <div className="course-detail">
            <section className="section-10 section-course-banner" id="cs-course-banner">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined/>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/field/${course.field}`}>
                        {course.field}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="course-banner d-flex justify-content-start">
                    <div className="course-detail">
                        <h1 className="text--main text--main__bigger text-white">
                            {course.course_detail.verbose_name}
                        </h1>
                        <p className="course-description text--sub text--sub__bigger mt-4">
                            {course.course_detail.short_description}
                        </p>
                        <div className="d-flex enroll-area mt-5">
                            <Link to="" className="cs-btn cs-btn--animated cs-btn--banner cs-btn--white">
                                Đăng ký học
                            </Link>
                            <div className="course-info">
                                <p className="text-white text--sub">
                                    Khoá học bắt đầu vào : {course.course_detail.open_date}
                                </p>
                                <p className="text-white text--sub">
                                    Giảng viên : {course.teacher[0].user_profile.fullname}
                                </p>
                                <p className="text-white text--sub">
                                    Điểm đánh giá: {course.rate_score}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="course-avatar">
                        <img src={course.icon} className="img-thumbnail rounded" alt=""/>
                    </div>
                </div>
            </section>

            {/*{#  Tab #}*/}
            <section className="section-10 section-course-tab" id="cs-course-tab">
                <ul className="course-tab">
                    <li className="course-tab__address" id="tab-overview"><a href="#cs-course-overview"
                                                                             className="course-tab__address--link">Overview</a>
                    </li>
                    <li className="course-tab__address" id="tab-components"><a href="#cs-course-components"
                                                                               className="course-tab__address--link">Components</a>
                    </li>
                    <li className="course-tab__address" id="tab-tutors"><a href="#cs-course-tutors"
                                                                           className="course-tab__address--link">Instructors</a>
                    </li>
                    <li className="course-tab__address" id="tab-review"><a href="#cs-course-review"
                                                                           className="course-tab__address--link">Reviews</a>
                    </li>
                    <li className="course-tab__address" id="tab-related"><a href="#cs-course-related"
                                                                            className="course-tab__address--link">Related
                        courses</a></li>
                    <li className="course-tab__btn">
                        <a href="{% url 'course_learn' course.code %}" className="cs-btn cs-btn--animated">Đăng ký
                            ngay</a>

                        <a href="{% url 'exam:ability_exam' course.code %}" className="cs-btn cs-btn--animated"> Test
                            năng
                            lực</a>
                    </li>
                </ul>

            </section>

            {/*Overview*/}

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
                                <span className="section-course-overview__right--item__ico"></span>
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

            {/*Components*/}
            <section className="mt-10 section-10 section-course-components" id="cs-course-components">
                <div className="section-course-components__content">
                    <h2 className="text--main section-course-components__header" id="cs-course-overview">
                        Components
                    </h2>
                    <div className="section-course-components__tabs">

                        <input type="radio" id="tab1" name="tab-control" />
                            <input type="radio" id="tab2" name="tab-control" checked />
                                <input type="radio" id="tab3" name="tab-control" />

                                    <ul className="section-course-components__tabs--indexes">
                                        <li className="section-course-components__tabs--index">
                                            <label for="tab1" className="section-course-components__tabs--label">
                                                <span>Week 1</span>
                                            </label>
                                        </li>
                                        <li className="section-course-components__tabs--index">
                                            <label for="tab2" className="section-course-components__tabs--label">
                                                <span>Week 2</span>
                                            </label>
                                        </li>
                                        <li className="section-course-components__tabs--index">
                                            <label for="tab3" className="section-course-components__tabs--label">
                                                <span>Week 3</span>
                                            </label>
                                        </li>
                                    </ul>


                                    <div className="section-course-components__tabs--content content ">
                                        <section>
                                            <h2>Chapter One - Why we Program?</h2>
                                            <span className="text--sub">These are the course-wide materials as well as the first part of Chapter One where we explore what it means to write programs. We finish Chapter One and have the quiz and first assignment in the third week of the className. Throughout the course you may want to come back and look at these materials. This section should not take you an entire week.</span>
                                        </section>
                                        <section>
                                            <h2>Installing and Using Python</h2>
                                            <span className="text--sub">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas adipisci a accusantium eius ut voluptatibus ad impedit nulla, ipsa qui. Quasi temporibus eos commodi aliquid impedit amet, similique nulla.
            </span>
                                        </section>
                                        <section>
                                            <h2>Shipping</h2>
                                            <span className="text--sub">
                                                In this module you will set things up so you can write Python programs. Not all activities in this module are required for this className so please read the "Using Python in this className" material for details.
            </span>
                                        </section>
                                        <section>
                                            <h2>Chapter Two: Variables and Expressions</h2>
                                            <span className="text--sub">In this chapter we cover how a program uses the computer's memory to store, retrieve and calculate information.</span>
                                        </section>
                                    </div>

                    </div>

                </div>
            </section>

            {/*Tutors*/}
            <section className="mt-10 section-10 section-course-tutors" id="cs-course-tutors">
                <h2 className="text--main section-course-tutors__header" id="cs-course-overview">
                    Instructors
                </h2>
                <div className="section-course-tutors--content">
                    <div className="section-course-tutors--content__main">
                        <figure className="section-course-tutors--content__avatar">
                            <img src={course.teacher[0].user_profile.avatar} alt=""
                                 className="section-course-tutors--content__img" />
                        </figure>
                        <div className="section-course-tutors--content__info">
                            <span className="tutor-name mb-2"><a href="#">{course.teacher[0].user_profile.fullname}</a></span>
                            <span className="tutor-email">{course.teacher[0].email}</span>
                        </div>
                    </div>
                </div>

            </section>

            <section className="mt-10 section-10 section-course-review" id="cs-course-review">
                <h2 className="text--main section-course-review__header">
                    Reviews
                </h2>
                <div className="section-course-review--feedback">
                    <h3 className="text--sub__bigger2 text--sub__600 mb-5">Student feedback</h3>
                    <div className="feedback-rating">
                        <div className="feedback-rating__score">
                            <span className="score-num">{course.rate_score}</span>
                            <div className="star-rating">
                                <i className="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star"
                                   data-rating="1"></i>
                                <i className="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                   data-rating="2"></i>
                                <i className="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                   data-rating="3"></i>
                                <i className="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                   data-rating="4"></i>
                                <i className="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                   data-rating="5"></i>
                                <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}"
                                       className="star-rating__value" value="{{ course.rate_score }}" />
                            </div>
                        </div>
                        <div className="feedback-rating__ratio">
                            <div className="feedback-rating__ratio--5">
                                <div className="ratio-base">
                                                        <span className="ratio-real">

                                                        </span>
                                </div>
                            </div>
                            <div className="feedback-rating__ratio--5">
                                <div className="ratio-base">
                                                        <span className="ratio-real">

                                                        </span>
                                </div>
                            </div>
                            <div className="feedback-rating__ratio--5">
                                <div className="ratio-base">
                                                        <span className="ratio-real">

                                                        </span>
                                </div>
                            </div>
                            <div className="feedback-rating__ratio--5">
                                <div className="ratio-base">
                                                        <span className="ratio-real">

                                                        </span>
                                </div>
                            </div>
                            <div className="feedback-rating__ratio--5">
                                <div className="ratio-base">
                                                        <span className="ratio-real">

                                                        </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <h3 className="text--sub__bigger2 text--sub__600 mb-5">Student reviews</h3>
                    <div className="review-items">
                        <div className="review-item">
                            <div className="review-item__content">
                                <div className="review-item__content--star">
                                    <div className="star-rating">
                                        <i className="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star"
                                           data-rating="1"></i>
                                        <i className="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="2"></i>
                                        <i className="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="3"></i>
                                        <i className="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="4"></i>
                                        <i className="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="5"></i>
                                        <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}"
                                               className="star-rating__value" value="{{ course.rate_score }}" />
                                    </div>
                                </div>
                                <div className="review-item__content--text">
                                    Great course! Simple and concise explanations of the Agile concepts with practical
                                    advise and templates. Enought to get started and learn more along the way!
                                </div>
                            </div>
                            <div className="review-item__user">
                                <img src="" alt="" className="review-item__user--avatar" />
                                    <div className="review-item__user--info">
                                        <div className="review-item__user--name">
                                            Name
                                        </div>
                                        <div className="review-item__user--email">
                                            @lodash123
                                        </div>
                                        <div className="review-item__user--time">
                                            3 week ago
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="review-item">
                            <div className="review-item__content">
                                <div className="review-item__content--star">
                                    <div className="star-rating">
                                        <i className="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star"
                                           data-rating="1"></i>
                                        <i className="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="2"></i>
                                        <i className="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="3"></i>
                                        <i className="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="4"></i>
                                        <i className="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="5"></i>
                                        <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}"
                                               className="star-rating__value" value="{{ course.rate_score }}"/>
                                    </div>
                                </div>
                                <div className="review-item__content--text">
                                    Great course! Simple and concise explanations of the Agile concepts with practical
                                    advise and templates. Enought to get started and learn more along the way!
                                </div>
                            </div>
                            <div className="review-item__user">
                                <img src="" alt=""
                                     className="review-item__user--avatar" />
                                <div className="review-item__user--info">
                                    <div className="review-item__user--name">
                                        Name
                                    </div>
                                    <div className="review-item__user--email">
                                        @titan123
                                    </div>
                                    <div className="review-item__user--time">
                                        3 week ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review-item">
                            <div className="review-item__content">
                                <div className="review-item__content--star">
                                    <div className="star-rating">
                                        <i className="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star"
                                           data-rating="1"></i>
                                        <i className="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="2"></i>
                                        <i className="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="3"></i>
                                        <i className="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="4"></i>
                                        <i className="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="5"></i>
                                        <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}"
                                               className="star-rating__value" value="{{ course.rate_score }}" />
                                    </div>
                                </div>
                                <div className="review-item__content--text">
                                    Great course! Simple and concise explanations of the Agile concepts with practical
                                    advise and templates. Enought to get started and learn more along the way!
                                </div>
                            </div>
                            <div className="review-item__user">
                                <img src="" alt=""
                                     className="review-item__user--avatar" />
                                    <div className="review-item__user--info">
                                        <div className="review-item__user--name">
                                            Name
                                        </div>
                                        <div className="review-item__user--email">
                                            @zanta
                                        </div>
                                        <div className="review-item__user--time">
                                            3 week ago
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="review-item">
                            <div className="review-item__content">
                                <div className="review-item__content--star">
                                    <div className="star-rating">
                                        <i className="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star"
                                           data-rating="1"></i>
                                        <i className="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="2"></i>
                                        <i className="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="3"></i>
                                        <i className="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="4"></i>
                                        <i className="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star"
                                           data-rating="5"></i>
                                        <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}"
                                               className="star-rating__value" value="{{ course.rate_score }}" />
                                    </div>
                                </div>
                                <div className="review-item__content--text">
                                    Great course! Simple and concise explanations of the Agile concepts with practical
                                    advise and templates. Enought to get started and learn more along the way!
                                </div>
                            </div>
                            <div className="review-item__user">
                                <img src="" alt=""
                                     className="review-item__user--avatar" />
                                    <div className="review-item__user--info">
                                        <div className="review-item__user--name">
                                            Name
                                        </div>
                                        <div className="review-item__user--email">
                                            @lodash123
                                        </div>
                                        <div className="review-item__user--time">
                                            3 week ago
                                        </div>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            <section className="mt-10 section-10 section-course-related" id="cs-course-related">
                <h2 className="text--main section-course-related__header">
                    Courses you may like!
                </h2>
            </section>
        </div>
)
};

export default CourseDetail
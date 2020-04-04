import React from 'react'

const CourseDetailReview = ({course}) => {

    return (
        <section className="mt-10 section-course-review" id="cs-course-review">
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
                                   className="star-rating__value" value="{{ course.rate_score }}"/>
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
                                           className="star-rating__value" value="{{ course.rate_score }}"/>
                                </div>
                            </div>
                            <div className="review-item__content--text">
                                Great course! Simple and concise explanations of the Agile concepts with
                                practical
                                advise and templates. Enought to get started and learn more along the way!
                            </div>
                        </div>
                        <div className="review-item__user">
                            <img src="" alt="" className="review-item__user--avatar"/>
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
                                Great course! Simple and concise explanations of the Agile concepts with
                                practical
                                advise and templates. Enought to get started and learn more along the way!
                            </div>
                        </div>
                        <div className="review-item__user">
                            <img src="" alt=""
                                 className="review-item__user--avatar"/>
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
                                           className="star-rating__value" value="{{ course.rate_score }}"/>
                                </div>
                            </div>
                            <div className="review-item__content--text">
                                Great course! Simple and concise explanations of the Agile concepts with
                                practical
                                advise and templates. Enought to get started and learn more along the way!
                            </div>
                        </div>
                        <div className="review-item__user">
                            <img src="" alt=""
                                 className="review-item__user--avatar"/>
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
                                           className="star-rating__value" value="{{ course.rate_score }}"/>
                                </div>
                            </div>
                            <div className="review-item__content--text">
                                Great course! Simple and concise explanations of the Agile concepts with
                                practical
                                advise and templates. Enought to get started and learn more along the way!
                            </div>
                        </div>
                        <div className="review-item__user">
                            <img src="" alt=""
                                 className="review-item__user--avatar"/>
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

    )
};

export default CourseDetailReview
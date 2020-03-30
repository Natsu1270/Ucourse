import React from 'react'


const CourseDetail = () => {
    return (
        <div className="course-detail">
            {#  Banner #}
            <section class="section-10 section-course-banner" id="cs-course-banner" xmlns:xlink="">
            <nav aria-label="breadcrumb" class="cs-nav-breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text--sub"><a href="#">Home</a></li>
                    <li class="breadcrumb-item text--sub"><a href="#">Library</a></li>
                    <li class="breadcrumb-item  text--sub" aria-current="page"><span class="text--sub cs-nav-breadcrumb__item-active">{{ course.name }}</span></li>
                </ol>
            </nav>
            <div class="course-banner d-flex justify-content-start">
                <div class="course-detail">
                    <h1 class="text--main text--main__bigger text-white">{{ course.name }}</h1>
                    <p class="course-description text--sub text--sub__bigger mt-4">Kickstart your Career in Data Science & ML. Master data science, learn Python & SQL, analyze & visualize data, build machine learning models</p>
                    <div class="d-flex enroll-area mt-5">
                        <a href="{% url 'course_learn' course.code %}" class="cs-btn cs-btn--animated cs-btn--banner cs-btn--white">
                            Đăng ký học
          </a>
                        <div class="course-info">
                            <p class="text-white text--sub">Khoá học bắt đầu vào : {{ course.pretty_date }}</p>
                            <p class="text-white text--sub">Giảng viên : {{ course.instructor.get_full_name }}</p>
                            <p class="text-white text--sub">Điểm đánh giá: {{ course.rate_score }} ({{ course.rate_num }} ratings)</p>
                        </div>
                    </div>
                </div>
                <div class="course-avatar">
                    <img src="{{ course.avatar.url }}" class="img-thumbnail rounded" alt="">
      </div>
                </div>
  </section>

            {#  Tab #}
            <section class="section-10 section-course-tab" id="cs-course-tab">
                <ul class="course-tab">
                    <li class="course-tab__address" id="tab-overview"><a href="#cs-course-overview" class="course-tab__address--link">Overview</a></li>
                    <li class="course-tab__address" id="tab-components"><a href="#cs-course-components" class="course-tab__address--link">Components</a></li>
                    <li class="course-tab__address" id="tab-tutors"><a href="#cs-course-tutors" class="course-tab__address--link">Instructors</a></li>
                    <li class="course-tab__address" id="tab-review"><a href="#cs-course-review" class="course-tab__address--link">Reviews</a></li>
                    <li class="course-tab__address" id="tab-related"><a href="#cs-course-related" class="course-tab__address--link">Related courses</a></li>
                    <li class="course-tab__btn">
                        <a href="{% url 'course_learn' course.code %}" class="cs-btn cs-btn--animated">Đăng ký ngay</a>

                        <a href="{% url 'exam:ability_exam' course.code %}" class="cs-btn cs-btn--animated"> Test năng lực</a>
                    </li>
                </ul>

            </section>

            {#  Overview #}
            <section class="mt-10 section-10 section-course-overview" id="cs-course-overview">
                <div class="section-course-overview__content">
                    <h2 class="text--main section-course-overview__header" id="cs-course-overview">
                        Course overview
        </h2>
                    <span class="text--sub section-course-overview__description">
                        This Specialization builds on the success of the Python for Everybody course and will introduce fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. In the Capstone Project, you’ll use the technologies learned throughout the Specialization to design and create your own applications for data retrieval, processing, and visualization.
        </span>
                    <div class="section-course-overview__right">
                        <div class="section-course-overview__right--items">
                            <div class="section-course-overview__right--item">
                                <span class="section-course-overview__right--item__ico">
                                    {% svg 'earth' %}
              </span>
                                <div class="section-course-overview__right--item__text">
                                    {{ course.get_type_display }}
                                </div>
                            </div>
                            <div class="section-course-overview__right--item">
                                <span class="section-course-overview__right--item__ico">
                                    {% if course.level == 'bg' %}
                  {% svg 'happy' %}
                {% endif %}
                                    {% if course.level == 'im' %}
                  {% svg 'smile' %}
                {% endif %}
                                    {% if course.level == 'ad' %}
                    {% svg 'evil' %}
                  {% endif %}
                                    {% if course.level == 'mx' %}
                    {% svg 'sleepy' %}
                {% endif %}
                                </span>
                                <div class="section-course-overview__right--item__text">
                                    {{ course.get_level_display }}
                                </div>
                            </div>
                            <div class="section-course-overview__right--item"></div>
                            <div class="section-course-overview__right--item"></div>
                        </div>
                    </div>
                    <div class="section-course-overview__detail">
                        <h3>What you will learn</h3>
                        <div class="section-course-overview__detail-items">
                            <div class="section-course-overview__detail-item">
                                <span class="section-course-overview__detail-ico">
                                    {% svg 'done_all' %}
              </span>
                                <div class="section-course-overview__detail-text">
                                    Create your own applications for data retrieval and processing
              </div>
                            </div>
                            <div class="section-course-overview__detail-item">
                                <span class="section-course-overview__detail-ico">
                                    {% svg 'done_all' %}
              </span>
                                <div class="section-course-overview__detail-text">
                                    Describe the basics of the Structured Query Language (SQL) and database design
              </div>
                            </div>
                            <div class="section-course-overview__detail-item">
                                <span class="section-course-overview__detail-ico">
                                    {% svg 'done_all' %}
              </span>
                                <div class="section-course-overview__detail-text">
                                    Understand fundamental programming concepts such as data structures
              </div>
                            </div>
                            <div class="section-course-overview__detail-item">
                                <span class="section-course-overview__detail-ico">
                                    {% svg 'done_all' %}
              </span>
                                <div class="section-course-overview__detail-text">
                                    Explain the basics of programming computers using Python
              </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-course-overview__skill">
                        <h3>Skill you will earn</h3>
                        <ul class="section-course-overview__skill--sets">
                            <li class="section-course-overview__skill--item">
                                SQL
            </li>
                            <li class="section-course-overview__skill--item">
                                Excel
            </li>
                            <li class="section-course-overview__skill--item">
                                Data scrawl
            </li>
                            <li class="section-course-overview__skill--item">
                                Database (DBMS)
            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {#  Components #}
            <section class="mt-10 section-10 section-course-components" id="cs-course-components">
                <div class="section-course-components__content">
                    <h2 class="text--main section-course-components__header" id="cs-course-overview">
                        Components
      </h2>
                    <div class="section-course-components__tabs">

                        <input type="radio" id="tab1" name="tab-control">
                            <input type="radio" id="tab2" name="tab-control" checked>
                                <input type="radio" id="tab3" name="tab-control">

                                    <ul class="section-course-components__tabs--indexes">
                                        <li class="section-course-components__tabs--index">
                                            <label for="tab1" class="section-course-components__tabs--label">
                                                <span>Week 1</span>
                                            </label>
                                        </li>
                                        <li class="section-course-components__tabs--index">
                                            <label for="tab2" class="section-course-components__tabs--label">
                                                <span>Week 2</span>
                                            </label>
                                        </li>
                                        <li class="section-course-components__tabs--index">
                                            <label for="tab3" class="section-course-components__tabs--label">
                                                <span>Week 3</span>
                                            </label>
                                        </li>
                                    </ul>


                                    <div class="section-course-components__tabs--content content ">
                                        <section>
                                            <h2>Chapter One - Why we Program?</h2>
                                            <span class="text--sub">These are the course-wide materials as well as the first part of Chapter One where we explore what it means to write programs. We finish Chapter One and have the quiz and first assignment in the third week of the class. Throughout the course you may want to come back and look at these materials. This section should not take you an entire week.</span>
                                        </section>
                                        <section>
                                            <h2>Installing and Using Python</h2>
                                            <span class="text--sub">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas adipisci a accusantium eius ut voluptatibus ad impedit nulla, ipsa qui. Quasi temporibus eos commodi aliquid impedit amet, similique nulla.
            </span>
                                        </section>
                                        <section>
                                            <h2>Shipping</h2>
                                            <span class="text--sub">
                                                In this module you will set things up so you can write Python programs. Not all activities in this module are required for this class so please read the "Using Python in this Class" material for details.
            </span>
                                        </section>
                                        <section>
                                            <h2>Chapter Two: Variables and Expressions</h2>
                                            <span class="text--sub">In this chapter we cover how a program uses the computer's memory to store, retrieve and calculate information.</span>
                                        </section>
                                    </div>
        
      </div>
      
    </div>
  </section>

                        {#  Tutors #}
  <section class="mt-10 section-10 section-course-tutors" id="cs-course-tutors">
                            <h2 class="text--main section-course-tutors__header" id="cs-course-overview">
                                Instructors
    </h2>
                            <div class="section-course-tutors--content">
                                <div class="section-course-tutors--content__main">
                                    <figure class="section-course-tutors--content__avatar">
                                        <img src="{{ course.instructor.profile.avatar.url }}" alt="" class="section-course-tutors--content__img">
        </figure>
                                        <div class="section-course-tutors--content__info">
                                            <span class="tutor-name mb-2"><a href="#">{{ course.instructor.get_full_name }}</a></span>
                                            <span class="tutor-email">{{ course.instructor.email }}</span>
                                        </div>
      </div>
                                </div>
  
  </section>

                            <section class="mt-10 section-10 section-course-review" id="cs-course-review">
                                <h2 class="text--main section-course-review__header">
                                    Reviews
    </h2>
                                <div class="section-course-review--feedback">
                                    <h3 class="text--sub__bigger2 text--sub__600 mb-5">Student feedback</h3>
                                    <div class="feedback-rating">
                                        <div class="feedback-rating__score">
                                            <span class="score-num">{{ course.rate_score }}</span>
                                            <div class="star-rating">
                                                <i class="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star" data-rating="1"></i>
                                                <i class="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="2"></i>
                                                <i class="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="3"></i>
                                                <i class="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="4"></i>
                                                <i class="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="5"></i>
                                                <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}" class="star-rating__value" value="{{ course.rate_score }}">
          </div>
                                            </div>
                                            <div class="feedback-rating__ratio">
                                                <div class="feedback-rating__ratio--5">
                                                    <div class="ratio-base">
                                                        <span class="ratio-real">

                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="feedback-rating__ratio--5">
                                                    <div class="ratio-base">
                                                        <span class="ratio-real">

                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="feedback-rating__ratio--5">
                                                    <div class="ratio-base">
                                                        <span class="ratio-real">

                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="feedback-rating__ratio--5">
                                                    <div class="ratio-base">
                                                        <span class="ratio-real">

                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="feedback-rating__ratio--5">
                                                    <div class="ratio-base">
                                                        <span class="ratio-real">

                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <h3 class="text--sub__bigger2 text--sub__600 mb-5">Student reviews</h3>
                                        <div class="review-items">
                                            <div class="review-item">
                                                <div class="review-item__content">
                                                    <div class="review-item__content--star">
                                                        <div class="star-rating">
                                                            <i class="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star" data-rating="1"></i>
                                                            <i class="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="2"></i>
                                                            <i class="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="3"></i>
                                                            <i class="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="4"></i>
                                                            <i class="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="5"></i>
                                                            <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}" class="star-rating__value" value="{{ course.rate_score }}">
              </div>
                                                        </div>
                                                        <div class="review-item__content--text">
                                                            Great course! Simple and concise explanations of the Agile concepts with practical advise and templates. Enought to get started and learn more along the way!
            </div>
                                                    </div>
                                                    <div class="review-item__user">
                                                        <img src="{% static 'ico/sadface.svg' %}" alt="" class="review-item__user--avatar">
                                                            <div class="review-item__user--info">
                                                                <div class="review-item__user--name">
                                                                    Name
            </div>
                                                                <div class="review-item__user--email">
                                                                    @lodash123
              </div>
                                                                <div class="review-item__user--time">
                                                                    3 week ago
              </div>
                                                            </div>
          </div>
                                                    </div>
                                                    <div class="review-item">
                                                        <div class="review-item__content">
                                                            <div class="review-item__content--star">
                                                                <div class="star-rating">
                                                                    <i class="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star" data-rating="1"></i>
                                                                    <i class="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="2"></i>
                                                                    <i class="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="3"></i>
                                                                    <i class="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="4"></i>
                                                                    <i class="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="5"></i>
                                                                    <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}" class="star-rating__value" value="{{ course.rate_score }}">
              </div>
                                                                </div>
                                                                <div class="review-item__content--text">
                                                                    Great course! Simple and concise explanations of the Agile concepts with practical advise and templates. Enought to get started and learn more along the way!
            </div>
                                                            </div>
                                                            <div class="review-item__user">
                                                                <img src="{% static 'ico/glassface.svg' %}" alt="" class="review-item__user--avatar">
                                                                    <div class="review-item__user--info">
                                                                        <div class="review-item__user--name">
                                                                            Name
            </div>
                                                                        <div class="review-item__user--email">
                                                                            @titan123
              </div>
                                                                        <div class="review-item__user--time">
                                                                            3 week ago
              </div>
                                                                    </div>
          </div>
                                                            </div>
                                                            <div class="review-item">
                                                                <div class="review-item__content">
                                                                    <div class="review-item__content--star">
                                                                        <div class="star-rating">
                                                                            <i class="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star" data-rating="1"></i>
                                                                            <i class="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="2"></i>
                                                                            <i class="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="3"></i>
                                                                            <i class="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="4"></i>
                                                                            <i class="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="5"></i>
                                                                            <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}" class="star-rating__value" value="{{ course.rate_score }}">
              </div>
                                                                        </div>
                                                                        <div class="review-item__content--text">
                                                                            Great course! Simple and concise explanations of the Agile concepts with practical advise and templates. Enought to get started and learn more along the way!
            </div>
                                                                    </div>
                                                                    <div class="review-item__user">
                                                                        <img src="{% static 'ico/angelface.svg' %}" alt="" class="review-item__user--avatar">
                                                                            <div class="review-item__user--info">
                                                                                <div class="review-item__user--name">
                                                                                    Name
            </div>
                                                                                <div class="review-item__user--email">
                                                                                    @zanta
              </div>
                                                                                <div class="review-item__user--time">
                                                                                    3 week ago
              </div>
                                                                            </div>
          </div>
                                                                    </div>
                                                                    <div class="review-item">
                                                                        <div class="review-item__content">
                                                                            <div class="review-item__content--star">
                                                                                <div class="star-rating">
                                                                                    <i class="{% if course.rate_score >= 0.5 %} fas {% else %} fal {% endif %}  fa-star star-rating__star" data-rating="1"></i>
                                                                                    <i class="{% if course.rate_score >= 1.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="2"></i>
                                                                                    <i class="{% if course.rate_score >= 2.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="3"></i>
                                                                                    <i class="{% if course.rate_score >= 3.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="4"></i>
                                                                                    <i class="{% if course.rate_score >= 4.5 %} fas {% else %} fal {% endif %} fa-star star-rating__star" data-rating="5"></i>
                                                                                    <input type="hidden" name="whatever1" id="rate-score-{{ course.id }}" class="star-rating__value" value="{{ course.rate_score }}">
              </div>
                                                                                </div>
                                                                                <div class="review-item__content--text">
                                                                                    Great course! Simple and concise explanations of the Agile concepts with practical advise and templates. Enought to get started and learn more along the way!
            </div>
                                                                            </div>
                                                                            <div class="review-item__user">
                                                                                <img src="{% static 'ico/speechlessface.svg' %}" alt="" class="review-item__user--avatar">
                                                                                    <div class="review-item__user--info">
                                                                                        <div class="review-item__user--name">
                                                                                            Name
            </div>
                                                                                        <div class="review-item__user--email">
                                                                                            @lodash123
              </div>
                                                                                        <div class="review-item__user--time">
                                                                                            3 week ago
              </div>
                                                                                    </div>
          </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
  
  </section>

                                                                <section class="mt-10 section-10 section-course-related" id="cs-course-related">
                                                                    <h2 class="text--main section-course-related__header">
                                                                        Courses you may like!
    </h2>

                                                                    <div class="section-course-related__content">
                                                                        <div class="owl-carousel owl-theme">
                                                                            {% for relate in courses %}
          <div class="course-card-small">
                                                                                <div class="course-card-small__avatar">
                                                                                    <img src="{{ relate.avatar.url }}" alt="">
              </div>
                                                                                    <div class="course-card-small__body">
                                                                                        <div class="card-title" onclick="window.location.href = '{% url 'course_detail' relate.code %}';">
                                                                                            <a href="{% url 'course_detail' relate.code %}" class="text--sub__bigger">{{ relate.name }}</a>
                                                                                        </div>
                                                                                        <p class="text--sub
                        {% if relate.level == 'bg' %}
                          text-success
                        {% endif %}
                        {% if relate.level == 'im' %}
                          text-primary
                        {% endif %}          
                        {% if relate.level == 'ad' %}
                          text-danger
                        {% endif %}
                        {% if relate.level == 'mx' %}
                          text-warning
                        {% endif %}    
                ">{{ relate.get_level_display }}</p>
                                                                                    </div>
                                                                                </div>
                                                                                {% endfor %}
                                                                            </div>
                                                                        </div>
    
  </section>
        </div>
    )
}

export default CourseDetail
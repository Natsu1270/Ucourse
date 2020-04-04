import React from 'react'

const CourseDetailComponents = ({course}) => {
    return (
        <section className="mt-10 section-10 section-course-components" id="cs-course-components">
            <div className="section-course-components__content">
                <h2 className="text--main section-course-components__header" id="cs-course-overview">
                    Components
                </h2>
                <div className="section-course-components__tabs">

                    <input type="radio" id="tab1" name="tab-control"/>
                    <input type="radio" id="tab2" name="tab-control" checked/>
                    <input type="radio" id="tab3" name="tab-control"/>

                    <ul className="section-course-components__tabs--indexes">
                        <li className="section-course-components__tabs--index">
                            <label htmlFor="tab1" className="section-course-components__tabs--label">
                                <span>Week 1</span>
                            </label>
                        </li>
                        <li className="section-course-components__tabs--index">
                            <label htmlFor="tab2" className="section-course-components__tabs--label">
                                <span>Week 2</span>
                            </label>
                        </li>
                        <li className="section-course-components__tabs--index">
                            <label htmlFor="tab3" className="section-course-components__tabs--label">
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
    )
};

export default CourseDetailComponents
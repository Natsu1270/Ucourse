import React from 'react'
import {Tabs} from 'antd'

const CourseDetailComponents = ({course}) => {
    const {TabPane} = Tabs;

    return (
        <section className="mt-10 section-course-components" id="cs-course-components">
            <div className="section-course-components__content">
                <h2 className="text--main section-header" id="cs-course-overview">
                    Components
                </h2>
                <div className="section-course-components__tabs">

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Week 1" key="1" >
                            <section>
                                <h2>Chapter One - Why we Program?</h2>
                                <span className="text--sub">These are the course-wide materials as well as the first part of Chapter One where we explore what it means to write programs. We finish Chapter One and have the quiz and first assignment in the third week of the className. Throughout the course you may want to come back and look at these materials. This section should not take you an entire week.</span>
                            </section>
                        </TabPane>
                        <TabPane tab="Week 2" key="2" >
                            <section>
                                <h2>Installing and Using Python</h2>
                                <span className="text--sub">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas adipisci a accusantium eius ut voluptatibus ad impedit nulla, ipsa qui. Quasi temporibus eos commodi aliquid impedit amet, similique nulla.
                                </span>
                            </section>
                        </TabPane>
                        <TabPane tab="Week 3" key="3" >
                            <section>
                                <h2>Shipping</h2>
                                <span className="text--sub">
                                    In this module you will set things up so you can write Python programs. Not all activities in this module are required for this className so please read the "Using Python in this className" material for details.
                                </span>
                            </section>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        </section>
    )
};

export default CourseDetailComponents
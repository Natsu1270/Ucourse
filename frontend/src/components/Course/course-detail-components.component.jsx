import React from 'react'
import { Avatar, Card, Empty, Skeleton, Tabs } from 'antd'
import documentAvatar from '../../assets/pdf.png';
import { parseHtml } from "../../utils/text.utils";

const { Meta } = Card;

const CourseDetailComponents = ({ course, loading }) => {
    const { TabPane } = Tabs;
    const courseOutline = () => {
        if (!course.outline_detail && !course.outline_file) {
            return <Empty />
        } else {
            return (
                <div>
                    {parseHtml(course.outline_detail)}
                    <Card hoverable style={{ width: 300, marginTop: 16 }}
                        onClick={() => window.open(course.outline_file, '_blank')}>
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src={documentAvatar} />
                                }
                                title={course.title}
                                description="File đính kèm chi tiết"
                            />
                        </Skeleton>
                    </Card>
                </div>)
        }
    }

    return (
        <section className="mt-10 section-course-components" id="cs-course-components">
            <div className="section-course-components__content">
                <h2 className="text--main section-header" id="cs-course-overview">
                    Chương trình học
                </h2>
                <div className="section-course-components__tabs">
                    {courseOutline()}

                    {/*<Tabs defaultActiveKey="1">*/}
                    {/*    <TabPane tab="Week 1" key="1" >*/}
                    {/*        <section>*/}
                    {/*            <h2>Chapter One - Why we Program?</h2>*/}
                    {/*            <span className="text--sub">These are the course-wide materials as well as the first part of Chapter One where we explore what it means to write programs. We finish Chapter One and have the quiz and first assignment in the third week of the className. Throughout the course you may want to come back and look at these materials. This section should not take you an entire week.</span>*/}
                    {/*        </section>*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab="Week 2" key="2" >*/}
                    {/*        <section>*/}
                    {/*            <h2>Installing and Using Python</h2>*/}
                    {/*            <span className="text--sub">*/}
                    {/*                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas adipisci a accusantium eius ut voluptatibus ad impedit nulla, ipsa qui. Quasi temporibus eos commodi aliquid impedit amet, similique nulla.*/}
                    {/*            </span>*/}
                    {/*        </section>*/}
                    {/*    </TabPane>*/}
                    {/*</Tabs>*/}
                </div>

            </div>
        </section>
    )
};

export default CourseDetailComponents
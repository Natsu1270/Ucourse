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
                <div style={{ fontSize: '1.6rem' }}>
                    <div className="pl-4">
                        {parseHtml(course.outline_detail)}
                    </div>
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
        <section className="mt-5 section-course-components" id="cs-course-components">
            <div className="section-course-components__content">
                <h2 className="text--main section-header" id="cs-course-overview">
                    Chương trình học
                </h2>
                <div className="section-course-components__tabs">
                    {courseOutline()}
                </div>

            </div>
        </section>
    )
};

export default CourseDetailComponents
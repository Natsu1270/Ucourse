import React from 'react'
import {parseHtml} from "../../utils/text.utils";
import {Skeleton} from "antd";

const CourseHomeInfo = ({courseInfo, isLoading}) => {
    return (
        <section className="section-10 section-learn course-home-info">
            {isLoading ? <Skeleton active /> : parseHtml(courseInfo) }
        </section>
    )
};

export default CourseHomeInfo
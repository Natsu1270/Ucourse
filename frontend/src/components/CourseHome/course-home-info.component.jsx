import React from 'react'
import {parseHtml} from "../../utils/text.utils";
import {Skeleton} from "antd";

const CourseHomeInfo = ({courseInfo, isLoading}) => {
    return (
        <section className="section-5 page-2 course-home-info">
            <h3 className="text--main mb-5">
                Tổng quan về khóa học
            </h3>
            {isLoading ? <Skeleton active /> : parseHtml(courseInfo) }
        </section>
    )
};

export default CourseHomeInfo
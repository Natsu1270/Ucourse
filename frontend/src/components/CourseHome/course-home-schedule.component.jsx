import React from 'react'
import {Skeleton} from "antd";
import CourseHomeTopic from "./course-home-topic.component";

const CourseHomeSchedule = ({topics, isLoading}) => {

    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Chủ đề học
            </h3>
            {
                isLoading ? (
                    <div>
                        <Skeleton active avatar/>
                        <Skeleton active avatar/>
                        <Skeleton active avatar/>
                        <Skeleton active avatar/>
                        <Skeleton active avatar/>
                    </div>
                ) : topics.map(topic => <CourseHomeTopic key={topic.id} topic={topic}/>)
            }
        </section>
    )
};

export default CourseHomeSchedule;
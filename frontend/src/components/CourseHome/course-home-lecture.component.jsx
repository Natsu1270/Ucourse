import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Skeleton} from "antd";
import Plyr from '../Common/video-player.component';
import 'plyr/dist/plyr.css'


const CourseHomeLecture = ({topics, isLoading}) => {
    const {topic, assetId} = useParams();
    const lectureTopics = topics ? topics.find(t => t.id === parseInt(topic)) : null
    const lecture = lectureTopics ? lectureTopics.topic_assets.find(file => file.id === parseInt(assetId)) : {}
    useEffect(() => {
    },[])
    return (
        <section className="section-5 page-2 course-lecture">
            {
                isLoading ? <Skeleton active avatar paragraph={{rows: 4}}/> :
                    <div>
                        <h3 className="text--main course-lecture--title mb-5">
                            {lecture.name}
                        </h3>
                        <div className="course-lecture--video">
                            <Plyr videoUrl={lecture.file}/>
                        </div>
                    </div>
            }

        </section>
    )
}

export default CourseHomeLecture
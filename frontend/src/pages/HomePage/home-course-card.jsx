import React from 'react'
import {Avatar, Card} from "antd";

const HomeCourseCard = ({course, onClick}) => {
    const { Meta } = Card;
    return (
        <Card
            className="private-home__learning--item"
            onClick={onClick}
            style={{width: 400, marginTop: 16}}
            hoverable>
            <Meta
                avatar={
                    <Avatar
                        size={48}
                        src={course.course.icon}/>
                }
                title={course.course.title}
                description={course.course.status}
            />
        </Card>
    )
}

export default HomeCourseCard
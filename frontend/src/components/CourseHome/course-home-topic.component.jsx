import React from 'react'
import {Avatar, List} from 'antd'
import videoAvatar from '../../assets/video-file.png';
import documentAvatar from '../../assets/pdf.png';
import Constants from "../../constants";

const CourseHomeTopic = ({topic}) => {

    const topicAssets = topic.topic_assets.map(
        asset => ({
                title: asset.name,
                icon: asset.icon,
                info: asset.info,
                file_type: asset.file_type,
                content: asset.file
            })
    )

    const assetAvatar = (icon, type) => {
        return icon ? icon : type === Constants.VIDEO_FILE_TYPE ? videoAvatar : documentAvatar

    }

    return (
        <div className="course-topic">
            <h3 className="course-topic__header text--main">
                {topic.name}
            </h3>
            <div className="course-topic__content">
                <List
                    itemLayout="horizontal"
                    dataSource={topicAssets}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={assetAvatar(item.icon, item.file_type)} />}
                                title={item.title}
                                description={item.info}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
};

export default CourseHomeTopic;
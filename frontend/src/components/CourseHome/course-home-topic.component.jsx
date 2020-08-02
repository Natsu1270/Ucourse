import React from 'react'
import { Avatar, List } from 'antd'
import { useHistory } from 'react-router-dom'
import videoAvatar from '../../assets/file.png';
import documentAvatar from '../../assets/word.png';
import quizIcon from '../../assets/quiz.png';
import Constants from "../../constants";
import { parseHtml, formatDate } from "../../utils/text.utils"

const CourseHomeTopic = ({ topic }) => {
    const history = useHistory()

    function gotoLecture(assetId, fileUrl, type) {
        if (type === Constants.VIDEO_FILE_TYPE) {
            history.push(`lecture/${topic.id}/${assetId}`)
        } else {
            window.open(fileUrl, '_blank')
        }
    }

    function gotoExam(exam_id) {
        history.push(`exams/${exam_id}`)
    }

    const topicAssets = topic.topic_assets.map(
        asset => ({
            id: asset.id,
            title: asset.name,
            icon: asset.icon,
            info: asset.info,
            file_type: asset.file_type,
            content: asset.file
        })
    )

    const topicQuizes = topic.topic_exams.map(
        quiz => ({
            id: quiz.id,
            title: quiz.name,
            info: quiz.info,
            expired: quiz.expired_date
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
            {topic.info ? <div className="course-topic__info">
                {parseHtml(topic.info)}
            </div> : null}
            <div className="course-topic__content">
                <List
                    itemLayout="horizontal"
                    dataSource={topicAssets}
                    renderItem={item => (
                        <List.Item className="course-topic__content--item" onClick={() => gotoLecture(item.id, item.content, item.file_type)}>
                            <List.Item.Meta
                                avatar={<Avatar src={assetAvatar(item.icon, item.file_type)} />}
                                title={item.title}
                                description={item.info}
                            />
                        </List.Item>
                    )}
                />
                {
                    topicQuizes.length > 0 ?
                        <List
                            itemLayout="horizontal"
                            dataSource={topicQuizes}
                            renderItem={item => (
                                <List.Item className="course-topic__content--item" onClick={() => gotoExam(item.id)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={quizIcon} />}
                                        title={item.title}
                                        description={item.expired ? <p>Bài kiểm tra sẽ hết hạn vào: {formatDate(item.expired, Constants.MMM_Do_YYYY)}</p> : null}
                                    />
                                </List.Item>
                            )}
                        /> : null
                }
            </div>
        </div>
    )
};

export default CourseHomeTopic;
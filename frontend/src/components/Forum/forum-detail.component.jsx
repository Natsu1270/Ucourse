import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useParams, useHistory, useRouteMatch} from 'react-router-dom'
import {getForumDetailStart} from "../../redux/Forum/forum.actions";
import {createStructuredSelector} from "reselect";

import {
    errorResponseSelector,
    forumDetailSelector,
    forumThreadsSelector,
    isGettingSelector
} from "../../redux/Forum/forum.selects";
import {List, Skeleton, Button, Tag} from "antd";
import {formatDate} from '../../utils/text.utils';
import Constants from '../../constants'
import {CommentOutlined, UserOutlined, FieldTimeOutlined} from '@ant-design/icons'

const ForumDetail = ({token}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const {forum_id} = useParams()

    useEffect(() => {
        dispatch(getForumDetailStart({token, forum_id}))
    }, [])

    const {forumDetail, forumThreads, isGetting, errorResponse} = useSelector(createStructuredSelector({
        forumDetail: forumDetailSelector,
        forumThreads: forumThreadsSelector,
        isGetting: isGettingSelector,
        errorResponse: errorResponseSelector,
    }))

    const renderItem = (item) => (
        <div className="forum-item">
            <div className="dis-flex-col">
                <div className="dis-flex-between  mb-4">
                    <span className="forum-item--title">{item.name}</span>
                    <Tag className="forum--tag" color="magenta"><CommentOutlined/> {item.reply_count} phản hồi</Tag>
                </div>
                <div className="forum-item--text dis-flex-between forum-item--subtext">
                    <Tag color="green" className="forum--tag">
                        <UserOutlined/> {item.created_by.user_profile.fullname}</Tag>
                    <span className="b-500 mr-4">
                        <FieldTimeOutlined/> {formatDate(item.created_date, Constants.MMM_Do__YY__TIME)}
                    </span>
                    <span>
                        Phản hồi cuối cùng : <a href="#">{item.last_reply.created_by.user_profile.fullname}</a>
                    </span>
                    <span>
                        lúc: {formatDate(item.last_reply.timestamp, Constants.MMM_Do__YY__TIME)}
                    </span>
                </div>
            </div>

        </div>
    )

    return (
        <section className="section-5 forum-detail page-2">
            {isGetting ? <Skeleton active paragraph={{rows: 1}}/> :
                <h3 className="text--main mb-5">{forumDetail.name}</h3>}
            {
                isGetting ? <Skeleton active paragraph={{rows: 4}}/> :
                    <List
                        header={<div className="dis-flex-between align-items-center">
                            <h3 className="forum--subtitle">Danh sách chủ đề</h3>
                            <Button type="primary">Tạo một chủ đề</Button>
                        </div>}
                        className="forum--content__list"
                        size="large"
                        bordered
                        dataSource={forumThreads}
                        renderItem={
                            item =>
                                <List.Item onClick={() => history.push(`${match.url}/threads/${item.id}`)}>
                                    {renderItem(item)}
                                </List.Item>
                        }
                    />
            }
        </section>
    )
}

export default ForumDetail
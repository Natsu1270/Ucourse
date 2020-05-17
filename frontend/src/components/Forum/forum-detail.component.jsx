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
import ForumItem from "./forum-item.component";
import {toggleCreateThreadModal} from "../../redux/UI/ui.actions";
import ThreadModal from "./thread-modal.component";

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


    return (
        <section className="section-5 forum-detail page-2">
            <Skeleton loading={isGetting} active paragraph={{rows: 1}}>
                <h3 className="text--main mb-5">{forumDetail.name}</h3>
            </Skeleton>
            <Skeleton active loading={isGetting}>
                <List
                    header={<div className="dis-flex-between align-items-center">
                        <h3 className="forum--subtitle">Danh sách chủ đề</h3>
                        <Button
                            onClick={() => dispatch(toggleCreateThreadModal())}
                            type="primary">
                            Tạo một chủ đề
                        </Button>
                    </div>}
                    className="forum--content__list"
                    size="large"
                    bordered
                    dataSource={forumThreads}
                    renderItem={
                        item =>
                            <List.Item onClick={() => history.push(`${match.url}/threads/${item.id}`)}>
                                <ForumItem item={item}/>
                            </List.Item>
                    }
                />
            </Skeleton>
            <ThreadModal token={token} forum_id={forum_id} isCreate={true} />
        </section>
    )
}

export default ForumDetail
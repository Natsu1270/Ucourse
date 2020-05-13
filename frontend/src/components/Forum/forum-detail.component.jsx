import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
import {getForumDetailStart} from "../../redux/Forum/forum.actions";
import {createStructuredSelector} from "reselect";
import {
    errorResponseSelector,
    forumDetailSelector,
    forumThreadsSelector,
    isGettingSelector
} from "../../redux/Forum/forum.selects";
import {List, Skeleton} from "antd";

const ForumDetail = ({token}) => {

    const history = useHistory()
    const dispatch = useDispatch()
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
        <div className="dis-flex-between forum-item">
            <span>{item.name}</span>
        </div>
    )

    return (
        <section className="section-5 forum-detail page-2">
            {isGetting ? <Skeleton active/> : <h3 className="text--main mb-5">{forumDetail.name}</h3>}
            <h3 className="forum--subtitle mb-5">Danh sách các câu hỏi: </h3>
            {
                isGetting ? <Skeleton active paragraph={{rows: 4}}/> :
                    <List
                        className="forum--content__list"
                        size="large"
                        bordered
                        dataSource={forumThreads}
                        renderItem={
                            item =>
                                <List.Item onClick={() => history.push(`${item.id}`)}>
                                    {renderItem(item)}
                                </List.Item>
                        }
                    />
            }
        </section>
    )
}

export default ForumDetail
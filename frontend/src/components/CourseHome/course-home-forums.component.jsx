import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {List, Skeleton} from "antd";
import {useHistory, useRouteMatch} from 'react-router-dom'
import {getForumsStart} from "../../redux/Forum/forum.actions";
import {createStructuredSelector} from "reselect";
import {errorResponseSelector, forumsSelector, isGettingSelector} from "../../redux/Forum/forum.selects";

const CourseHomeForums = ({forums, isLoading}) => {

    const history = useHistory()
    const match = useRouteMatch();

    const renderItem = (item) => (
        <div className="dis-flex-between forum-item">
            <span>{item.name}</span>
            <span>{item.thread_count} chủ đề &rarr;</span>
        </div>
    )

    return (
        <section className="section-5 page-2 forum">
            <h4 className="text--main forum--title mb-5">
                Diễn đàn thảo luận
            </h4>
            <h3 className="forum--subtitle mb-5">
                Thảo luận, hỗ trợ về các chủ đề trong quá trình học
            </h3>
            <div className="forum--content">
                {
                    isLoading ? <Skeleton active paragraph={{rows: 4}}/> :
                        <List
                            className="forum--content__list"
                            size="large"
                            bordered
                            dataSource={forums}
                            renderItem={
                                item =>
                                    <List.Item onClick={() => history.push(`${match.url}/${item.id}`)}>
                                        {renderItem(item)}
                                    </List.Item>
                            }
                        />
                }
            </div>
        </section>
    )
};

export default CourseHomeForums
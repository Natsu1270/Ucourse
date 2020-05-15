import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, useRouteMatch, Switch} from 'react-router-dom'
import {createStructuredSelector} from "reselect";
import {
    isLoadingSelector,
    forumsSelector
} from "../../redux/CourseHome/course-home.selects";
import Forums from "../Forum/forums.component";
import ForumDetail from "../Forum/forum-detail.component";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import ThreadDetail from "../Forum/thread-detail.component";
import Page404NotFound from "../../pages/404.page";

const CourseHomeForums = () => {

    const match = useRouteMatch();
    const {
        token,
        isLoading,
        forums
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        isLoading: isLoadingSelector,
        forums: forumsSelector
    }))


    return (
        <Router>
            <Route exact path={match.url}>
                <Forums forums={forums} isLoading={isLoading}/>
            </Route>
            <Route exact path={`${match.url}/:forum_id`}>
                <ForumDetail token={token}/>
            </Route>
            <Route path={`${match.url}/:forum_id/threads/:thread_id`}>
                <ThreadDetail/>
            </Route>

        </Router>
    )
};

export default CourseHomeForums
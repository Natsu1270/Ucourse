import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import Constants from "../../constants";
import { isLoadingSelector } from "../../redux/CourseHome/course-home.selects";


const PrivateCourseRoute = ({ component: Component, ...others }) => {
    const { slug } = others.computedMatch.params;
    const { myCourses } = others;
    const isLoading = useSelector(state => isLoadingSelector(state))
    const isMyCourse = () => {
        return myCourses.find(course => course.slug === slug)
    };
    const redirect = `${Constants.COURSES_DETAIL_LINK}/${slug}`
    if (isLoading) {
        return null;
    } else {
        return (
            <Route
                {...others}
                render={props => (
                    isMyCourse()
                        ?
                        <Component {...props} />
                        :
                        <Redirect to={others.redirectTo ? others.redirectTo : redirect} />
                )}
            />
        )
    }
}

export default PrivateCourseRoute
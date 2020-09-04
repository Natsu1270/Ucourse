import React, { useEffect, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'

import { buyCourseFinish } from '../../redux/Course/course.actions'
import { createStructuredSelector } from "reselect";
import {
    courseDetailSelector,
} from "../../redux/Course/course.selects";

import { tokenSelector } from "../../redux/Auth/auth.selects";


const CourseDetail = ({ location }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { slug } = useParams();
    const {
        course, token,
    } = useSelector(createStructuredSelector({
        course: courseDetailSelector,
        token: tokenSelector,
    }));

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const partnerRefId = params.get("orderId")
        const requestId = params.get("requestId")
        const errorCode = params.get("errorCode")
        const extraData = params.get("extraData")
        dispatch(buyCourseFinish({ course: course.id, token, partnerRefId, requestId, errorCode, extraData }))
    }, [course])




    return (
        <div className="page section-10 course-detail">
        </div>
    )
};

export default CourseDetail
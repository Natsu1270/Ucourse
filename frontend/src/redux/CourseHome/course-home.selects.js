import {createSelector} from 'reselect'

const courseHomeSelector = state => state.courseHome;

export const isLoadingSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.isLoading
);

export const errorResponseRegisterCourseSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.errorResponse
);

export const myCourseHomesSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.myCourseHomes ? courseHome.myCourseHomes : []
);

export const courseHomeDetailSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.courseHomeDetail ? courseHome.courseHomeDetail : {}
);

export const ofCourseSelector = createSelector(
    [courseHomeDetailSelector],
    courseHomeDetail => courseHomeDetail.course ? courseHomeDetail.course : {}
)

export const courseInfoSelector = createSelector(
    [courseHomeDetailSelector],
    courseHomeDetail => courseHomeDetail.course_info ? courseHomeDetail.course_info : ''
)

export const courseHomeTopicsSelector = createSelector(
    [courseHomeDetailSelector],
    courseHomeDetail => courseHomeDetail.learning_topics ? courseHomeDetail.learning_topics : []
)

export const topicExamsSelector = createSelector(
    [courseHomeTopicsSelector],
    learningTopics => learningTopics.topic_exams ? learningTopics.topic_exams : []
)

export const forumsSelector = createSelector(
    [courseHomeDetailSelector],
    courseHomeDetail => courseHomeDetail.forums ? courseHomeDetail.forums : []
)
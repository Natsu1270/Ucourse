import {createSelector} from 'reselect'

const fieldSelector = state => state.field;

export const fieldsSelector = createSelector(
    [fieldSelector],
    field => field.fields
);

export const fieldDetailSelector = createSelector(
    [fieldSelector],
    field => field.fieldDetail ? field.fieldDetail : {}
);

export const fieldProgramsSelector = createSelector(
    [fieldDetailSelector],
    fieldDetail => fieldDetail.field_programs ?
        fieldDetail.field_programs : []
);

export const fieldCoursesSelector = createSelector(
    [fieldDetailSelector],
    fieldDetail => fieldDetail.field_courses ?
        fieldDetail.field_courses : []
);

export const isFetchingSelector = createSelector(
    [fieldSelector],
    field => field.isFetching
);

export const isFetchingDetailSelector = createSelector(
    [fieldSelector],
    field => field.isFetchingDetail
);

export const errorResponseSelector = createSelector(
    [fieldSelector],
    field => field.errorResponse
);
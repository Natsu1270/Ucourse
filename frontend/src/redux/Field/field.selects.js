import {createSelector} from 'reselect'

const fieldSelector = state => state.field;

export const fieldsSelector = createSelector(
    [fieldSelector],
    field => field.fields
);

export const fieldDetailSelector = createSelector(
    [fieldSelector],
    field => field.fieldDetail
);

export const isFetchingSelector = createSelector(
    [fieldSelector],
    field => field.isFetching
);

export const errorResponseSelector = createSelector(
    [fieldSelector],
    field => field.errorResponse
);
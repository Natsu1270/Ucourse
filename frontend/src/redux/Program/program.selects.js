import {createSelector} from 'reselect'

const programSelector = state => state.program;

export const programDetailSelector = createSelector(
    [programSelector],
    program => program.programDetail
);

export const isFetchingSelector = createSelector(
    [programSelector],
    program => program.isFetching
);

export const errorResponseSelector = createSelector(
    [programSelector],
    program => program.errorResponse
);
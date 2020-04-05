import ProgramActionTypes from './program.types'

const initState = {
    programs: {},
    isFetching: false,
    errResponse: null,
    programDetail: null,
};

const programReducer = (state = initState, action) => {
    switch (action.type) {
        case ProgramActionTypes.FETCH_PROGRAMS_START:
        case ProgramActionTypes.FETCH_PROGRAM_DETAIL_START:
            return {
                ...state,
                isFetching: true
            };
        case ProgramActionTypes.FETCH_PROGRAMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                programs: action.payload
            };
        case ProgramActionTypes.FETCH_PROGRAM_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                programDetail: action.payload
            };
        case ProgramActionTypes.FETCH_PROGRAMS_FAIL:
        case ProgramActionTypes.FETCH_PROGRAM_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false,
                errResponse: action.payload
            };

        default:
            return state
    }
};

export default programReducer
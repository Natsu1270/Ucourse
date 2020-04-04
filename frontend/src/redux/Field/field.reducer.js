import FieldActionTypes from './field.types'

const initState = {
    fields: [],
    isFetching: false,
    errorResponse: null,
    fieldDetail: null,
    isFetchingDetail: false,
};

const fieldReducer = (state=initState, action) => {
    switch (action.type) {
        case FieldActionTypes.GET_FIELD_START:
            return {
                ...state,
                isFetching: true,
            };

        case FieldActionTypes.GET_FIELD_DETAIL_START:
            return {
                ...state,
                isFetchingDetail: true,
            };

        case FieldActionTypes.GET_FIELD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fields: action.payload,
                errorResponse: null
            };

        case FieldActionTypes.GET_FIELD_DETAIL_SUCCESS:
            return {
                ...state,
                isFetchingDetail: false,
                fieldDetail: action.payload,
                errorResponse: null
            };

        case FieldActionTypes.GET_FIELD_FAIL:
            return {
                ...state,
                isFetching: false,
                errorResponse: action.payload
            };

        case FieldActionTypes.GET_FIELD_DETAIL_FAIL:
            return {
                ...state,
                isFetchingDetail: false,
                errorResponse: action.payload
            };

        default:
            return state
    }
};

export default fieldReducer
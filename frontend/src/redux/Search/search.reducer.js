import SearchActionTypes from "./search.types";

const initState = {
  isSearching: false,
  searchResult: {},
  errorResponse: null
};

const searchReducer = (state=initState, action) => {
    switch (action.type) {
        case SearchActionTypes.SIMPLE_SEARCH_START:
        case SearchActionTypes.ADVANCE_SEARCH_START:
            return {
                ...state,
                isSearching: true
            };

        case SearchActionTypes.SIMPLE_SEARCH_SUCCESS:
        case SearchActionTypes.ADVANCE_SEARCH_SUCCESS:
            return {
                ...state,
                isSearching: false,
                searchResult: action.payload,
                errorResponse: null
            };

        case SearchActionTypes.SIMPLE_SEARCH_FAIL:
        case SearchActionTypes.ADVANCE_SEARCH_FAIL:
            return {
                ...state,
                isSearching: false,
                errorResponse: action.payload
            };

        default:
            return state;
    }
};

export default searchReducer;
import SearchActionTypes from "./search.types";
import { updateFilter } from "./search.utils";

const initState = {
    isSearching: false,
    searchResult: null,
    errorResponse: null,
    popularKeywords: null,
    isFetchingKeywords: false,
    searchFilterField: null,
    searchFilterLevel: null,
    searchFilterRating: null,
    searchFilterTeacher: null,
    searchFilterDate: null,
    searchFilterPrice: null,
};

const searchReducer = (state = initState, action) => {
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

        case SearchActionTypes.GET_POPULAR_KEYWORDS_START:
            return {
                ...state,
                isFetchingKeywords: true
            }

        case SearchActionTypes.GET_POPULAR_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetchingKeywords: false,
                popularKeywords: action.payload
            }

        case SearchActionTypes.UPDATE_SEARCH_FILTER_FIELD:
            return {
                ...state,
                searchFilterField: action.payload
            }

        case SearchActionTypes.UPDATE_SEARCH_FILTER_LEVEL:
            return {
                ...state,
                searchFilterLevel: action.payload
            }
        case SearchActionTypes.UPDATE_SEARCH_FILTER_RATING:
            return {
                ...state,
                searchFilterRating: action.payload
            }
        case SearchActionTypes.UPDATE_SEARCH_FILTER_DATE:
            return {
                ...state,
                searchFilterDate: action.payload
            }
        case SearchActionTypes.UPDATE_SEARCH_FILTER_TEACHER:
            return {
                ...state,
                searchFilterTeacher: action.payload
            }

        case SearchActionTypes.UPDATE_SEARCH_FILTER_PRICE:
            return {
                ...state,
                searchFilterPrice: action.payload
            }


        default:
            return state;
    }
};

export default searchReducer;
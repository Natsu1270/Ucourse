import SearchActionTypes from "./search.types";

export const simpleSearchStart = (param) => ({
    type: SearchActionTypes.SIMPLE_SEARCH_START,
    payload: param
});

export const simpleSearchSuccess = (results) => ({
    type: SearchActionTypes.SIMPLE_SEARCH_SUCCESS,
    payload: results
});

export const simpleSearchFail = (err) => ({
    type: SearchActionTypes.SIMPLE_SEARCH_FAIL,
    payload: err
});


export const advanceSearchStart = (params) => ({
    type: SearchActionTypes.ADVANCE_SEARCH_START,
    payload: params
});

export const advanceSearchSuccess = (results) => ({
    type: SearchActionTypes.ADVANCE_SEARCH_SUCCESS,
    payload: results
});

export const advanceSearchFail = (err) => ({
    type: SearchActionTypes.ADVANCE_SEARCH_FAIL,
    payload: err
});

export const getPopularKeywordsStart = () => ({
    type: SearchActionTypes.GET_POPULAR_KEYWORDS_START,
})

export const getPopularKeywordsSuccess = (keywords) => ({
    type: SearchActionTypes.GET_POPULAR_KEYWORDS_SUCCESS,
    payload: keywords
})

export const updateSearchFilterField = (filter) => ({
    type: SearchActionTypes.UPDATE_SEARCH_FILTER_FIELD,
    payload: filter
})

export const updateSearchFilterLevel = (filter) => ({
    type: SearchActionTypes.UPDATE_SEARCH_FILTER_LEVEL,
    payload: filter
})

export const updateSearchFilterRating = (filter) => ({
    type: SearchActionTypes.UPDATE_SEARCH_FILTER_RATING,
    payload: filter
})

export const updateSearchFilterDate = (filter) => ({
    type: SearchActionTypes.UPDATE_SEARCH_FILTER_DATE,
    payload: filter
})

export const updateSearchFilterTeacher = (filter) => ({
    type: SearchActionTypes.UPDATE_SEARCH_FILTER_TEACHER,
    payload: filter
})


export const updateSearchFilterPrice = (filter) => ({
    type: SearchActionTypes.UPDATE_SEARCH_FILTER_PRICE,
    payload: filter
})
import SearchActionTypes from "./search.types";

export const simpleSearchStart = (keyword) => ({
    type: SearchActionTypes.SIMPLE_SEARCH_START,
    payload: keyword
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

export const getPoplularKeywordsStart = () => ({
    type: SearchActionTypes.GET_POPULAR_KEYWORDS_START,
})

export const getPoplularKeywordsSuccess = (keywords) => ({
    type: SearchActionTypes.GET_POPULAR_KEYWORDS_SUCCESS,
    payload: keywords
})
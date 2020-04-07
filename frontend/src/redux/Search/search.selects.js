import { createSelector } from 'reselect'

const searchSelector = state => state.search

export const searchResultSelector = createSelector(
    [searchSelector],
    search => search.searchResult
)

export const searchProgramsSelector = createSelector(
    [searchResultSelector],
    searchResult => searchResult ?
        searchResult.programs : []
)

export const searchCoursesSelector = createSelector(
    [searchResultSelector],
    searchResult => searchResult ?
        searchResult.courses : []
)

export const isSearchingSelector = createSelector(
    [searchSelector],
    search => search.isSearching
)

export const searchErrorResponseSelector = createSelector(
    [searchSelector],
    search => search.errorResponse
)

export const popularKeywordsSelector = createSelector(
    [searchSelector],
    search => search.popularKeywords
)


export const isFetchingKeywordsSelector = createSelector(
    [searchSelector],
    search => search.isFetchingKeywords
)


export const searchFieldSelector = createSelector(
    [searchSelector],
    search => search.searchFilterField
)

export const searchLevelSelector = createSelector(
    [searchSelector],
    search => search.searchFilterLevel
)

export const searchRatingSelector = createSelector(
    [searchSelector],
    search => search.searchFilterRating
)

export const searchDateSelector = createSelector(
    [searchSelector],
    search => search.searchFilterDate
)

export const searchTeacherSelector = createSelector(
    [searchSelector],
    search => search.searchFilterTeacher
)
import { createSelector } from 'reselect'

const searchSelector = state => state.search

export const searchResultSelector = createSelector(
    [searchSelector],
    search => search.searchResult
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
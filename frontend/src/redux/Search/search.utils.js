export function updateFilter(searchFilter, filter) {
    searchFilter[filter.type] = filter.values
    return searchFilter
}


import React, { useEffect } from 'react'
import { Input, AutoComplete } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from 'reselect'
import { getPopularKeywordsStart } from '../../redux/Search/search.actions'

import { getPopularSearchKeywordsAPI } from '../../api/search.services'
import { isFetchingKeywordsSelector, popularKeywordsSelector } from '../../redux/Search/search.selects';


const renderTitle = title => (
    <span>
        {title}
        <span
            style={{
                float: 'right',
            }}
        >
            counts
    </span>
    </span>
);

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                {count}
            </span>
        </div>
    ),
});


const SearchInput = ({ width, value }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { popularKeywords, isFetchingKeywords } = useSelector(createStructuredSelector({
        popularKeywords: popularKeywordsSelector,
        isFetchingKeywords: isFetchingKeywordsSelector
    }));

    let keywords = [];
    if (!isFetchingKeywords && popularKeywords) {
        popularKeywords.forEach(keyword => keywords.push(renderItem(keyword.name, keyword.count)))
    }

    const options = [
        {
            label: renderTitle('Popular searches'),
            options: keywords,
        },

    ];

    useEffect(() => {
        dispatch(getPopularKeywordsStart())
    }, [dispatch]);



    return (
        <div className="certain-category-search-wrapper" style={{ width: width }}>
            <AutoComplete
                className="certain-category-search"
                defaultValue={value}
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                style={{ width: '100%' }}
                options={options}
                optionLabelProp="value"
            >
                <Input.Search
                    size="large"
                    placeholder="Search everything"
                    onPressEnter={
                        (e) => history.push(`/search?query=${e.target.value}`)
                    } />
            </AutoComplete>
        </div>
    );
}

export default SearchInput
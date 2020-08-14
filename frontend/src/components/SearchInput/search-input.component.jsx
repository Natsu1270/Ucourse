import React, { useEffect, useState } from 'react'
import { Input, AutoComplete, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from 'reselect'
import { getPopularKeywordsStart } from '../../redux/Search/search.actions'

import { getPopularSearchKeywordsAPI } from '../../api/search.services'
import { isFetchingKeywordsSelector, popularKeywordsSelector } from '../../redux/Search/search.selects';
import { SearchOutlined } from "@ant-design/icons";


const renderTitle = title => (
    <span>
        {title}
        <span
            style={{
                float: 'right',
            }}
        >
            Lượt
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
    const [search, setSearch] = useState('')
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
            label: renderTitle('Tìm kiếm phổ biến'),
            options: keywords,
        },

    ];

    useEffect(() => {
        dispatch(getPopularKeywordsStart())
    }, [dispatch]);


    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const startSearch = () => history.push(`/search?query=${search}`)

    return (
        <div className="certain-category-search-wrapper d-flex" style={{ width: width }}>
            <AutoComplete
                backfill={true}
                className="certain-category-search"
                defaultValue={value}
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                style={{ width: '100%' }}
                options={options}
                optionLabelProp="value"
                onChange={(value) => setSearch(value)}
            >
                <Input
                    size="large"
                    placeholder="Tìm kiếm"
                    value={search}
                    onChange={e => handleChange(e)}
                    onPressEnter={
                        () => history.push(`/search?query=${search}`)
                    } />

            </AutoComplete>
            <Button style={{ height: '4rem' }} onClick={startSearch}>
                <SearchOutlined />
            </Button>
        </div>
    );
}

export default SearchInput
import React from 'react'
import { Icon, Input, AutoComplete } from "antd";
import { Link } from "react-router-dom";


const { Option, OptGroup } = AutoComplete
const placeHolderData = [
    {
        title: 'Course',
        children: [
            {
                title: 'Python for everyone',
                count: 10000,
            },
            {
                title: 'Basic Python',
                count: 10600,
            },
        ],
    },
    {
        title: 'Solutions',
        children: [
            {
                title: 'Python ML',
                count: 60100,
            },
            {
                title: 'UCourse',
                count: 30010,
            },
        ],
    },]

function renderTitle(title) {
    return (
        <span>
            {title}
            <Link
                style={{ float: 'right' }}
                to="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
                </Link>
        </span>
    );
}

const options = placeHolderData
    .map(group => (
        <OptGroup key={group.title} label={renderTitle(group.title)}>
            {group.children.map(opt => (
                <Option key={opt.title} value={opt.title}>
                    {opt.title}
                    <span className="certain-search-item-count">  {opt.count} results</span>
                </Option>
            ))}
        </OptGroup>
    ))
    .concat([
        <Option disabled key="all" className="show-all">
            <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
                View all results
            </a>
        </Option>,
    ]);

const SearchInput = () => {
    return (
        <div className="certain-category-search-wrapper" style={{ width: 400 }}>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="large"
                style={{ width: '100%' }}
                dataSource={options}
                placeholder="Search everything"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        </div>
    );
}

export default SearchInput
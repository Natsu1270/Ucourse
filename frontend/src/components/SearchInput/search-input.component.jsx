import React from 'react'
import {Input, AutoComplete} from "antd";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {simpleSearchStart} from "../../redux/Search/search.actions";


const {Option, OptGroup} = AutoComplete;

const renderTitle = title => (
    <span>
    {title}
        <a
            style={{
                float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
      more
    </a>
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
        </div>
    ),
});

const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: renderTitle('Solutions'),
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },

];


const SearchInput = () => {
    const dispatch = useDispatch()
    return (
        <div className="certain-category-search-wrapper" style={{width: 400}}>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{width: 300}}
                size="large"
                style={{width: '100%'}}
                options={options}
                optionLabelProp="value"
            >
                <Input.Search size ="large"
                              placeholder="Search everything"
                              onPressEnter={
                                  (e) => dispatch(simpleSearchStart(e.target.value))
                              } />
            </AutoComplete>
        </div>
    );
}

export default SearchInput
import React from 'react'
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {errorResponseSelector, fieldDetailSelector, isFetchingDetailSelector} from "../../redux/Field/field.selects";
import Constants from "../../constants";
import HashLoader from "react-spinners/HashLoader";
import SearchInput from "../SearchInput/search-input.component";
import SearchPrograms from "../SearchResult/search-programs.component";
import SearchCourses from "../SearchResult/search-courses.component";

const FieldDetail = () => {

    const {fieldDetail, isFetchingDetail, errorResponse} = useSelector(createStructuredSelector({
        fieldDetail: fieldDetailSelector,
        isFetchingDetail: isFetchingDetailSelector,
        errorResponse: errorResponseSelector
    }));


    return (
        <div className="section-10 page field-detail">
            {
                !fieldDetail ? <HashLoader
                    css={Constants.SPINNER_STYLE}
                    size={40}
                    color={"#01C9F5"}
                    loading={true}/> : (
                    <div className="search-result">
                        <div className="search-result--search-bar">
                            <SearchInput width={'100%'}/>
                        </div>
                            <SearchPrograms programs={fieldDetail.field_programs}/>
                            <SearchCourses courses={fieldDetail.field_courses}/>
                    </div>
                )
            }
        </div>
    )
};

export default FieldDetail
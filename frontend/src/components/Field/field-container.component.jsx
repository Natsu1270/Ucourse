import React from 'react'
import {useSelector} from "react-redux";
import Constants from "../../constants";
import HashLoader from "react-spinners/HashLoader";
import {isFetchingDetailSelector} from "../../redux/Field/field.selects";

const FieldContainer = ({component: Component, ...others}) => {
    const isFetching = useSelector(state => isFetchingDetailSelector(state));
    if (isFetching) {
        return <HashLoader
            css={Constants.SPINNER_STYLE}
            size={40}
            color={"#01C9F5"}
            loading={true}
        />
    } else {
        return <Component {...others}/>
    }
};

export default FieldContainer
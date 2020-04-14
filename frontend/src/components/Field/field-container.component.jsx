import React from 'react'
import { useSelector } from "react-redux";
import { isFetchingDetailSelector } from "../../redux/Field/field.selects";
import { Skeleton } from 'antd'

const FieldContainer = ({ component: Component, ...others }) => {
    const isFetching = useSelector(state => isFetchingDetailSelector(state));
    if (isFetching) {
        return <Skeleton avatar paragraph={{ rows: 4 }} />
    } else {
        return <Component {...others} />
    }
};

export default FieldContainer
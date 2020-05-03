import React from 'react'
import { useSelector } from "react-redux";
import { isFetchingDetailSelector } from "../../redux/Field/field.selects";
import { Skeleton } from 'antd'

const FieldContainer = ({ component: Component, ...others }) => {
    const isFetching = useSelector(state => isFetchingDetailSelector(state));
    const { isCourses } = others;
    const skeleton = isCourses ?
            <div className="d-flex">
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton active paragraph={{ rows: 4 }} />
            </div> :
            <div className="d-flex">
                <Skeleton active avatar paragraph={{ rows: 2 }} />
                <Skeleton active avatar paragraph={{ rows: 2 }} />
            </div> 
    if (isFetching) {
        return skeleton;
    } else {
        return <Component {...others} />
    }
};

export default FieldContainer
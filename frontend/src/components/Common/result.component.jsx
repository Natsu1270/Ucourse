import React from 'react'

import {Result} from 'antd'
import Constants from "../../constants";

const ResultComponent = ({type, title, info}) => {
    if (type === Constants.RESULT_TYPE_NODATA) {
        return <Result title={title} subTitle={info} status="404" />
    }
}

export default ResultComponent
import React from 'react'
import {Spin} from "antd";

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ? <Spin /> : <WrappedComponent {...otherProps} />
}

export default WithSpinner
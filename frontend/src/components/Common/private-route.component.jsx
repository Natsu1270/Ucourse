import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { currentUserSelector } from "../../redux/Auth/auth.selects";


const PrivateRoute = ({ component: Component, ...others }) => {
    const { currentUser } = useSelector(createStructuredSelector({
        currentUser: currentUserSelector,
    }));
    const { slug } = useParams();
    const history = useHistory();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <Route
            {...others}
            render={props => (
                currentUser
                    ?
                    <Component {...props} />
                    :
                    <Redirect to={{ pathname: '/auth', state: { referrer: others.referrer } }} />
            )}
        />
    )
}

export default PrivateRoute
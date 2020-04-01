import React, { useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'

import HashLoader from 'react-spinners/HashLoader'
import Constants from "../../constants";
import {useDispatch} from "react-redux";
import {getFieldStart} from "../../redux/Field/field.actions";
const FieldOverview = lazy(() => import('../../components/Field/field-overview.component'));
const FieldDetailPage = lazy(() => import('./field-detail.page'));


const FieldPage = ({match}) => {
    const dispatch = useDispatch();
    useEffect(() => dispatch(getFieldStart()), [dispatch]);

    return (
        <div className="field-page">
            <Suspense fallback={<HashLoader
                css={Constants.SPINNER_STYLE}
                size={40}
                color={"#01C9F5"}
                loading={true}/>}>
                <Route exact path={match.path} component={FieldOverview} />
                <Route path={`${match.path}/:slug`} component={FieldDetailPage} />
            </Suspense>
        </div>
    )
};

export default FieldPage;
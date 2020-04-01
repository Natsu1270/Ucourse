import React, { useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'

import HashLoader from 'react-spinners/HashLoader'
import Constants from "../../constants";
const FieldOverview = lazy(() => import('../../components/Field/field-overview.component'));
const FieldDetail = lazy(() => import('../../components/Field/field-detail.component'));


const FieldPage = ({match}) => {

    return (
        <div className="field-page">
            <Suspense fallback={<HashLoader
                css={Constants.SPINNER_STYLE}
                size={40}
                color={"#01C9F5"}
                loading={true}/>}>
                <Route exact path={match.path} component={FieldOverview} />
                <Route path={`${match.path}/:fieldname`} component={FieldDetail} />
            </Suspense>
        </div>
    )
};

export default FieldPage;
import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { fieldsSelector, isFetchingSelector, errorResponseSelector } from '../../redux/Field/field.selects'
import HashLoader from 'react-spinners/HashLoader';
import Constants from '../../constants';

import FieldCard from './field-card.component';

import ErrorBoundary from '../ErrorBoundary/error-boundary.component'

const FieldOverview = () => {
    const history = useHistory();
    const location = useLocation();
    const { fields, isFetching, errorResponse } = useSelector(createStructuredSelector({
        fields: fieldsSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector
    }));

    const fieldMap = fields.map(field => (
        <FieldCard
            key={field.id}
            handleClick={() => history.push(`${location.pathname}/${field.slug}`)}
            name={field.name}
            icon={field.icon}
        >
        </FieldCard>
    ))


    return (
        <div className="field-overview">
            {isFetching ? <HashLoader
                css={Constants.SPINNER_STYLE}
                size={40}
                color={"#01C9F5"}
                loading={true} /> : <div className="field-overview--cats">
                    {
                        <ErrorBoundary
                            errResponse={errorResponse}
                            comp={fieldMap} />
                    }
                </div>
            }
        </div>
    )
};

export default FieldOverview
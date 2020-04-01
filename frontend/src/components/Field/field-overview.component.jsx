import React, {useEffect} from 'react'
import {createStructuredSelector} from 'reselect';
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {fieldsSelector, isFetchingSelector, errorResponseSelector} from '../../redux/Field/field.selects'
import HashLoader from "react-spinners/HashLoader";
import Constants from "../../constants";

import { Card } from 'antd'


const FieldOverview = ({match}) => {
    const history = useHistory();
    const {fields, isFetching, errorResponse} = useSelector(createStructuredSelector({
        fields: fieldsSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector
    }));

    const { Meta } = Card;

    return (
        <div className="page field-overview section-10">
            {isFetching ? <HashLoader
                css={Constants.SPINNER_STYLE}
                size={40}
                color={"#01C9F5"}
                loading={true}/> : <div className="field-overview--cats">
                {
                    fields.map(field => (
                        <Card
                            onClick={() => history.push(`${match.path}/${field.slug}`)}
                            hoverable
                            style={{width: 580}}
                            cover={<img alt="example"
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                        >
                            <Meta title={field.name} description="www.instagram.com"/>
                        </Card>
                    ))
                }
            </div>
            }
        </div>
    )
};

export default FieldOverview
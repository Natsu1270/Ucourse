import React, {useEffect, lazy, Suspense} from 'react'
import {useDispatch} from 'react-redux';
import {getFieldStart} from '../../redux/Field/field.actions';

const FieldOverview = lazy(() => import('../../components/Field/field-overview.component')) ;
const FieldDetailPage = lazy(() => import('./field-detail.page'));


const FieldPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFieldStart());
        window.scrollTo(0,0)
    }, []);

    return (
        <div className='field-page page section-10'>
            <FieldOverview />
        </div>
    )
};

export default FieldPage;
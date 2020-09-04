import React, { useEffect, lazy } from 'react'
import { useDispatch } from 'react-redux';
import { getFieldStart } from '../../redux/Field/field.actions';

const FieldOverview = lazy(() => import('../../components/Field/field-overview.component'));


const FieldPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFieldStart());
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className='field-page page section-10'>
            <div className="page-card">
                <h3 className="text--main">Khám phá các lĩnh vực IT hot nhất hiện nay</h3>
                <FieldOverview />
            </div>
        </div>
    )
};

export default FieldPage;
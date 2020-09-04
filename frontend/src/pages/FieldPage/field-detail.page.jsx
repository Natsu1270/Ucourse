import React, { useEffect } from 'react'
import FieldDetail from '../../components/Field/field-detail.component'
import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import { getFieldDetailStart } from '../../redux/Field/field.actions'

const FieldDetailPage = ({ match }) => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getFieldDetailStart(slug))
    }, []);

    return (
        <FieldDetail />
    )
};

export default FieldDetailPage
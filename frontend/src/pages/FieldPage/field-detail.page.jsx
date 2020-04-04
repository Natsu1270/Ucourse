import React, { useEffect, Suspense } from 'react'
import FieldDetail from '../../components/Field/field-detail.component'
import { useDispatch } from "react-redux"
import { useParams, Route } from 'react-router-dom'
import { getFieldDetailStart } from '../../redux/Field/field.actions'

const FieldDetailPage = ({match}) => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getFieldDetailStart(slug))
    }, []);

    return (
        <FieldDetail />
    )
};

export default FieldDetailPage
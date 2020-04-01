import React, {useEffect} from 'react'
import FieldDetail from "../../components/Field/field-detail.component";
import {useDispatch} from "react-redux";
import {getFieldDetailStart} from "../../redux/Field/field.actions";

const FieldDetailPage = ({match}) => {
    const dispatch = useDispatch();
    useEffect(()=> dispatch(getFieldDetailStart(match.params.slug)), [dispatch]);

    return (
        <FieldDetail />
    )
};

export default FieldDetailPage
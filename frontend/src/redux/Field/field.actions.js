import FieldActionTypes from './field.types'

export const getFieldStart = () => ({
    type: FieldActionTypes.GET_FIELD_START,
});

export const getFieldSuccess = (fields) => ({
    type: FieldActionTypes.GET_FIELD_SUCCESS,
    payload: fields
});

export const getFieldFail = (err) => ({
    type: FieldActionTypes.GET_FIELD_FAIL,
    payload: err
});

export const getFieldDetailStart = (slug) => ({
    type: FieldActionTypes.GET_FIELD_DETAIL_START,
    payload: slug
});

export const getFieldDetailSuccess = (field) => ({
    type: FieldActionTypes.GET_FIELD_DETAIL_SUCCESS,
    payload: field
});

export const getFieldDetailFail = (err) => ({
    type: FieldActionTypes.GET_FIELD_DETAIL_FAIL,
    payload: err
});
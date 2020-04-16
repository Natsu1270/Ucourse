import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Collapse, Checkbox, Row, Col, Spin, DatePicker, Rate} from "antd";
import {getFieldStart} from "../../redux/Field/field.actions";
import {createStructuredSelector} from "reselect";
import {fieldsSelector, isFetchingSelector} from "../../redux/Field/field.selects";
import Constants from "../../constants";
import {getListTeacherStart} from "../../redux/Profile/profile.actions";
import {profileLoadingSelector, teacherListSelector} from "../../redux/Profile/profile.selects";
import {
    updateSearchFilterField,
    updateSearchFilterLevel,
    updateSearchFilterRating,
    updateSearchFilterDate,
    updateSearchFilterTeacher
} from "../../redux/Search/search.actions";


const SearchFilter = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFieldStart())
        dispatch(getListTeacherStart())
    }, [])

    const {fields, isFetching, teacherList, isLoading} = useSelector(createStructuredSelector({
        fields: fieldsSelector,
        isFetching: isFetchingSelector,
        teacherList: teacherListSelector,
        isLoading: profileLoadingSelector
    }))

    const {Panel} = Collapse
    const {RangePicker} = DatePicker
    const levelOptions = [
        {label: 'Beginner', value: 'Beginner'},
        {label: 'Intermediate', value: 'Intermediate'},
        {label: 'Advanced', value: 'Advanced'},
    ]

    const rateOptions = [
        {label: [<Rate disabled defaultValue={3}/>, ' ( 3↑ )'], value: 3},
        {label: [<Rate disabled defaultValue={4}/>, ' ( 4↑ )'], value: 4},
        {label: [<Rate disabled defaultValue={5}/>, ' ( 5↑ )'], value: 5},
    ]


    function onChangeField(checkedValues) {
        dispatch(updateSearchFilterField(checkedValues))
    }

    function onChangeLevel(checkedValues) {
        dispatch(updateSearchFilterLevel(checkedValues))
    }

    function onChangeRate(checkedValues) {
        dispatch(updateSearchFilterRating(checkedValues))
    }

    function onChangeTeacher(checkedValues) {
        dispatch(updateSearchFilterTeacher(checkedValues))
    }


    return (
        <Collapse>
            <Panel key="1" header="Lĩnh vực" className='white-bg'>
                {
                    isFetching ? <Spin/> :
                        <Checkbox.Group style={{width: '100%'}} onChange={onChangeField}>
                            <Row>
                                {fields.map(field => (
                                    <Col key={field.code} span={24} style={{marginBottom: '1rem'}}>
                                        <Checkbox value={field.slug}>{field.name}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                }
            </Panel>
            <Panel key="2" header="Cấp độ" className='white-bg'>
                <Checkbox.Group style={{width: '100%'}} onChange={onChangeLevel}>
                    <Row>
                        {levelOptions.map(level => (
                            <Col key={level.value} span={24} style={{marginBottom: '1rem'}}>
                                <Checkbox value={level.value}>{level.label}</Checkbox>
                            </Col>
                        ))}
                    </Row>

                </Checkbox.Group>
            </Panel>
            <Panel key="3" header="Thời gian mở" className='white-bg'>
                <RangePicker format={Constants.DD_MM_YYYY}/>
            </Panel>
            <Panel key="4" header="Điểm đánh giá" className='white-bg'>
                <Checkbox.Group style={{width: '100%'}} onChange={onChangeRate}>
                    <Row>
                        {rateOptions.map(rate => (
                            <Col key={rate.value} span={24} style={{marginBottom: '1rem'}}>
                                <Checkbox value={rate.value}>{rate.label[0]}{rate.label[1]}</Checkbox>
                            </Col>
                        ))}
                    </Row>

                </Checkbox.Group>
            </Panel>
            <Panel key="5" header="Giảng viên" className='white-bg'>
                {
                    isLoading ? <Spin/> :
                        <Checkbox.Group style={{width: '100%'}} onChange={onChangeTeacher}>
                            <Row>
                                {teacherList.map(teacher => (
                                    <Col key={teacher.email} span={24} style={{marginBottom: '1rem'}}>
                                        <Checkbox value={teacher.email}>{teacher.fullname}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                }
            </Panel>
        </Collapse>
    )
}

export default SearchFilter
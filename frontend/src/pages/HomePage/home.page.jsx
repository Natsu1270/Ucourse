import React, { useState, useEffect } from 'react'
import { message, Divider, BackTop } from 'antd'
import { getListFieldWithCourse } from '../../api/field.services'

import MainBanner from "../../components/Banners/main-banner.component";
import SubBanner from "../../components/Banners/sub-banner.component";
import FieldTabs from '../../components/Field/field-tabs.component';
import { getMaterialCount } from '../../api/home.services';



const HomePage = ({ currentUser }) => {

    const [loading, setLoading] = useState(true)
    const [fields, setFields] = useState([])
    const [materialCount, setCount] = useState({})

    const getAllFields = async () => {
        setLoading(true)
        try {
            const [fieldRes, countRes] = await Promise.all([getListFieldWithCourse(), getMaterialCount()])
            setFields(fieldRes.data.data)
            setCount(countRes.data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra:" + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getAllFields()
    }, [])

    return (
        <main className="home-page">
            <MainBanner currentUser={currentUser} />
            <SubBanner countMat={materialCount} />
            <Divider />
            <FieldTabs fields={fields} isLoading={loading} />
            <BackTop />
        </main>
    )
};

export default HomePage
import React, { useState, useEffect } from 'react'
import { message, Divider } from 'antd'
import { getListFieldWithCourse } from '../../api/field.services'

import MainBanner from "../../components/Banners/main-banner.component";
import SubBanner from "../../components/Banners/sub-banner.component";
import FieldTabs from '../../components/Field/field-tabs.component';



const HomePage = ({ currentUser }) => {

    const [loading, setLoading] = useState(true)
    const [fields, setFields] = useState([])

    const getAllFields = async () => {
        setLoading(true)
        try {
            const { data } = await getListFieldWithCourse()
            setFields(data.data)
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
            <SubBanner />
            <Divider />
            <FieldTabs fields={fields} isLoading={loading} />
        </main>
    )
};

export default HomePage
import React, { useState, useEffect } from 'react'
import { getAllMyCoursesAndProgramsAPI } from '../../api/home.services'
import { message, Skeleton, Timeline, Tree, Tabs, Tag, Button, List } from 'antd'
import { dayDiff, formatDate } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import SearchProgramItem from '../../components/SearchResult/search-program-item.component'
import SearchCourseItem from '../../components/SearchResult/search-course-item.component'
import { DownOutlined } from '@ant-design/icons'
import Constants from '../../constants'
const { TabPane } = Tabs

const ProgramAndCertificate = () => {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [programs, setPrograms] = useState([])
    const [courseHome, setCourseHome] = useState([])

    const token = useSelector(state => tokenSelector(state))

    const getAllMy = async () => {
        setLoading(true)
        try {
            const { data } = await getAllMyCoursesAndProgramsAPI(token)
            const mCourses = data.courses.sort((a, b) => dayDiff(b.bought_date, a.bought_date))
            const mPrograms = data.programs.sort((a, b) => dayDiff(b.bought_date, a.bought_date))
            setCourseHome(data.courseHomes)
            setCourses(mCourses)
            setPrograms(mPrograms)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getAllMy()
        }
    }, [token])



    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center">Tiến độ chương trình học và danh sách chứng chỉ của tôi</h2>

                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab="Tiến độ chương trình học">

                    </TabPane>
                    <TabPane key="2" tab="Chứng chỉ">

                    </TabPane>

                </Tabs>

            </div>
        </section>
    )
}

export default ProgramAndCertificate
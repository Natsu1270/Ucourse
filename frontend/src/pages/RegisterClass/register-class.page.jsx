import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Space, Divider, List, Avatar, Skeleton, Spin, Menu } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getMyCoursesAPI, searchRegisterCourseAPI } from '../../api/home.services'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import Constants from '../../constants'


const { Search } = Input
const { SubMenu } = Menu

const RegisterClassPage = () => {

    const token = useSelector(state => tokenSelector(state))

    const [loading, setLoading] = useState(true)
    const [myCourses, setMyCourses] = useState([])
    const [searched, setSearched] = useState(false)

    const getMyCourses = async () => {
        setLoading(false)
        try {
            const { data } = await getMyCoursesAPI(token)
            setMyCourses(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const searchCourse = async (keyword) => {
        setLoading(false)
        setSearched(true)
        try {
            const { data } = await searchRegisterCourseAPI(token, keyword)
            setMyCourses(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getMyCourses()
        }
    }, [token])

    return (
        <section className="section-10 page">
            <div className="page-card">
                <div className="text-center mb-5">
                    <h3 className="text--main">Trang đăng ký lớp</h3>
                </div>
                <Row justify="center">
                    <Col span={16}>
                        <Search
                            loading={loading}
                            placeholder="Nhập tên khóa học"
                            enterButton={<Space><SearchOutlined />Tìm</Space>}
                            size="large"
                            onSearch={value => {
                                if (value.trim() == "") return
                                searchCourse(value)
                            }}
                        />
                    </Col>
                </Row>
                <Row justify="center" className="mt-4">
                    <Col>
                        <h3 className="text--main">Danh sách</h3>
                        <p className="text--sub__bigger2">{searched ? null : "Khóa học đã đăng ký"}</p>
                    </Col>

                </Row>

                <Row style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
                    <Col span={24}>
                        <div className="register-class__content">
                            <Spin spinning={loading} indicator={Constants.SPIN_ICON}>
                                <Menu style={{ borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0' }} mode="inline" width="100%">
                                    {
                                        myCourses.map(course => {

                                            const registered = course.my_course_homes
                                            return (
                                                <SubMenu key={course.id} title={course.title}>
                                                    <List
                                                        bordered
                                                        itemLayout="horizontal"
                                                        dataSource={course.c_homes}
                                                        renderItem={item => {
                                                            return (
                                                                <List.Item>
                                                                    <List.Item.Meta
                                                                        avatar={<Avatar src={item.teacher.avatar} />}
                                                                        title={item.full_name}
                                                                        description="Test"
                                                                    />
                                                                </List.Item>
                                                            )
                                                        }}
                                                    />
                                                </SubMenu>
                                            )
                                        })

                                    }
                                </Menu>


                            </Spin>

                        </div>
                    </Col>
                </Row>

            </div>

        </section>
    )
}

export default RegisterClassPage
import React, { useState, useEffect } from 'react'
import { getAllMyCoursesAndProgramsAPI, getProgramProcessAPI } from '../../api/home.services'
import { message, Skeleton, DatePicker, Tag, Button, Form, Row, Col, Input, Switch } from 'antd'
import { dayDiff, formatDate } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import SearchProgramItem from '../../components/SearchResult/search-program-item.component'
import SearchCourseItem from '../../components/SearchResult/search-course-item.component'
import { DownOutlined } from '@ant-design/icons'
import Constants from '../../constants'
import { disabledDate } from '../../utils/date.utils'

const { RangePicker } = DatePicker

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 },
};

const ProgramProcess = ({ token }) => {

    const history = useHistory()

    const [loading, setLoading] = useState(true)
    const [programs, setPrograms] = useState([])


    const getProgramProcess = async () => {
        setLoading(true)
        try {
            const { data } = await getProgramProcessAPI(token)
            setPrograms(data.data.programs)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getProgramProcess()
        }
    }, [token])


    const onSearch = (values) => {
        console.log(values)
    }


    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center mb-5">Tiến độ chương trình học</h2>
                <div className="mb-5 mt-3">
                    <Form
                        layout="horizontal"
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={onSearch}
                        {...formItemLayout}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Tên chương trình"
                                >
                                    <Input placeholder="Tên chương trình" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="date"
                                    label="Ngày đăng ký"
                                >
                                    <RangePicker
                                        disabledDate={disabledDate}
                                        format="DD-MM-YYYY"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="completed"
                                    label="Đã hoàn thành"
                                >
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    Lọc
                                </Button>
                            </Col>

                        </Row>

                    </Form>
                </div>
            </div>
        </section>
    )
}

export default ProgramProcess
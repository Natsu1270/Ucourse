import React, { useState, useEffect } from 'react'
import { getAllMyCoursesAndProgramsAPI, getProgramProcessAPI } from '../../api/home.services'
import { message, Avatar, DatePicker, Tag, Button, Form, Row, Col, Input, Switch, Menu, Spin, Layout, Divider, Space } from 'antd'
import { dayDiff, formatDate } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import SearchProgramItem from '../../components/SearchResult/search-program-item.component'
import SearchCourseItem from '../../components/SearchResult/search-course-item.component'
import { DownOutlined, UserOutlined, NotificationOutlined, LaptopOutlined, BookOutlined } from '@ant-design/icons'
import Constants from '../../constants'
import { disabledDate } from '../../utils/date.utils'
import ProgramProcessItem from '../../components/ProgramProcess/program-process-item.component'
import moment from 'moment'


const { RangePicker } = DatePicker
const { Sider, Content } = Layout
const { SubMenu } = Menu

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 },
};

const ProgramProcess = () => {

    const history = useHistory()

    const [loading, setLoading] = useState(true)
    const [programs, setPrograms] = useState([])
    const [currentProgram, setCurrentProgram] = useState({})
    const [orgPrograms, setOrgPrograms] = useState([])

    const token = useSelector(state => tokenSelector(state))


    const getProgramProcess = async () => {
        setLoading(true)
        try {
            const { data } = await getProgramProcessAPI(token)
            if (data.programs && data.programs.length) {
                setPrograms(data.programs)
                setOrgPrograms(data.programs)
                setCurrentProgram(data.programs[0])
            }
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
        let filterPrograms = orgPrograms
        if (values.name && values.name.trim() != "") {
            filterPrograms = programs.filter(p => p.name.includes(values.name))
        }
        if (values.completed) {
            filterPrograms = filterPrograms.filter(p => p.student_program.status == 'completed')
        }
        if (values.date) {
            const startDate = values.date[0]
            const endDate = values.date[1]

            filterPrograms = filterPrograms.filter(
                p => moment(p.student_program.started_date).isBetween(startDate, endDate)
            )
        }
        setPrograms(filterPrograms)
        setCurrentProgram(filterPrograms.length ? filterPrograms[0] : {})
    }


    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center mb-5">Tiến độ chương trình học</h2>
                <div className="mt-3">
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
                <Divider />
                <Layout className="bg-white" >
                    <Sider className="bg-white" width={240}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[currentProgram.id ? currentProgram.id.toString() : '1']}
                            style={{ height: '100%' }}
                        >
                            {
                                programs.map(program => {
                                    return (
                                        <Menu.Item
                                            onClick={() => setCurrentProgram(program)}
                                            style={{ fontSize: '1.8rem', fontWeight: 500 }}
                                            key={program.id.toString()}
                                            icon={<BookOutlined />}>
                                            {program.name}
                                        </Menu.Item>
                                    )
                                })
                            }

                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 200, background: '#fff' }}>
                        <ProgramProcessItem program={currentProgram} loading={loading} />
                    </Content>
                </Layout>

            </div>
        </section>
    )
}

export default ProgramProcess
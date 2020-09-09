import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Input, Select, Button, Divider, Tabs, Avatar } from 'antd'
import { searchAllSummary } from '../../api/summary.services'
import { message, Collapse, List } from 'antd'
import { useHistory, useRouteMatch } from 'react-router-dom'

const { Panel } = Collapse;

const { Option } = Select
const { TabPane } = Tabs

const AdminCertificate = () => {

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [programs, setPrograms] = useState([])
    const [type, setType] = useState('a')

    const history = useHistory()
    const match = useRouteMatch()

    const onFinish = (values) => {
        const { name, type } = values
        setType(type)
        search(name, type)
    }
    const search = async (name, type) => {
        setLoading(true)
        try {
            const { data } = await searchAllSummary({ name, type })
            setCourses(data.data.courses)
            setPrograms(data.data.programs)
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        search(null, null)
    }, [])

    return (
        <section className="section-10 page">
            <div className="page-card-2">
                <h3 className="title--big">
                    Tìm kiếm cấp phát chứng chỉ
                </h3>
                <div className="mt-5">
                    <Form
                        onFinish={onFinish}
                        name="search-form"
                        initialValues={{
                            type: 'a'
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="name">
                                    <Input placeholder="Nhập tên" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="type"
                                    label="Loại"
                                >
                                    <Select defaultValue="a" placeholder="Chọn loại">
                                        <Option value="a">Tất cả</Option>
                                        <Option value="c">Môn học</Option>
                                        <Option value="p">Chương trình học</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit" loading={loading}>Tìm kiếm</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Divider />
                <h3 className="text--main text-center">Kết quả</h3>

                <Tabs defaultActiveKey="1">
                    {
                        type == 'a' || type == 'c' ?
                            (<TabPane tab="Môn học" key="1">
                                {
                                    courses.length > 0 ? <Collapse ghost accordion>
                                        {
                                            courses.map(course => {
                                                return (
                                                    <Panel key={course.id} header={course.title} className="mb-2">
                                                        <List
                                                            header="Danh sách lớp"
                                                            bordered
                                                            loading={loading}
                                                            dataSource={course.c_homes}
                                                            renderItem={item => (
                                                                <List.Item
                                                                    actions={[<Button loading={loading} type="primary"
                                                                        onClick={() => window.open(`/certificate/course/${course.id}/class/${item.id}`, '_self')}>Thực hiện</Button>,]
                                                                    }
                                                                >
                                                                    <List.Item.Meta
                                                                        title={<p className="text--sub__bigger text-black">{item.full_name}</p>}
                                                                    />

                                                                </List.Item>
                                                            )}
                                                        />
                                                    </Panel>)
                                            })
                                        }
                                    </Collapse> : <span></span>
                                }
                            </TabPane>) : null
                    }
                    {
                        type == 'a' || type == 'p' ?
                            (<TabPane tab="Chương trình học" key="2">
                                {
                                    programs.length > 0 ? <Collapse ghost accordion>
                                        {
                                            programs.map(program => {
                                                return (
                                                    <Panel key={program.id} header={program.name} className="mb-2">
                                                        <List
                                                            header="Danh sách học viên theo chương trình học"
                                                            bordered
                                                            loading={loading}
                                                            dataSource={program.student_program}
                                                            renderItem={item => (
                                                                <List.Item
                                                                    actions={[<Button loading={loading} type="primary"
                                                                        onClick={() => window.open(`/certificate/program/${program.id}/detail/${item.id}?studentId=${item.student.id}`, '_self')}>Thực hiện</Button>,]
                                                                    }
                                                                >
                                                                    <List.Item.Meta
                                                                        avatar={<Avatar src={program.icon} />}
                                                                        title={<p className="text--sub__bigger text-black">{item.student.user_profile.fullname + '-' + program.name}</p>}
                                                                    />

                                                                </List.Item>
                                                            )}
                                                        />
                                                    </Panel>)
                                            })
                                        }
                                    </Collapse> : <span></span>
                                }









                            </TabPane>) : null
                    }

                </Tabs>

            </div>
        </section>
    )
}

export default AdminCertificate
import React, { useState, useEffect } from 'react'
import { getProgramProcessAPI } from '../../api/home.services'
import { message, DatePicker, Tag, Button, Form, Row, Col, Input, Switch, Menu, Spin, Layout, Divider, Space } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import { BookOutlined } from '@ant-design/icons'
import { disabledDate } from '../../utils/date.utils'
import ProgramProcessItem from '../../components/ProgramProcess/program-process-item.component'
import moment from 'moment'


const { RangePicker } = DatePicker
const { Sider, Content } = Layout

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

    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center mb-5">Tiến độ chương trình học</h2>
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
                        <ProgramProcessItem program={currentProgram} loading={loading} token={token} />
                    </Content>
                </Layout>

            </div>
        </section>
    )
}

export default ProgramProcess
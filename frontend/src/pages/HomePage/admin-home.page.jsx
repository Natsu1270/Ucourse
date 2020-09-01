import React, { useState, useEffect } from 'react'


import { getCourseHomesByTeacher } from '../../api/courseHome.services'
import { message, Collapse, Avatar, Button, Descriptions, Badge, Space, Typography, Row, Col, Layout, Menu, } from 'antd';
import { useHistory } from 'react-router-dom';
import { DoubleRightOutlined, HomeOutlined, DashOutlined, DashboardOutlined, AppstoreOutlined, BorderOutlined } from '@ant-design/icons';

import { Chart, Interval, Tooltip } from 'bizcharts';
import { parseHtml } from '../../utils/text.utils';


const { Panel } = Collapse
const { Paragraph } = Typography;

const { Sider, Content } = Layout;

const AdminHomePage = ({ token }) => {

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [courseHomes, setCourseHomes] = useState([])

    const getCourseHomes = async () => {
        setLoading(true)
        try {
            const { data } = await getCourseHomesByTeacher(token)
            setCourseHomes(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        if (token) {
            getCourseHomes()
        }
    }, [token]);



    return (

        // 

        <section className="page section-10">

            <Layout className="bg-white" style={{ padding: '3rem 0' }}>
                <Sider width={200} className="bg-white" style={{ height: '100%' }}>
                    <h3 className="text--main text-center mb-4">Quản trị</h3>
                    <Menu mode="inline" theme="light" defaultSelectedKeys={['1']} >
                        <Menu.Item key="1"><DashboardOutlined /> Dashboard</Menu.Item>
                        <Menu.Item key="2"><BorderOutlined /> Báo cáo</Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding: '2rem 4rem', minHeight: 300 }}>
                </Content>

            </Layout>

        </section>

    )
};


export default AdminHomePage
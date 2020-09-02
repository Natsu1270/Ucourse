import React, { useState, useEffect, Suspense } from 'react'


import { getUserAdminData, getProgramCourseAdminData } from '../../api/admin.services'
import { message, Collapse, Avatar, Button, Descriptions, Badge, Space, Typography, Row, Col, Layout, Menu, } from 'antd';
import { DoubleRightOutlined, HomeOutlined, DashOutlined, DashboardOutlined, AppstoreOutlined, BorderOutlined, MoneyCollectOutlined, BarChartOutlined } from '@ant-design/icons';
import {
    useParams, Route, BrowserRouter as Router,
    Switch, useRouteMatch, useLocation, useHistory, Redirect
} from 'react-router-dom'
import { parseHtml } from '../../utils/text.utils';
import { TeamOutlined } from '@ant-design/icons'
import './admin-home.styles.scss'
import UserAdmin from '../../components/Admin/user-admin.component';
import SubMenu from 'antd/lib/menu/SubMenu';
import ResourcesAdmin from '../../components/Admin/resources-admin.component';
import Constants from '../../constants';
import AdminSider from '../../components/Admin/admin-sider.component';

const { Panel } = Collapse
const { Paragraph } = Typography;

const { Sider, Content } = Layout;

const AdminHomePage = ({ token }) => {

    const history = useHistory()
    const match = useRouteMatch();
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [programCourseData, setProgramCourseData] = useState({})

    const getAdminData = async () => {
        setLoading(true)
        try {
            const [userDataRes, programCourseRes] = await Promise.all([
                getUserAdminData(),
                getProgramCourseAdminData()
            ])
            setUserData(userDataRes.data.data)
            setProgramCourseData(programCourseRes.data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }


    useEffect(() => {
        getAdminData()
    }, []);



    return (
        <section>
            <Layout style={{ paddingTop: '64px' }}>
                <Router>

                    <AdminSider match={match} />
                    <Route exact path={match.url}>
                        <UserAdmin
                            userData={userData}
                            loading={loading}
                        />
                    </Route>
                    <Suspense fallback={Constants.SPIN_ICON}>
                        <Route exact path={`${match.url}/resources`}>
                            <ResourcesAdmin
                                data={programCourseData}
                                loading={loading}
                            />
                        </Route>
                    </Suspense>
                </Router>
            </Layout>
        </section>

    )
};


export default AdminHomePage
import { AppstoreOutlined, BarChartOutlined, BorderOutlined, FileProtectOutlined, MoneyCollectOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from "antd";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminSider = ({ match }) => {

    const [collapsed, setCollapsed] = useState(false);
    const { SubMenu } = Menu;
    const { Content, Sider } = Layout;

    const history = useHistory();

    return (
        <Sider
            className='admin-sider'
            theme="light"
            width={240} >

            <Menu
                mode="inline" theme="light"
                defaultSelectedKeys={['c-1']}
                defaultOpenKeys={["p-1"]}
                style={{ height: '100%' }} >
                <h3 className="text--main text-center mb-4">Quản trị</h3>

                <SubMenu key='p-1' icon={<BarChartOutlined />} title="Biểu đồ">
                    <Menu.Item
                        onClick={() => history.push(match.url)}
                        key="c-1"><TeamOutlined />Người dùng</Menu.Item>
                    <Menu.Item
                        onClick={() => history.push(`${match.url}/resources`)}
                        key="c-2"><AppstoreOutlined />Tài nguyên</Menu.Item>
                    <Menu.Item
                        onClick={() => history.push(`${match.url}/income`)}
                        key="c-3">
                        <MoneyCollectOutlined />Doanh thu</Menu.Item>
                </SubMenu>
                <Menu.Item key={"2"} onClick={() => window.open(`/certificate-manage`, '_self')}>
                    <FileProtectOutlined />Quản lý cấp phát chứng chỉ
                </Menu.Item>
                <Menu.Item onClick={() => history.push(`${match.url}/report`)} key="3"><BorderOutlined /> Báo cáo</Menu.Item>
            </Menu>
        </Sider>
    )
};

export default AdminSider
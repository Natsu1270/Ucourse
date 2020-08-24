import React, {useState} from 'react'
import {Layout, Menu, Skeleton} from "antd";
import {Link, useHistory} from 'react-router-dom';
import {HomeOutlined, LaptopOutlined, BookOutlined, FileProtectOutlined, TeamOutlined} from '@ant-design/icons'
import Constants from "../../constants";

const CourseHomeSider = ({isLoading, course, match}) => {

    const [collapsed, setCollapsed] = useState(false);
    const {SubMenu} = Menu;
    const {Content, Sider} = Layout;
    const onCollapse = () => {
        setCollapsed(!collapsed)
    }
    const history = useHistory();
    const pathE = history.location.pathname.split('/')
    const activeKey = pathE[3] ? pathE[3] : '1'

    return (
        <Sider collapsible
               collapsed={collapsed}
               onCollapse={onCollapse}
               width={280}
               className="course-home-sider">
            <h3 className="text--main">
                {isLoading ?
                    Constants.SPIN_ICON_WHITE : collapsed ? <LaptopOutlined/> : course.title
                }
            </h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[activeKey]}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >

                <Menu.Item onClick={()=>history.push(`${match.url}`)} key="1">
                    <HomeOutlined/>
                    <span>Giới thiệu khóa học</span>
                </Menu.Item>
                <Menu.Item onClick={()=>history.push(`${match.url}/schedule`)} key="schedule">
                    <BookOutlined/>
                    <span>Chương trình học</span>
                </Menu.Item>
                <Menu.Item onClick={()=>history.push(`${match.url}/grades`)} key="grades">
                    <FileProtectOutlined/>
                    <span>Điểm</span>
                </Menu.Item>
                <Menu.Item onClick={()=>history.push(`${match.url}/forums`)} key="forums">
                    <TeamOutlined/>
                    <span>Forums</span>
                </Menu.Item>
                <Menu.Item onClick={()=>history.push(`${match.url}/students`)} key="students">
                    <TeamOutlined/>
                    <span>Danh sách học viên</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
};

export default CourseHomeSider
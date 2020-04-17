import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Dropdown, Avatar, Card, Menu, Typography } from 'antd'
import { userProfileSelector } from "../../redux/Profile/profile.selects";
import { isLoadingSelector } from '../../redux/Auth/auth.selects';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProfileHeaderDropdown = (props) => {
    const userProfile = useSelector(state => userProfileSelector(state))
    const isLoading = useSelector(state => isLoadingSelector(state))

    const { Text } = Typography
    const { Meta } = Card;
    const styles = {
        textDecoration: 'none'
    };
    const cardStyles = {
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0.2rem 1rem',
        width: 120, height: 40,
        backgroundColor: '#57acfa',
        border: '1px solid white'
    };
    const bodyStyles = {
        backgroundColor: '#33b5e5'
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile" style={styles}>
                    Thông tin cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/my-courses" style={styles}>
                    Khoá học của tôi
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/ability-tests" style={styles}>
                    Tổng hợp
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Text type="danger" disabled={isLoading} onClick={props.handleLogout}>
                    {
                        isLoading ? <Spin indicator={antIcon} /> : 'Logout'
                    }
                </Text>
            </Menu.Item>
        </Menu>)
    const username = props.currentUser.username ? props.currentUser.username : props.currentUser.displayName
    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <Card style={cardStyles} bordered={false}
                size='small'>
                <Meta
                    style={{ display: "flex", alignItems: "center" }}
                    avatar={
                        <Avatar size={24}
                            src={userProfile.avatar || props.currentUser.photoURL} />
                    }
                    title={<span className='text-white'>{username}</span>}
                />
            </Card>
        </Dropdown>
    )
}

export default ProfileHeaderDropdown
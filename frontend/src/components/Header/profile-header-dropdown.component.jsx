import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Avatar, Card, Menu, Typography } from 'antd'



const ProfileHeaderDropdown = (props) => {
    const { Text } = Typography
    const { Meta } = Card;
    const styles = {
        textDecoration: 'none'
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile" style={styles}>
                    Profile Settings
            </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/my-courses" style={styles}>
                    My Courses
            </Link>
            </Menu.Item>
            <Menu.Item>
                <Text type="danger" onClick={props.handleLogout}>Logout</Text>
            </Menu.Item>
        </Menu>)
    const username = props.currentUser.username ? props.currentUser.username : props.currentUser.displayName
    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <Card style={{ width: 150, height: 50 }}
                size='small'>
                <Meta
                    avatar={
                        <Avatar
                            src={props.currentUser.avatar || props.currentUser.photoURL} />
                    }
                    title={username}

                />
            </Card>
        </Dropdown>
    )
}

export default ProfileHeaderDropdown
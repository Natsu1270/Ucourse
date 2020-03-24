import React from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Avatar, Card, Menu, Typography} from 'antd'


const ProfileHeaderDropdown = (props) => {
    const {Text} = Typography
    const {Meta} = Card;
    const styles = {
        textDecoration: 'none'
    };
    const cardStyles = {
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0.2rem 1rem',
        width: 150, height: 50,
        backgroundColor: '#f0eeee'
    };
    const bodyStyles = {
        backgroundColor: '#33b5e5'
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
            <Card style={cardStyles}
                  size='small'>
                <Meta
                    style={{display:"flex",alignItems:"center"}}
                    avatar={
                        <Avatar
                            src={props.currentUser.avatar || props.currentUser.photoURL}/>
                    }
                    title={<span className=''>{username}</span>}
                />
            </Card>
        </Dropdown>
    )
}

export default ProfileHeaderDropdown
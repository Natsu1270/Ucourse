import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";
import {Dropdown, Avatar, Card, Menu, Typography} from 'antd'
import {userProfileSelector} from "../../redux/Profile/profile.selects";


const ProfileHeaderDropdown = (props) => {
    const userProfile = useSelector(state=>userProfileSelector(state))
    const {Text} = Typography
    const {Meta} = Card;
    const styles = {
        textDecoration: 'none'
    };
    const cardStyles = {
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0.2rem 1rem',
        width: 120, height: 40,
        backgroundColor: 'rgba(0,0,0,0.1)'
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
            <Card style={cardStyles} bordered={false}
                  size='small'>
                <Meta
                    style={{display:"flex",alignItems:"center"}}
                    avatar={
                        <Avatar size={24}
                            src={userProfile.avatar || props.currentUser.photoURL}/>
                    }
                    title={<span className='text-white'>{username}</span>}
                />
            </Card>
        </Dropdown>
    )
}

export default ProfileHeaderDropdown
import React from 'react'
import { Card, Avatar, Menu } from "antd";
import { Link } from 'react-router-dom'

const { Meta } = Card

const ProfileMenu = ({ match, userProfile, currentUser }) => {


    return (
        <div className="profile-menu" >
            <Card bordered={false} >
                <Meta
                    avatar={
                        <Avatar size={128} src={
                            userProfile.avatar || currentUser.photoURL
                        } />
                    }
                    title={currentUser ? currentUser.username || currentUser.displayName : '...'}
                    description={currentUser ? currentUser.email : '...'}
                />
            </Card>

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="1">
                    <Link className='link--no-decoration' to={match.url}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link className='link--no-decoration' to={`${match.url}/account`}>Account</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <span>Option 3</span>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default ProfileMenu
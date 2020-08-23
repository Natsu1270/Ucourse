import React from 'react'
import {Card, Avatar, Menu} from "antd";
import {Link} from 'react-router-dom';
import {UserOutlined, SettingOutlined} from "@ant-design/icons";


const {Meta} = Card

const ProfileMenu = ({match, userProfile, currentUser}) => {


    return (
        <div className="profile-menu">
            <div className="profile-menu__content">
                <Card bordered={false}>
                    <Meta
                        avatar={
                            <Avatar size={128} src={
                                userProfile.avatar || currentUser.photoURL
                            }/>
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
                        <Link className='link--no-decoration' to={match.url}>
                            <UserOutlined /> Thông tin cá nhân</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link className='link--no-decoration' to={`${match.url}/account`}>
                            <SettingOutlined /> Tài khoản</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default ProfileMenu
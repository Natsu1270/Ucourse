import React from 'react'
import { Menu } from 'antd'
import { DeleteOutlined, SettingOutlined, ReadOutlined, ProfileOutlined, BookOutlined } from '@ant-design/icons'


const TopicMenu = ({ topic, handleDelete, triggerEdit, triggerCreateAsset, triggerCreateQuize, triggerCreateAssignment }) => {

    return (
        <Menu style={{ fontSize: '2rem' }}>
            <Menu.Item
                danger
                onClick={
                    () => handleDelete(topic.id)
                }
            >
                <DeleteOutlined /> Xóa chủ đề
            </Menu.Item>
            <Menu.Item onClick={() => triggerEdit(topic.id)}>
                <SettingOutlined /> Sửa chủ đề
            </Menu.Item>
            <Menu.Item onClick={() => triggerCreateAsset(topic.id)}>
                <ReadOutlined /> Thêm bài giảng
            </Menu.Item>
            <Menu.Item onClick={() => triggerCreateQuize(topic.id)}>
                <ProfileOutlined /> Thêm bài kiểm tra
            </Menu.Item>
            <Menu.Item onClick={() => triggerCreateAssignment(topic.id, true, null)}>
                <BookOutlined /> Thêm assignment
            </Menu.Item>
        </Menu>
    )
}

export default TopicMenu
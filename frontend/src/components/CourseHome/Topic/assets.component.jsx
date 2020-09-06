import React from 'react'

import { List, Dropdown, Menu, Avatar, Tag } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { assetAvatar } from './topic.utils'




const AssetsList = ({ assets, deleteAsset, triggerEditAsset, userRole, gotoLecture }) => {

    return (
        <List
            itemLayout="horizontal"
            dataSource={assets}
            renderItem={item => (
                <List.Item
                    actions={[userRole.code ?
                        userRole.code === 'TC' || userRole.code === "TA" ?
                            <Dropdown overlay={<Menu>
                                <Menu.Item danger onClick={() => deleteAsset(item.id, "asset")}>
                                    Xóa bài giảng
                                                </Menu.Item>
                                <Menu.Item onClick={() => triggerEditAsset(item)}>Sửa bài giảng</Menu.Item>
                            </Menu>} placement="topCenter">
                                <CaretDownOutlined className="down-indict" />
                            </Dropdown> : null : null]}
                    className="course-topic__content--item"
                >
                    <List.Item.Meta
                        avatar={<Avatar src={assetAvatar(item.icon, item.file_type)} />}
                        title={<span onClick={() => gotoLecture(item.id, item.content, item.file_type)}>{item.title}</span>}
                        description={item.info}
                    />
                </List.Item>
            )}
        />
    )
}

export default AssetsList
import React from 'react'

import { List, Dropdown, Menu, Avatar, Tag } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import assignmentAvatar from '../../../assets/exam.png';


const AssignmentList = ({ assignments, deleteAsset, triggerCreateAssignment, userRole, gotoAssignment }) => {

    return (
        <List
            itemLayout="horizontal"
            dataSource={assignments}
            renderItem={item => (
                <List.Item
                    actions={[userRole.code ?
                        userRole.code === 'TC' || userRole.code === "TA" ?
                            <Dropdown overlay={<Menu>
                                <Menu.Item danger onClick={() => deleteAsset(item.id, "assignment")}>
                                    Xóa bài assignment
                                                </Menu.Item>
                                <Menu.Item onClick={() => triggerCreateAssignment(null, false, item)}>Sửa bài assignment</Menu.Item>
                            </Menu>} placement="topCenter">
                                <CaretDownOutlined className="down-indict" />
                            </Dropdown> : null : null]}
                    className="course-topic__content--item"
                >
                    <List.Item.Meta
                        onClick={() => gotoAssignment(item.id)}
                        avatar={<Avatar src={assignmentAvatar} />}
                        title={<span>{item.name}</span>}
                        description={item.info}
                    />
                    {
                        item.mandatory ? <Tag color="#f50">Bắt buộc</Tag> :
                            <Tag color="#2db7f5">Không bắt buộc, không tính điểm</Tag>
                    }
                </List.Item>
            )}
        />
    )
}

export default AssignmentList
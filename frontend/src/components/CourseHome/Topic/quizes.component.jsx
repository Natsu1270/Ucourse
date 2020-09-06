import React from 'react'

import { List, Dropdown, Menu, Avatar, Tag } from 'antd'
import { isTimeBefore } from '../../../utils/text.utils'

const QuizList = ({ quizes, deleteAsset, triggerEditQuize, gotoExam, }) => {

    return (
        <List
            itemLayout="horizontal"
            dataSource={quizes}
            renderItem={item => (
                <List.Item
                    actions={[userRole.code ?
                        userRole.code === 'TC' || userRole.code === "TA" ?
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item danger onClick={() => deleteAsset(item.id, "quizes")}>Xóa bài kiểm tra</Menu.Item>
                                    <Menu.Item onClick={() => triggerEditQuize(item)}>Sửa bài kiểm tra</Menu.Item>
                                </Menu>
                            } placement="topCenter">
                                <CaretDownOutlined className="down-indict" />
                            </Dropdown> : null : null]}
                    className="course-topic__content--item"
                >
                    <List.Item.Meta
                        onClick={() => gotoExam(item.id)}
                        avatar={<Avatar src={quizIcon} />}
                        title={<span>{item.title}</span>}
                        description={
                            <Row gutter={16}>

                                {item.expired ?
                                    <Col>
                                        {
                                            !isTimeBefore(item.expired) ?
                                                <Text mark>Bài kiểm tra sẽ hết hạn vào: {formatDate(item.expired, Constants.MMM_Do__YY__TIME)}</Text> :
                                                <Text style={{ fontWeight: '500' }} type="danger">Quá thời gian làm bài: {formatDate(item.expired, Constants.MMM_Do__YY__TIME)}</Text>
                                        }
                                    </Col> : null
                                }

                                <Col>
                                    {
                                        item.mandatory ? <Tag color="#f50">Bắt buộc</Tag> :
                                            <Tag color="#2db7f5">Không bắt buộc, không tính điểm</Tag>
                                    }
                                </Col>
                            </Row>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default QuizList
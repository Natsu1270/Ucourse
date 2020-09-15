import React from 'react'
import { SmileTwoTone, MehTwoTone, FrownTwoTone, DollarCircleTwoTone } from '@ant-design/icons'
import { Tag, Divider, Space, Row, Col } from 'antd';
import { renderPrice } from '../../utils/text.utils';

const CourseCardSub = ({ title, homeNum, level, price, isBought }) => {

    const renderLevel = () => {
        if (level === 'Beginner') {
            return (<Space><SmileTwoTone twoToneColor='#52c41a' /> Cơ bản</Space>)
        }
        if (level === 'Intermediate') {
            return (<Space><MehTwoTone /> Trung cấp</Space>)
        }
        if (level === 'Advanced') {
            return (<Space><FrownTwoTone twoToneColor='#eb2f96' /> Nâng Cao</Space>)
        }
        return (<Space><SmileTwoTone twoToneColor='#52c41a' /> Tổng hợp</Space>)
    };

    return (
        <div className="course-card-sub">
            <div className="course-card-sub__title text--sub__bigger2">{title}</div>
            <Divider />
            <Row justify="space-between">
                <Col>
                    <span className="text--sub__bigger">
                        {homeNum === 0 ? "Chưa có lớp" : homeNum + " lớp"}
                    </span>
                </Col>
                <Col>
                    <Space className="text--sub__bigger">
                        <DollarCircleTwoTone twoToneColor="#ffa700" />
                        {renderPrice(price)}
                    </Space>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <span className="course-card-sub__others--item text--sub__bigger">
                        {renderLevel()}
                    </span>
                </Col>
                <Col className="course-card-sub__others--item">
                    {
                        isBought ? <Tag color="#f50">Đã sở hữu</Tag> : null
                    }
                </Col>


            </Row>
        </div>
    )
}

export default CourseCardSub
import React from 'react'
import { Drawer, Divider, Col, Row } from 'antd'


const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const CourseHomeDrawer = ({ courseHome, visible, handleClose }) => {

    return (
        <Drawer
            width={640}
            placement="right"
            closable={true}
            onClose={handleClose}
            visible={visible}>
            <p className="course-drawer--title">
                {courseHome.full_name}
            </p>
            <p className="course-drawer--teacher">Giảng viên</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Tên" content={courseHome.teacher ? courseHome.teacher.fullname : ''} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Email" content={courseHome.teacher ? courseHome.teacher.email : ''} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Số điện thoại"
                        content={courseHome.teacher ? courseHome.teacher.phone_number : ''} />
                </Col>
            </Row>
            <Divider />
            <p className="course-drawer--date">Thông tin về thời gian dự kiến</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Ngày mở đăng ký" content={courseHome.register_date} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Ngày bắt đầu khóa học" content={courseHome.open_date} />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <DescriptionItem title="Ngày mở kết thúc dự kiến" content={courseHome.end_date} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Số ngày cho phép đăng ký khi khóa học đã bắt đầu"
                        content={courseHome.over_admission_days || 0} />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <DescriptionItem title="Số học học viên tối đa" content={courseHome.maximum_number} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Số học viên đã đăng ký" content={courseHome.student_count} />
                </Col>
            </Row>

        </Drawer>)
}

export default CourseHomeDrawer
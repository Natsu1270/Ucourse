import React from 'react'
import {List, Avatar, Skeleton} from 'antd'

const CourseClasses = ({classes, isLoading}) => {

    return (
        <section className="mt-10 section-course-classes" id="cs-course-classes">
            <h2 className="text--main section-header" id="cs-course-overview">
                Danh sách lớp thuộc khóa học
            </h2>
            <List
                className="class-list"
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={classes}
                renderItem={item => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">Đăng ký lớp</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={isLoading} active>
                    <List.Item.Meta
                        avatar={
                        <Avatar src={item.teacher.avatar} />
                        }
                        title={<h3>{item.full_name}</h3>}
                                description={<div className="dis-flex-start">
                                    <span className="mr-3">Giảng viên: {item.teacher.fullname}</span>
                                    <span>Ngày bắt đầu: {item.open_date}</span>
                                </div>}
                    />
                            <div>{item.status}</div>
                    </Skeleton>
                </List.Item>
                )}
            />
        </section>
    )
}

export default CourseClasses
import React, {useState} from 'react'
import {List, Avatar, Skeleton, Tag, Button} from 'antd'
import {dayDiff} from "../../utils/text.utils";
import moment from 'moment'

const CourseClasses = ({classes, isLoading}) => {


    const courseHomeStatus = (home) => {
        const now = moment()
        const registerDays = dayDiff(home.register_date, now)
        const openDays = dayDiff(home.open_date, now)
        const delayDays = home.over_admission_days
        let endDays;
        if (home.end_date) {
            endDays = dayDiff(home.close_date, now)
        }

        if (home.status === 'closed' || endDays < 0) {
            return <Tag color="#f50">Khóa học đã kết thúc</Tag>
        }
        if (registerDays > 0) {
            return <Tag color="#ffcd3c">Chưa đến ngày đăng ký</Tag>
        }

        if (registerDays <= 0 && openDays > 0) return <Tag color="#87d068">Đang mở đăng ký</Tag>
        if (-openDays < delayDays) {
            return <Tag color="#2db7f5">Trong tiến trình, có thể đăng ký</Tag>
        } else {
            return <Tag color="#f50">Trong tiến trình, hết hạn đăng ký</Tag>
        }
    }

    const canRegister = (home) => {
        const now = moment()
        const registerDays = dayDiff(home.register_date, now)
        const openDays = dayDiff(home.open_date, now)
        const delayDays = home.over_admission_days
        if (registerDays > 0) {
            return false
        }
        if (registerDays <= 0 && openDays > 0) return true
        return -openDays < delayDays;
    }

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
                        actions={[<Button disabled={!canRegister(item)} type="primary" key="list-loadmore-edit">Đăng ký
                            lớp</Button>]}
                    >
                        <Skeleton avatar title={false} loading={isLoading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.teacher.avatar}/>
                                }
                                title={<span className="text--sub__bigger3 text-black">{item.full_name}</span>}
                                description={<div className="class-sub-info text-info-normal">
                                    <span className="class-sub-info__item">Giảng viên: {item.teacher.fullname}</span>
                                    <span className="class-sub-info__item">Ngày bắt đầu: {item.open_date}</span>
                                    <span className="class-sub-info__item">{courseHomeStatus(item)}</span>
                                </div>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </section>
    )
}

export default CourseClasses
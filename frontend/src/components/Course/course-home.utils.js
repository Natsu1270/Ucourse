import React from 'react'
import { dayDiff, isSameOrAfterNow, isAfterNow, isTimeBefore } from "../../utils/text.utils";
import moment from 'moment'
import { Tag } from 'antd'


const now = moment()


export const courseHomeStatus = (home) => {
    const registerDate = home.register_date
    const openDate = home.open_date
    const extendDate = moment(openDate).add(home.over_admission_days, 'days')

    let endDays;
    if (home.end_date) {
        endDays = dayDiff(home.close_date, now)
    }

    if (home.status === 'closed' || endDays < 0) {
        return <Tag color="#f50">Lớp đã kết thúc</Tag>
    }

    if (moment(registerDate).isAfter(now, 'days')) {
        return <Tag color="#ffcd3c">Chưa đến ngày đăng ký</Tag>
    }

    if (moment(registerDate).isSameOrBefore(now, 'days') && moment(openDate).isAfter(now, 'days')) {
        return <Tag color="#87d068">Đang mở đăng ký</Tag>
    }
    if (moment(openDate).isSameOrBefore(now, 'days') && moment(extendDate).isSameOrAfter(now, 'days')) {
        return <Tag color="#2db7f5">Trong tiến trình, có thể đăng ký</Tag>
    }

    return <Tag color="#f50">Trong tiến trình, hết hạn đăng ký</Tag>

}

export const canRegister = (home) => {
    const registerDate = home.register_date
    const openDate = home.open_date
    const delayDate = moment(home.open_date).add(home.over_admission_days, 'days')

    if (moment(registerDate).isAfter(now, 'days')) {
        return false
    }

    if (moment(registerDate).isSameOrBefore(now, 'days') && moment(openDate).isAfter(now, 'days')) {
        return true
    }
    const a = moment(openDate).isSameOrBefore(now, 'days')
    const b = moment(delayDate).isSameOrAfter(now, 'days');
    return a && b
}
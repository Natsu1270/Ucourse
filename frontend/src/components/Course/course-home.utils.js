import React from 'react'
import { dayDiff } from "../../utils/text.utils";
import moment from 'moment'
import { Tag } from 'antd'


const now = moment()


export const courseHomeStatus = (home) => {
    const registerDays = dayDiff(home.register_date, now)
    const openDays = dayDiff(home.open_date, now)
    const delayDays = home.over_admission_days
    let endDays;
    if (home.end_date) {
        endDays = dayDiff(home.close_date, now)
    }

    if (home.status === 'closed' || endDays < 0) {
        return <Tag color="#f50">Lớp đã kết thúc</Tag>
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

export const canRegister = (home) => {
    const registerDays = dayDiff(home.register_date, now)
    const openDays = dayDiff(home.open_date, now)
    const delayDays = home.over_admission_days
    if (registerDays > 0) {
        return false
    }
    if (registerDays <= 0 && openDays > 0) return true
    return -openDays < delayDays;
}
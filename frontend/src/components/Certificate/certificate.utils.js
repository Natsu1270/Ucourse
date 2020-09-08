import React from 'react'
import { Tag, Button } from 'antd'

export const renderStatus = (status) => {
    if (status === 'on_going') return <Tag color="purple">Trong tiến trình</Tag>
    if (status === 'fail') return <Tag color="red">Chưa đạt tiêu chuẩn</Tag>
    return <Tag color="blue">Đạt</Tag>
}

export const renderRank = (rank) => {
    if (rank === null || rank == "") return <Tag color="red">Chưa phân loại</Tag>
    if (rank === 'bad') return <Tag color="magenta">Yếu</Tag>
    if (rank === 'medium') return <Tag color="purple">Trung bình</Tag>
    if (rank === 'good') return <Tag color="green">Khá</Tag>
    return <Tag color="blue">Xuất sắc</Tag>
}

export const renderCertificate = (received, record, genCertificate) => {
    if (record.status == 'fail') {
        return <Tag color="#ff8b94">Không đạt yêu cầu</Tag>
    }
    if (!received && record.status == 'pass') {
        return <Button
            type="primary"
            style={{ background: "#8874a3", border: 'none' }}
            onClick={() => genCertificate(record)}>
            Cấp ngay
                </Button>
    }
    if (!received) {
        return <Tag color="#ffcc5c">Chưa tổng kết</Tag>
    }
    return <Tag color="#2db7f5">Đã cấp</Tag>
}

export const parseRankByScore = score => {
    if (score < 5) return 'bad'
    if (score < 7) return 'medium'
    if (score < 9) return 'good'
    return 'xgood'
}
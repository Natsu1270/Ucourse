import React from 'react'
import { formatDate } from '../../utils/text.utils'
import Constants from '../../constants'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'

export const calFinalScore = (exams, assignments) => {
    let finalResult = 0
    let qualified = true
    let unDoneTasks = []
    exams.forEach(exam => {
        if (exam.exam) {
            if (exam.mandatory) {
                if (!exam.is_pass) {
                    qualified = false
                    unDoneTasks.push(exam.exam.name)
                }
                if (exam.final_result != undefined) {
                    finalResult += exam.final_result * exam.exam.percentage / 100
                }
            }

        }
    })
    assignments.forEach(ass => {
        if (ass.assignment.mandatory) {
            if (!ass.is_pass) {
                qualified = false
                unDoneTasks.push(ass.assignment.name)
            }
            if (ass.score != undefined) {
                finalResult += ass.score * ass.assignment.percentage / 100
            }
        }
    })
    unDoneTasks = unDoneTasks.join(", ")
    return { finalResult, qualified, unDoneTasks }
}

export const columns = [
    {
        title: '#',
        dataIndex: 'stt',
        key: 'stt',
        render: stt => <span>{stt}</span>,
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => <Link replace to={`exams/${record.id}`}>{name}</Link>
    },
    {
        title: 'Bắt buộc',
        dataIndex: 'mandatory',
        key: 'mandatory',
        render: (mandatory, record) => {
            return mandatory ? <Tag color="#f50">Bắt buộc</Tag> : <Tag color="#63ace5">Không bắt buộc</Tag>
        }
    },
    {
        title: 'Thời gian',
        dataIndex: 'date',
        key: 'date',
        render: date => <span>{formatDate(date, Constants.MMM_Do__YY__TIME)}</span>
    },
    {
        title: 'Điểm',
        dataIndex: 'result',
        key: 'result',
        render: result => <span>{result}</span>
    },
    {
        title: 'Đạt yêu cầu',
        dataIndex: 'isPass',
        key: 'isPass',
        filters: [
            {
                text: 'Đạt',
                value: true,
            },
            {
                text: 'Không đạt',
                value: false,
            },
        ],
        onFilter: (value, record) => record.isPass === value,
        render: (isPass, record) => <span>{record.mandatory ? isPass ? <Tag color="#63ace5">Đạt</Tag> : <Tag color="#f50">Không đạt</Tag> : null}</span>,
    },
    {
        title: 'Phần trăm điểm',
        dataIndex: 'percentage',
        key: 'percentage',
        render: percentage => <span>{percentage}%</span>
    }
];



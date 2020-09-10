import React from 'react'
import { Table, Tag, Button } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";
import moment from 'moment'

const ExamHistoryTable = ({ exams, setReviewId, examDetail }) => {

    const reviewBtn = (record) => {
        if (moment(examDetail.expired_date).isBefore(moment(), 'days')) {
            return <Button onClick={() => setReviewId(record.id)} type="primary">Xem lại</Button>
        } else {
            return <Button disabled type="primary">Xem lại</Button>
        }
    }

    const columns = [
        {
            title: 'Lần',
            dataIndex: 'stt',
            key: 'stt',
            sorter: (a, b) => a.stt - b.stt,
            render: text => <span>{text}</span>,
        },
        {
            title: 'Điểm',
            dataIndex: 'grade',
            key: 'grade',
            sorter: (a, b) => a.grade - b.grade,
            render: text => <span>{text}</span>,
        },
        {
            title: 'Kết quả',
            dataIndex: 'result',
            key: 'result',
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
            onFilter: (value, record) => record.result === value,
            render: isPass => <span>{isPass ? <Tag color="#63ace5">Đạt</Tag> : <Tag color="#f50">Không đạt</Tag>}</span>,
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'date',
            key: 'date',
            render: text => <a>{text}</a>,
        },
        {
            dataIndex: 'btn',
            key: 'btn',
            render: (text, record) => reviewBtn(record)
        },
    ];

    const data = exams.map((exam, index) => ({
        key: index,
        stt: exams.length - index,
        grade: exam.result,
        date: formatDate(exam.date_taken, Constants.MMM_Do__YY__TIME),
        result: exam.is_pass,
        id: exam.id
    }))

    const tableColumns = columns.map(item => ({ ...item, ellipsis: true }));

    return (
        <Table
            columns={tableColumns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
        />
    )
}

export default ExamHistoryTable
import React from 'react'
import { Table } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";

const ExamHistoryTable = ({ exams, passScore }) => {
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
                    text: 'Pass',
                    value: 'Pass',
                },
                {
                    text: 'Fail',
                    value: 'Fail',
                },
            ],
            onFilter: (value, record) => record.result.indexOf(value) === 0,
            render: text => <span>{text}</span>,
        },
        {
            title: 'Ngày thực hiện',
            dataIndex: 'date',
            key: 'date',
            render: text => <a>{text}</a>,
        },
    ];

    const data = exams.map((exam, index) => ({
        key: index,
        stt: exams.length - index,
        grade: exam.result,
        date: formatDate(exam.date_taken, Constants.MMM_Do__YY__TIME),
        result: passScore ? exam.result >= passScore ? 'Pass' : 'Fail' : 'N/A'
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
import React from 'react'
import {Table} from "antd";
import {formatDate} from "../../utils/text.utils";
import Constants from "../../constants";

const ExamHistoryTable = ({exams}) => {
    const columns = [
        {
            title: 'Lần',
            dataIndex: 'stt',
            key: 'stt',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Điểm',
            dataIndex: 'grade',
            key: 'grade',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Kết quả',
            dataIndex: 'result',
            key: 'result',
            render: text => <a>{text}</a>,
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
        stt: index+1,
        grade: exam.result,
        date: formatDate(exam.date_taken, Constants.MMM_Do__YY__TIME),
        result: 'Pass'
    }))

    const tableColumns = columns.map(item => ({ ...item, ellipsis: true }));

    return (
        <Table
            columns={tableColumns}
            dataSource={data}
            pagination= { {pageSize: 3}}
        />
    )
}

export default ExamHistoryTable
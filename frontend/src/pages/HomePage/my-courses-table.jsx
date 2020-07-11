import React from 'react'
import { Table } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";
import { Link } from 'react-router-dom';

const MyCourseTable = ({ courses }) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Tên',
            dataIndex: 'title',
            key: 'title',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'result',
            key: 'result',
            render: text => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'link',
            key: 'link',
            render: link => <Link to={`learn/${link}`}>Tiếp tục</Link>,
        },
    ];

    const data = courses.map((course, index) => ({
        key: index,
        stt: index + 1,
        title: course.slug,
        result: 'Pass',
        link: course.slug
    }))

    const tableColumns = columns.map(item => ({ ...item, ellipsis: true }));

    return (
        <Table
            size="middle"
            columns={tableColumns}
            dataSource={data}
        />
    )
}

export default MyCourseTable
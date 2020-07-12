import React from 'react'
import { Table, Button } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";
import { Link, useHistory } from 'react-router-dom';


const MyCourseTable = ({ courses }) => {

    const history = useHistory();

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
            title: 'Giảng viên',
            dataIndex: 'teacher',
            key: 'teacher',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Khoá học',
            dataIndex: 'course',
            key: 'course',
            render: text => <Link to={`courses/${text.slug}`}>{text.title}</Link>
        },
        {
            title: '',
            dataIndex: 'link',
            key: 'link',
            render: link => <Button type="primary" onClick={() => history.push(`learn/${link}`)}>Tiếp tục</Button>,
        },
    ];

    const data = courses.map((courseHome, index) => ({
        key: index,
        stt: index + 1,
        title: courseHome.full_name,
        teacher: courseHome.teacher,
        course: courseHome.course,
        link: courseHome.slug
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
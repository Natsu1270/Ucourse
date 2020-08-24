import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Space, Tag } from 'antd'
import Constants from '../../constants'
import { getEventListAPI } from '../../api/event.services'
import { getCourseHomeDetailAPI } from '../../api/courseHome.services'
import { formatDate, timeDiff } from '../../utils/text.utils'
import { Link, useHistory } from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar'
const { TabPane } = Tabs

const CourseHomeStudent = ({ students, isLoading }) => {
    const [studentData, setStudents] = useState([])
    // getCourseHomeDetailAPI(studentId).then(response => {
    //     setStudents(response.CourseHomeStudent.data.data)
    // })
    const history = useHistory();
    useEffect(() => {
        setStudents((students || []).map((student, index) => ({
            stt: index + 1,
            username: student.username,
            email: student.email,
            status: student.status,
            id: student.id,
            avatar: student.user_profile.avatar,
            lastLogin: student.last_login
        })));
    }, [students])



    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Họ tên',
            dataIndex: 'username',
            key: 'username',
            render: (username, record) => (
                <Space onClick={() => window.open(`/user/${username}`)} style={{ cursor: 'pointer' }}>
                    <Avatar src={record.avatar} size={48} />
                    <p style={{ fontSize: '1.6rem', color: '#048dfd' }}>{username}</p>
                </Space>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email => <span>{email}</span>
        },
        {
            title: 'Đăng nhập lần cuối vào',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            render: lastLogin => <span>{lastLogin !== null ? timeDiff(lastLogin) : 'Chưa truy cập'}</span>
        },

    ];

    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Danh sách học viên
            </h3>
            <Table pagination={{ pageSize: 5 }} size="large" dataSource={studentData} columns={columns} />
        </section>
    )
}
export default CourseHomeStudent
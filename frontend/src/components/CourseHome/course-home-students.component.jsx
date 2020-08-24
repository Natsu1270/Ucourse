import React, { useState, useEffect } from 'react'
import { message, Tabs, Table } from 'antd'
import Constants from '../../constants'
import { getEventListAPI } from '../../api/event.services'
import {getCourseHomeDetailAPI}  from '../../api/courseHome.services'
import { formatDate } from '../../utils/text.utils'
import { Link , useHistory} from 'react-router-dom'
const { TabPane } = Tabs

const CourseHomeStudent = ({students, isLoading}) => {
    // const [loading, setLoading] = useState(false)
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
            id: student.id
        })));
        console.log(studentData);
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
            // render: (username, id) => <Link to={`user/${username}`}>{username}</Link >
            render: (username) => <a href="#" onClick={() => history.push(`/user/${username}`)}>{username}</a>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email => <span>{email}</span>
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: status => <span>{status}</span>
        }, 
        
    ];

    return (
        // <div></div>
        <section className="section-5 page-2">
            <h2 className="text--main mb-5">Danh sách học viên</h2>
             <Tabs defaultActiveKey="1">
                <TabPane tab="" key="">
                    <Table dataSource={studentData} columns={columns} />
                </TabPane>
            </Tabs>
        </section>
    )
}
export default CourseHomeStudent
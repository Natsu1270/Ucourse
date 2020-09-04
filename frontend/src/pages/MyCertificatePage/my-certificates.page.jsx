import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Tag, Button, Avatar, Space } from 'antd'
import { dayDiff, formatDate } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import { getAllCourseCertificate, getStudentCertificate } from '../../api/summary.services'
import { DownOutlined, ExpandOutlined } from '@ant-design/icons'
import Constants from '../../constants'

import certificateIcon from '../../assets/certificate.png'

const { TabPane } = Tabs

const MyCertificatePage = ({ certificates, isLoading }) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [mycertifData, setCertificates] = useState([])

    const token = useSelector(state => tokenSelector(state))

    const getStudentCertificates = async () => {
        setLoading(true);
        try {
            const studentCertificates = await getAllCourseCertificate({ token });
            console.log(studentCertificates);
            if (studentCertificates.data.data) {
                setCertificates((studentCertificates.data.data).map((certificate, index) => ({
                    stt: index + 1,
                    name: certificate.course_home.course.title,
                    date: certificate.received_date,
                    file: certificate.file
                })));

            }
        }
        catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }

        setLoading(false)
    }


    useEffect(() => {
        getStudentCertificates();

    }, [certificates])



    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'name',
            key: 'name',
            render: name => <Tag color="geekblue" style={{ fontSize: '1.8rem', padding: '0.5rem' }}>{name}</Tag>
        },
        {
            title: 'Ngày hoàn thành',
            dataIndex: 'date',
            key: 'date',
            render: date => <span>{formatDate(date, Constants.MMM_Do_YYYY)}</span>
        },
        {
            title: 'File chứng chỉ',
            dataIndex: 'file',
            key: 'file',
            render: file => <Space onClick={() => window.open(file)}>
                <Avatar size={48} shape="square" src={certificateIcon} />
                <Button><ExpandOutlined /> Click để xem</Button>
            </Space>
        },


    ];


    return (
        <section className="section-10 page ">
            <div className="page-card">
                <h2 className="title--big text-center">Chứng chỉ của tôi</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Danh sách chứng chỉ" key="">
                        <Table loading={loading} dataSource={mycertifData} columns={columns} />
                    </TabPane>
                </Tabs>
            </div>
        </section>
    )
}

export default MyCertificatePage
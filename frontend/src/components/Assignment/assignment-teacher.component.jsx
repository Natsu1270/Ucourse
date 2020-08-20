import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Skeleton, message, Descriptions, Badge, Button, Form,
    Upload, Tag, Statistic, Tree, Row, Col, Card, Space, List,
    Popconfirm, Tabs, Table, Divider
} from "antd";
import {
    getAssignmentDetailAPI, getStudentAssignmentListByTopicAPI,
    downloadAssignmentItem, downloadAllAssigment
} from '../../api/assignment.services'
import { formatDate, isTimeBefore, parseHtml, dayDiff } from '../../utils/text.utils';
import Constants from '../../constants';
import Modal from 'antd/lib/modal/Modal';
import {
    InboxOutlined, UploadOutlined, DownOutlined,
    SettingOutlined, PaperClipOutlined, ClockCircleTwoTone
} from '@ant-design/icons'

import { Doughnut } from 'react-chartjs-2'
import fileDownload from 'js-file-download'

const { Dragger } = Upload
const { Countdown } = Statistic
const { TabPane } = Tabs

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AssignmentTeacher = ({ token, courseHomeDetail }) => {

    const { assignmentId, topicId } = useParams();
    const [loading, setLoading] = useState(false)
    const [assignmentDetail, setAssignmentDetail] = useState({})
    const [studentAssignments, setStudentAssignments] = useState([])
    const [viewed, setViewed] = useState(0)
    const [studentNum, setStudentNum] = useState(0)
    const [downloading, setDownloading] = useState(false)


    useEffect(() => {
        if (courseHomeDetail.students) {
            setStudentNum(courseHomeDetail.students.length)
        }
    }, [courseHomeDetail])


    const getAssignmentDetail = async () => {
        setLoading(true)
        const data = { token, assignment: assignmentId }
        const listData = { token, topic: topicId }
        try {
            const [assignmentRes, assignmentListRes] = await Promise.all([
                getAssignmentDetailAPI(data),
                getStudentAssignmentListByTopicAPI(listData)
            ])
            setAssignmentDetail(assignmentRes.data.data)
            setViewed(assignmentRes.data.data.views.length)
            setStudentAssignments(assignmentListRes.data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getAssignmentDetail()
    }, [assignmentId])

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        if (info.node.url) {
            if (info.node.url) {
                window.open(info.node.url, '_blank')
            }
        }
    };

    const downloadItem = async (id, filename) => {
        const data = { token, id, filename }
        setDownloading(true)
        try {
            const result = await downloadAssignmentItem(data)
            fileDownload(result.data, `${filename}.zip`)

        } catch (err) {
            message.error("Cớ lỗi xảy ra: " + err.message)
        }
        setDownloading(false)
    }

    const downloadAllItem = async () => {
        const data = { token, assignmentId: assignmentDetail.id }
        setDownloading(true)
        try {
            const result = await downloadAllAssigment(data)
            fileDownload(result.data, `${assignmentDetail.name}.zip`)

        } catch (err) {
            message.error("Cớ lỗi xảy ra: " + err.message)
        }
        setDownloading(false)
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: text => <span>{text}</span>
        },
        {
            title: 'Tên học viên',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Thời gian nộp',
            dataIndex: 'date',
            key: 'date',
            render: text => <span>{formatDate(text, Constants.MMM_Do__YY__TIME)}</span>,
        },
        {
            title: 'Số lần nộp',
            dataIndex: 'submitTime',
            key: 'submitTime',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Bài nộp',
            dataIndex: 'files',
            key: 'files',
            render: files => (<Tree
                onSelect={onSelect}
                switcherIcon={<DownOutlined />}
                showLine
                treeData={[
                    {
                        title: "Attachments",
                        key: 'a-1',
                        children: files.map(
                            file => ({
                                key: file.id,
                                title: file.name,
                                url: file.file
                            })
                        )
                    }
                ]}
            >
            </Tree>),
        },
        {
            title: '',
            dataIndex: 'download',
            key: 'load',
            render: (text, record) => <Button loading={downloading} type="primary" onClick={() => downloadItem(record.id, record.username)}>Tải về</Button>,
        },
    ];

    const data = studentAssignments.length > 0 ? studentAssignments.map((studentAss, index) => ({
        id: studentAss.id,
        stt: index + 1,
        key: studentAss.id,
        name: studentAss.student.user_profile.fullname,
        date: studentAss.modified_date,
        submitTime: studentAss.submit_time,
        files: studentAss.student_assignment_files,
        username: studentAss.student.username
    })) : []

    return (
        <section className="section-5 page-2 course-lecture">
            {
                <div>
                    <div className="exam-list--title">
                        <Skeleton loading={loading} active>
                            <h3 className="text--main">
                                {assignmentDetail.name}
                            </h3>
                        </Skeleton>
                    </div>
                    <Skeleton loading={loading} active paragraph={{ rows: 8 }}>
                        <p className="text--sub__bigger2">{parseHtml(assignmentDetail.info)}</p>

                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Mô tả bài assignment" key="1">
                                <Descriptions
                                    title="Thông tin bài assignment" className="mb-5"
                                    bordered layout="vertical"
                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                    <Descriptions.Item label="Số lần nộp tối đa">
                                        {assignmentDetail.max_submit_time ? assignmentDetail.max_submit_time : "Không giới hạn"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Điểm">{assignmentDetail.max_score}</Descriptions.Item>
                                    <Descriptions.Item label="Ngày bắt đầu">
                                        {
                                            !isTimeBefore(assignmentDetail.start_date) ?
                                                <Badge status="processing" text={formatDate(assignmentDetail.start_date, Constants.MMM_Do__YY__TIME)} /> :
                                                <Badge status="warning" text={formatDate(assignmentDetail.start_date, Constants.MMM_Do__YY__TIME)} />
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Deadline">
                                        {
                                            !isTimeBefore(assignmentDetail.due_date) ?
                                                <Badge status="processing" text={formatDate(assignmentDetail.due_date, Constants.MMM_Do__YY__TIME)} /> :
                                                <Badge status="error" text={formatDate(assignmentDetail.due_date, Constants.MMM_Do__YY__TIME)} />
                                        }
                                    </Descriptions.Item>
                                    {
                                        assignmentDetail.assignment_files ?
                                            <Descriptions.Item label="File đính kèm">
                                                <Tree
                                                    onSelect={onSelect}
                                                    switcherIcon={<DownOutlined />}
                                                    defaultExpandedKeys={['a-1']}
                                                    showLine
                                                    treeData={[
                                                        {
                                                            title: "Attachments",
                                                            key: 'a-1',
                                                            children: assignmentDetail.assignment_files.map(
                                                                file => ({
                                                                    key: file.id,
                                                                    title: file.name,
                                                                    url: file.file
                                                                })
                                                            )
                                                        }
                                                    ]}
                                                >
                                                </Tree>
                                            </Descriptions.Item> : null
                                    }
                                </Descriptions>
                            </TabPane>
                            <TabPane tab="Thống kê bài nộp" key="2">
                                <Descriptions
                                    column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                                    title="Danh sách bài nộp" bordered>
                                    <Descriptions.Item label="Số học viên đã xem">
                                        {viewed} / {studentNum}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Số học viên đã nộp bài">
                                        {assignmentDetail.students ?
                                            assignmentDetail.students.length : 0} / {studentNum}
                                    </Descriptions.Item>

                                </Descriptions>
                                <Divider />
                                <Table
                                    scroll={{ y: 360 }}
                                    loading={loading}
                                    bordered
                                    columns={columns}
                                    dataSource={data}
                                />
                                <div className="text-center">
                                    <Button onClick={downloadAllItem} type="primary">Tải về toàn bộ bài nộp</Button>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Skeleton>
                </div>
            }
        </section >
    )
}

export default AssignmentTeacher
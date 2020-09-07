import React, { useState } from 'react'
import { Menu, Table, Space, Avatar, Button, Modal, message, InputNumber, Tag } from 'antd'
import Constants from '../../constants'
import { formatDate } from '../../utils/text.utils'
import { updateStudentAssignmentGrade } from '../../api/grades.services'


const { SubMenu } = Menu

const AssignmentGrades = ({ assignments, token }) => {

    const [editAssignment, setEditAssignment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editScore, setEditScore] = useState(null)
    const [assignmentId, setAssignmentId] = useState(null)


    const triggerModal = (assignment, assignmentId) => {
        setEditAssignment(assignment)
        setShowModal(true)
        setAssignmentId(assignmentId)
    }

    const modalClose = () => {
        setShowModal(false)
        setEditAssignment(null)
        setEditScore(null)
    }

    const assColumns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (name, record) => <Space><Avatar src={record.avatar} /><span>{name}</span></Space>
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: name => <span>{name}</span>
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
    ]

    const AssignmentTable = ({ assignments, assignmentId, assignmentDetail }) => {
        const assignmentData = assignments.map((assignment, index) => ({
            stt: index + 1,
            username: assignment.student.username,
            avatar: assignment.student.user_profile.avatar,
            fullname: assignment.student.user_profile.fullname,
            date: assignment.modified_date,
            result: assignment.score,
            mandatory: assignmentDetail.mandatory,
            passScore: assignmentDetail.pass_score,
            isPass: assignment.score >= assignmentDetail.pass_score,
            assignment,
            assignmentId
        }))

        return (
            < Table
                dataSource={assignmentData}
                columns={assColumns}
            />
        )
    }

    const updateGrade = async () => {
        setLoading(true)
        const data = { token, score: editScore, studentAssignmentId: editAssignment.id, assignmentId }
        try {
            const result = await updateStudentAssignmentGrade(data)
            message.success("Cập nhật thành công", 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    return (
        <Menu
            style={
                { borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0' }
            }
            mode="inline" width="100%">
            {
                Object.keys(assignments).map((key, index) =>
                    <SubMenu key={key} title={<div>
                        {index + 1 + '. ' + key} - <small>{assignments[key][0].percentage}%</small>
                    </div>}>
                        <AssignmentTable
                            assignmentDetail={assignments[key][0]}
                            assignments={assignments[key][1]}
                            key={key}
                            assignmentId={assignments[key][0].id} />
                    </SubMenu>
                )

            }

            <Modal
                title="Nhập điểm"
                visible={showModal}
                onCancel={modalClose}
                footer={[
                    <Button key={1} type="danger" onClick={modalClose}>
                        Hủy
                    </Button>,
                ]}
                style={{ background: 'white', paddingBottom: '0', textAlign: 'center' }}>
                <h3 className="text-center mb-5">Nhập điểm cho học viên : {editAssignment ? editAssignment.student.user_profile.fullname : null}</h3>
                <Space>
                    <InputNumber value={editScore} onChange={(e) => setEditScore(e)} />
                    <Button type="primary" loading={loading} onClick={() => updateGrade()}>Cập nhật</Button>
                </Space>
            </Modal>
        </Menu>

    )
}

export default AssignmentGrades
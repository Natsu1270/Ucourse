import React, { useState } from 'react'
import { Button, Space, Table, Row, Col, Avatar, Tag, message } from 'antd'
import { CSVLink } from 'react-csv'
import { SwapOutlined, EditOutlined, } from '@ant-design/icons'

import { updateMultiStudentCourseHomeGrade, updateStudentCourseHomeGrade } from '../../../api/grades.services'
import { renderFinalStatus } from '../course-home.utils'
import { renderCertificate } from '../../Certificate/certificate.utils'



const FinalGradesTable = (
    { loadingData, exams, totalGrade, assignments, token, setEditFinal, userCourses, setShowModal, students, studentCourseHomes }) => {

    const [loading, setLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const normalizeUserCourses = () => {
        const res = {}
        if (userCourses && userCourses.length) {
            userCourses.forEach(item => {
                res[item.user.id] = item.received_certificate
            })
        }
        return res
    }

    const updateStudentFinalGrade = async (grade, isQualified, id, studentId) => {
        setLoading(true)
        const data = { token, grade, isQualified, studentCourseHomeId: id, studentId }
        try {
            const result = await updateStudentCourseHomeGrade(data)
            message.success("Cập nhật thành công", 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    const autoAll = async () => {
        setLoading(true)
        try {
            const { data } = await updateMultiStudentCourseHomeGrade({ token, selectedRows })
            message("Lấy điểm tự động thành công: ", 1.5, window.location.reload())
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
            setLoading(false)
        }
    }
    const finalColumns = [
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
            title: 'Điểm tính',
            dataIndex: 'sumGrade',
            key: 'sumGrade',
            render: (sumGrade, record) => <Row gutter={16}>
                <Col><span className="text-black b-500">{sumGrade}</span></Col>
            </Row>
        },

        {
            title: 'Điểm tự động (thang 10)',
            dataIndex: 'result',
            key: 'result',
            render: (result, record) => <Row gutter={16}>
                <Col><span className="text-black b-500">{result}</span></Col>
                <Col>{record.isQualified ? <Tag color="#63ace5">Đạt</Tag> : <Tag color="#f50">Không đạt</Tag>}</Col>
            </Row>
        },

        // {
        //     title: 'Tình trạng',
        //     dataIndex: 'isQualified',
        //     key: 'isQualified',
        //     render: 
        // },

        {
            title: 'Điểm tổng kết',
            dataIndex: 'finalResult',
            key: 'finalResult',
            render: finalResult => <span>{
                finalResult || finalResult == 0 ? finalResult : <Tag color="magenta">Chưa tổng kết</Tag>
            }
            </span>
        },

        {
            title: 'Kết quả',
            dataIndex: 'status',
            key: 'status',
            render: status => <span>{
                renderFinalStatus(status)
            }
            </span>
        },

        {
            title: 'Chứng chỉ',
            dataIndex: 'receivedCertificate',
            key: 'receivedCertificate',
            render: receivedCertificate => <span>{
                receivedCertificate ? 'Đã cấp' : 'Chưa cấp'
            }
            </span>
        },

        {
            title: 'Tổng kết điểm',
            dataIndex: 'action',
            key: 'action',
            render: (action, record) => (<Space>
                <Button
                    disabled={record.receivedCertificate}
                    loading={loading}
                    onClick={
                        () => updateStudentFinalGrade(record.result, record.isQualified, record.studentCourseHome.id, record.studentId)
                    }
                >
                    <SwapOutlined /> Tự động
                </Button>
                <Button loading={loading}
                    disabled={record.receivedCertificate}
                    onClick={() => {
                        setShowModal(true)
                        setEditFinal(record.studentCourseHome.id)
                    }} type="primary">
                    <EditOutlined /> Nhập
                </Button>
            </Space>)
        },
    ]

    const csvData = []

    const normalizeData = (dataset) => {
        const result = {}
        dataset.forEach(item => {
            result[item.student.id] = item
        })
        return result
    }

    const finalData = students.map((student, index) => {
        let finalResult = 0
        let qualified = true
        Object.keys(exams).forEach(key => {
            const xExams = exams[key][1]
            const examDetail = exams[key][0]
            const studentExams = normalizeData(xExams)
            const studentExamDetail = studentExams[student.id]

            if (examDetail && studentExamDetail) {
                if (examDetail.mandatory) {
                    if (!studentExamDetail.is_pass) {
                        qualified = false
                    }
                    if (studentExamDetail.final_result != undefined) {
                        finalResult += studentExamDetail.final_result * examDetail.percentage / 100
                    }
                }
            }

        })
        Object.keys(assignments).forEach(key => {
            const xAss = assignments[key][1]
            const assDetail = assignments[key][0]
            const studentAsses = normalizeData(xAss)
            const studentAssDetail = studentAsses[student.id]

            if (assDetail && studentAssDetail) {
                if (assDetail.mandatory) {
                    if (studentAssDetail.score < assDetail.pass_score) {
                        qualified = false
                    }
                    finalResult += studentAssDetail.score * assDetail.percentage / 100
                }
            }
        })

        const normalizeTenGrade = finalResult * 10 / totalGrade

        const studentCourseHome = studentCourseHomes.find(item => item.student == student.id) || {}
        const userCourse = normalizeUserCourses()

        csvData.push({
            stt: index + 1,
            username: student.username,
            fullname: student.user_profile.fullname,
            autoResult: finalResult,
            finalResult: studentCourseHome.final_score ? studentCourseHome.final_score.toFixed(2) : 'N/A',
            isQualified: qualified ? 'Đạt' : 'Không đạt'
        })

        return {
            stt: index + 1,
            username: student.username,
            avatar: student.user_profile.avatar,
            fullname: student.user_profile.fullname,
            result: normalizeTenGrade.toFixed(2),
            sumGrade: finalResult.toFixed(2),
            finalResult: studentCourseHome.final_score ? studentCourseHome.final_score.toFixed(2) : null,
            studentCourseHome: studentCourseHome,
            key: studentCourseHome.id,
            status: studentCourseHome.status,
            isQualified: qualified && finalResult >= 5,
            studentId: student.id,
            receivedCertificate: userCourse[student.id]
        }
    })

    return (
        <div>

            <Row className="text-center mb-4 mt-3" gutter={16}>
                <Col>
                    <CSVLink data={csvData} filename="DS-DIEM_TK.csv"><Button type="primary">Xuất ra file</Button></CSVLink>
                </Col>
                {
                    selectedRows.length > 0 ?
                        <Col>
                            <Button onClick={autoAll}>
                                <SwapOutlined /> Lấy điểm tự động các hàng đã chọn
                                </Button>
                        </Col>
                        : null
                }
            </Row>
            <Table
                loading={loadingData}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRowKeys(selectedRowKeys)
                        setSelectedRows(selectedRows)
                    },
                    getCheckboxProps: record => ({
                        name: record.username,
                        disabled: record.receivedCertificate
                    })
                }}
                dataSource={finalData}
                columns={finalColumns}
            />
        </div>

    )
}

export default FinalGradesTable;
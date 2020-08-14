import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getExamStart, getStudentExamsStart } from '../../redux/Exam/exam.actions'
import { createStructuredSelector } from 'reselect'

import {
    studentExamsSelector,
    isProcessingSelector, examDetailSelector
} from '../../redux/Exam/exam.selects'
import {
    Skeleton, Button, Drawer, Empty, List,
    Space, message, Row, Col, Modal, Form,
    Input, Select, Switch,
    InputNumber
} from 'antd'
import ExamDetail from "./exam-detail.component";
import ExamHistoryTable from "./exam-history-table.component";
import { isTimeBefore, formatDate, secondToTime, parseHtml } from '../../utils/text.utils'
import { isRoleTeacherOrTA } from '../../utils/account.utils'
import Constants from '../../constants'

import { SettingTwoTone, DeleteTwoTone, PlusCircleOutlined, PlusOutlined, MinusCircleTwoTone } from '@ant-design/icons'
import { deleteQuestion, createQuestion } from '../../api/question.services'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const { Option } = Select;

const PrivateExamList = ({ userRole, token }) => {

    const { exam_id } = useParams()
    const dispatch = useDispatch()

    const [showExam, setShowExam] = useState(false)
    const [expired, setExpired] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [questions, setQuestions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState('')
    const [editingExam, setEditingExam] = useState({})

    const { studentExams, examDetail, isProcessing } = useSelector(createStructuredSelector({
        studentExams: studentExamsSelector,
        isProcessing: isProcessingSelector,
        examDetail: examDetailSelector
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getStudentExamsStart(
            { token, exam_id: parseInt(exam_id) }
        ))
        dispatch(getExamStart({ token, exam_id }))
    }, [dispatch])


    useEffect(() => {
        if (!isProcessing && examDetail.id !== undefined) {
            setExpired(isTimeBefore(examDetail.expired_date))
            setQuestions(examDetail.questions)
        }
    }, [isProcessing, examDetail])

    const delQuestion = async id => {
        const data = { token, id }
        setProcessing(true)
        try {
            const result = await deleteQuestion(data)
            const updateQuestions = questions.filter(q => q.id !== id)
            setQuestions(updateQuestions)
            message.success("Xóa câu hỏi thành công")
        } catch (err) {
            message.error(err.message)
        }
        setProcessing(false)
    }

    const onFinish = async values => {
        setProcessing(true)
        const choices = values.choices
        const data = {
            name: values.name, difficult_level: values.difficulity,
            score: values.score, question_type: values.question_type,
            content, choices, token, exam: examDetail.id
        }
        try {
            const result = await createQuestion(data)
            questions.push(result.data.data)
            setQuestions(questions)
            message.success("Tạo câu hỏi thành công")
        } catch (err) {
            message.error(err.message)
        }
        setProcessing(false)
    }

    const triggerEdit = item => {
        setEditingExam(item)
        setContent(item.content)
        setShowModal(true)
    }

    return (
        <section className="section-5 page-2 exam-list">
            <div className="exam-list--title">
                {
                    <Skeleton loading={isProcessing} active>
                        <h3 className="text--main">
                            {examDetail.name}
                        </h3>
                    </Skeleton>
                }
            </div>
            <div className="text-center">
                {
                    expired ?
                        <p className="text--sub__bigger text-red">
                            Bài kiểm tra đã kết thúc vào: {formatDate(examDetail.expired_date, Constants.MMM_Do__YY__TIME)}</p> :
                        null
                }
                <p className="text--sub__bigger">Thời gian làm bài: {secondToTime(examDetail.duration)}</p>
                <p className="text--sub__bigger">Số lần làm bài cho phép: {examDetail.max_try}</p>
                <p className="text--sub__bigger">Hình thức chấm điểm: {
                    examDetail.get_result_type === "best" ? "Lấy kết quả cao nhất" :
                        examDetail.get_result_type === "last" ? "Lấy kết quả cuối cùng" : "Lấy kết quả trung bình"
                }</p>

                <Skeleton loading={isProcessing} active>
                    {expired || isRoleTeacherOrTA(userRole.code) ? null : <Button type="primary" onClick={() => setShowExam(true)}>Làm bài</Button>}
                </Skeleton>
            </div>
            {
                isRoleTeacherOrTA(userRole.code) ?
                    <Skeleton loading={isProcessing || processing} active>
                        <List
                            header={
                                <Row>
                                    <Col span={21}>
                                        <h1 className="theme-color">Quản lý câu hỏi</h1>
                                    </Col>
                                    <Col span={3}>
                                        <Button type="primary" onClick={() => setShowModal(true)}>
                                            <PlusCircleOutlined /> Thêm câu hỏi
                                        </Button>
                                    </Col>
                                </Row>

                            }
                            size="large"
                            bordered={true}
                            // pagination={{
                            //     onChange: page => {
                            //         console.log(page);
                            //     },
                            //     pageSize: 5,
                            // }}
                            dataSource={questions}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <Space style={{ cursor: 'pointer' }} onClick={() => triggerEdit(item)}>
                                            <SettingTwoTone style={{ fontSize: '2rem' }} />
                                            Sửa
                                        </Space>,
                                        <Space style={{ cursor: 'pointer' }} onClick={() => delQuestion(item.id)}>
                                            <DeleteTwoTone style={{ fontSize: '2rem' }} twoToneColor="red" />
                                                Xóa
                                        </Space>
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={<p style={{ fontSize: '1.8rem', fontWeight: '500' }}>{item.name}</p>}
                                        description={parseHtml(item.content)}
                                    />
                                </List.Item>
                            )}
                        />
                    </Skeleton>
                    : <Skeleton loading={isProcessing} active>

                        <div className="exam-list--items">
                            <h2 className="exam-list--items__title theme-color mb-5">
                                Lịch sử làm bài
                            </h2>
                            {studentExams.length ?
                                <ExamHistoryTable exams={studentExams} />
                                : <Empty description="Không có lịch sử làm bài" />}
                        </div>
                    </Skeleton>
            }

            <Drawer
                destroyOnClose={true}
                className="exam_drawer"
                title={examDetail.name}
                placement="right"
                onClose={() => setShowExam(false)}
                visible={showExam}
                footer={
                    <div>
                        <Button onClick={() => setShowExam(false)} type="danger">
                            Đóng
                        </Button>
                    </div>
                }
            >
                <ExamDetail exam={examDetail} token={token} />
            </Drawer>

            {
                isRoleTeacherOrTA(userRole.code) ?
                    <Modal
                        destroyOnClose={true}
                        width={920}
                        style={{ paddingBottom: "0px" }}
                        className="bg-white"
                        visible={showModal}
                        title="Quản lý câu hỏi"
                        onCancel={() => setShowModal(false)}
                        footer={[
                            <Button type="primary" danger key="back" onClick={() => setShowModal(false)}>
                                Hủy
                            </Button>,]}>
                        <Form
                            layout="vertical"
                            name="topic_form"
                            onFinish={onFinish}
                            initialValues={{
                                name: editingExam.name, content, score: editingExam.score,
                                question_type: editingExam.question_type, difficulity: editingExam.difficult_level,
                                choices: examDetail.choices
                            }}
                        >
                            <Form.Item
                                name="name"
                                label="Tên câu hỏi"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên câu hỏi',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên câu hỏi" />
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                name="score"
                                label="Điểm câu hỏi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập điểm câu hỏi',
                                    },
                                ]}
                            >
                                <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập điểm câu hỏi" />
                            </Form.Item>
                            <Form.Item
                                name="difficulity"
                                label="Chọn độ khó"
                                hasFeedback
                                rules={[{ required: true, message: 'Chọn độ khó câu hỏi' }]}
                            >
                                <Select placeholder="Hãy chọn độ khó của câu hỏi">
                                    <Option value="e">Dễ</Option>
                                    <Option value="m">Trung bình</Option>
                                    <Option value="h">Khó</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="question_type"
                                label="Chọn loại câu hỏi"
                                hasFeedback
                                rules={[{ required: true, message: 'Chọn loại câu hỏi' }]}
                            >
                                <Select placeholder="Chọn loại câu hỏi">
                                    <Option value="mc">Chọn một</Option>
                                    <Option value="cb">Chọn nhiều</Option>
                                    <Option value="tx">Câu hỏi văn bản</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="content"
                                label="Nội dung câu hỏi"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung câu hỏi', },]}
                            >
                                <CKEditor
                                    key="editor"
                                    editor={ClassicEditor}
                                    data={content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data)
                                    }}
                                >
                                </CKEditor>
                            </Form.Item>
                            <Form.List name="choices">
                                {(fields, { add, remove }) => {
                                    if (editingExam && editingExam.choices) {
                                        fields = editingExam.choices
                                    }
                                    return (
                                        <div>
                                            {fields.map(field => (
                                                <div
                                                    key={field.key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align="middle">
                                                    <Form.Item
                                                        initialValue={
                                                            parseHtml(field.content)
                                                        }
                                                        hasFeedback
                                                        style={{ width: '80%' }}
                                                        wrapperCol={{ span: 23 }}
                                                        label="Nội dung câu trả lời"
                                                        {...field}
                                                        name={[field.name, 'content']}
                                                        fieldKey={[field.fieldKey, 'content' + field.key]}
                                                        rules={[{ required: true, message: 'Nhập nội dung câu trả lời' }]}
                                                    >
                                                        <Input placeholder="Nội dung" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name={[field.name, 'isAnswer']}
                                                        fieldKey={[field.fieldKey, 'isAnswer' + field.key]}
                                                        label="Là đáp án"
                                                        valuePropName="checked"
                                                        className="mr-5">
                                                        <Switch />
                                                    </Form.Item>

                                                    <MinusCircleTwoTone
                                                        style={{ fontSize: '2rem' }}
                                                        twoToneColor="red"
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                </div>
                                            ))}

                                            <Form.Item wrapperCol={{ span: 6 }}>
                                                <Button
                                                    type="primary"
                                                    onClick={() => { add(); }}
                                                    block
                                                >
                                                    <PlusOutlined /> Thêm đáp án trả lời
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>
                            <Form.Item className="text-center">
                                <Button type="primary" htmlType="submit" loading={processing}>
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </Form>

                    </Modal> : null
            }

        </section>
    )
}

export default PrivateExamList
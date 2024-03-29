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
    Input, Select, Switch, Popconfirm,
    InputNumber, Table, Tag
} from 'antd'
import ExamDetail from "./exam-detail.component";
import ExamReview from './exam-review.component';
import ExamHistoryTable from "./exam-history-table.component";
import { isTimeBefore, formatDate, secondToTime, parseHtml } from '../../utils/text.utils'
import { isRoleTeacherOrTA } from '../../utils/account.utils'
import Constants from '../../constants'

import { SettingTwoTone, DeleteTwoTone, PlusCircleOutlined, PlusOutlined, MinusCircleTwoTone, AppstoreAddOutlined } from '@ant-design/icons'
import { deleteQuestion, createQuestion, editQuestion, getQuestionsRemainByTeacher, addQuestionToExam } from '../../api/question.services'
import { initExamAPI } from '../../api/exam.services'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import moment from 'moment'
import { columns } from '../CourseHome/Questions/questions.utils'

const { Search } = Input

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const { Option } = Select;

const PrivateExamList = ({ userRole, token, courseHomeDetail }) => {

    const { exam_id } = useParams()
    const dispatch = useDispatch()

    const [showExam, setShowExam] = useState(false)
    const [expired, setExpired] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [questions, setQuestions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [questionContent, setQuestionContent] = useState('')
    const [editingExam, setEditingExam] = useState({})
    const [oldChoices, setOldChoices] = useState([])
    const [fromBank, setFromBank] = useState(false)
    const [bankQuestions, setBankQuestions] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [orgQuesitons, setOrgQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [studentExamId, setStudentExam] = useState(null)
    const [reviewId, setReviewId] = useState(null)
    const [randomQuestions, setRandomQuestions] = useState([])


    const { studentExams, examDetail, isProcessing } = useSelector(createStructuredSelector({
        studentExams: studentExamsSelector,
        isProcessing: isProcessingSelector,
        examDetail: examDetailSelector
    }))

    const getQuestions = async () => {
        try {
            const result = await getQuestionsRemainByTeacher(token, exam_id)
            setBankQuestions(result.data.data)
            setOrgQuestions(result.data.data)
        } catch (err) {
            message.error(err.message)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getStudentExamsStart(
            { token, exam_id: parseInt(exam_id) }
        ))
        dispatch(getExamStart({ token, exam_id }))
        getQuestions()
    }, [dispatch])


    useEffect(() => {
        if (!isProcessing && examDetail.id !== undefined) {
            setExpired(isTimeBefore(examDetail.expired_date))
            setQuestions(examDetail.questions)
        }
    }, [isProcessing, examDetail])

    const searchQuestion = (name) => {
        let filterQuesitons = orgQuesitons
        if (name.trim() != "") {
            filterQuesitons = filterQuesitons.filter(q => q.name.toLowerCase().includes(name.toLowerCase()) || q.content.toLowerCase().includes(name.toLowerCase()))
        }
        setBankQuestions(filterQuesitons)
    }

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
        console.log(values)
        setProcessing(true)
        const choices = values.choices
        const data = {
            name: values.name, difficult_level: values.difficulity,
            score: values.score, question_type: values.question_type,
            content: questionContent, choices, token, exam: examDetail.id, id: editingExam.id
        }
        try {
            if (editingExam.id === undefined) {
                const result = await createQuestion(data)
                questions.push(result.data.data)
                setQuestions(questions)
                message.success("Tạo câu hỏi thành công")
            } else {
                const result = await editQuestion(data)
                message.success("Chỉnh sửa câu hỏi thành công", 1.5, () => window.location.reload())
            }
        } catch (err) {
            message.error(err.message)
        }
        setProcessing(false)
        setShowModal(false)
    }

    const triggerEdit = item => {
        setEditingExam(item)
        setQuestionContent(item.content)
        setShowModal(true)
        setOldChoices(item.choices)
    }

    const handleClose = () => {
        setShowModal(false)
        setEditingExam({})
        setQuestionContent('')
        setOldChoices([])
        setFromBank(false)
        setSelectedRowKeys([])
        setSelectedRows([])
    }

    const initExam = async () => {
        setLoading(true)
        try {
            const { data } = await initExamAPI({ courseHomeId: courseHomeDetail.id, examId: exam_id, token })
            if (data.result) {
                setStudentExam(data.studentExamId)
                setRandomQuestions(data.studentExam.questions)
                setShowExam(true)
            } else {
                if (data.errorCode == 1) {
                    message.error('Bạn đã thực hiện tối đa số lần làm bài cho phép')
                } else if (data.errorCode == 2) {
                    message.error('Chưa đến thời gian được phép làm bài')
                } else {
                    message.error('Chưa có câu hỏi cho bài kiểm tra này')
                }
            }
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }
    // const isStart = () => {
    //     if (examDetail) {
    //         return moment(examDetail.start_date).isSameOrBefore(moment(), 'seconds')
    //     }
    //     return true
    // }
    const canDoExam = () => {
        if (expired || isRoleTeacherOrTA(userRole.code)) return null
        if (examDetail.max_try && studentExams.length >= examDetail.max_try) {
            return <Button type="dashed" onClick={() => message.info('Qúa số lần làm cho phép')} >Làm bài</Button>
        }
        if (examDetail.start_date && moment(examDetail.start_date).isAfter(moment(), 'seconds')) {
            return <Tag color="#f50">Chưa đến thời gian cho phép làm bài</Tag>
        }
        return (
            <Popconfirm
                title="Bạn có làm bài kiểm tra ngay bây giờ ?"
                onConfirm={initExam}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Button loading={loading} type="primary">Làm bài</Button>
            </Popconfirm>
        )

    }

    const examResult = () => {
        if (examDetail.get_result_type !== undefined) {
            const examType = examDetail.get_result_type
            const resultList = studentExams.map(exam => exam.result)
            if (resultList.length === 0) return "Chưa có lần làm bài nào"
            if (examType === Constants.EXAM_GET_BEST) {
                return Math.max(...resultList) + '/' + examDetail.max_score
            } else if (examType === Constants.EXAM_GET_AVERAGE) {
                const sum = resultList.reduce((x, y) => x + y, 0)
                return sum / resultList.length + '/' + examDetail.max_score
            } else {
                return resultList[0] + '/' + examDetail.max_score
            }
        }
    }

    const questionBankData = bankQuestions.map((question, index) => {

        return {
            stt: index + 1,
            id: question.id,
            name: question.name,
            content: question.content,
            key: question.id
        }
    })

    const addToExam = async () => {
        setLoading(true)
        try {
            await addQuestionToExam({ token, examId: exam_id, rows: selectedRowKeys })
            message.success('Thêm thành công!', 1.5, () => window.location.reload())
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
            setLoading(false)
        }
    }

    const QuestionBankTable = () => {
        return (
            <Table
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRowKeys(selectedRowKeys)
                        setSelectedRows(selectedRows)
                    }
                }}
                dataSource={questionBankData}
                columns={columns}
            />
        )
    }

    const triggerReview = (id) => {
        setReviewId(id)
        setShowExam(true)
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
                            Bài kiểm tra đã kết thúc vào: {formatDate(examDetail.expired_date, Constants.MMM_Do__YY__TIME_SS)}</p> :
                        null
                }
                <p className="text--sub__bigger">Thời gian làm bài: {secondToTime(examDetail.duration)}</p>
                <p className="text--sub__bigger">Số lần làm bài cho phép: {examDetail.max_try ? examDetail.max_try : 'Không giới hạn'}</p>
                <p className="text--sub__bigger">Phần trăm điểm (dùng để tổng kết): {examDetail.percentage}%</p>
                <p className="text--sub__bigger">Phần trăm điểm tối thiếu phải đạt (được tính để tổng kết): {examDetail.pass_percentage}%</p>
                <p className="text--sub__bigger">Điểm tối đa: {examDetail.max_score}</p>
                <p className="text--sub__bigger">Hình thức chấm điểm: {
                    examDetail.get_result_type === "best" ? "Lấy kết quả cao nhất" :
                        examDetail.get_result_type === "last" ? "Lấy kết quả cuối cùng" : "Lấy kết quả trung bình"
                }</p>

                <Skeleton loading={isProcessing} active>
                    <p className="text--sub__bigger">
                        Kết quả làm bài: {examResult()}
                    </p>
                </Skeleton>

                <Skeleton loading={isProcessing} active>
                    {
                        canDoExam()
                    }
                </Skeleton>
            </div>
            {
                isRoleTeacherOrTA(userRole.code) ?
                    <Skeleton loading={isProcessing || processing} active>
                        <List
                            header={
                                <Row justify="space-between">
                                    <Col>
                                        <h1 className="theme-color">Quản lý câu hỏi</h1>
                                    </Col>
                                    <Col>
                                        <Space>
                                            <Button type="primary" onClick={() => setShowModal(true)}>
                                                <PlusCircleOutlined /> Thêm câu hỏi
                                        </Button>
                                            <Button type="primary" onClick={() => {
                                                setFromBank(true)
                                                setShowModal(true)
                                            }}>
                                                <AppstoreAddOutlined /> Thêm câu hỏi từ ngân hàng câu hỏi
                                        </Button>
                                        </Space>
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
                                        <Popconfirm
                                            title="Bạn có chắc muốn xóa câu hỏi này?"
                                            onConfirm={() => delQuestion(item.id)}
                                            okText="Xác nhận"
                                            cancelText="Hủy"
                                        >
                                            <Space style={{ cursor: 'pointer' }} >
                                                <DeleteTwoTone style={{ fontSize: '2rem' }} twoToneColor="red" />
                                                Xóa
                                            </Space>
                                        </Popconfirm>

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
                                <ExamHistoryTable examDetail={examDetail} exams={studentExams} setReviewId={triggerReview} />
                                : <Empty description="Không có lịch sử làm bài" />}
                        </div>
                    </Skeleton>
            }

            <Drawer
                destroyOnClose={true}
                className="exam_drawer"
                title={examDetail.name}
                placement="right"
                onClose={() => {

                    setShowExam(false)
                    setReviewId(null)
                }}
                visible={showExam}
                footer={
                    <div>
                        <Button onClick={() => {
                            if (!reviewId) {
                                window.location.reload()
                            }
                            setShowExam(false)
                            setReviewId(null)
                        }
                        } type="danger">
                            Đóng
                        </Button>
                    </div>
                }
            >
                {
                    reviewId ?
                        <ExamReview exam={examDetail} studentExamId={reviewId} token={token} /> :
                        <ExamDetail
                            randomQuestions={randomQuestions}
                            exam={examDetail}
                            token={token}
                            courseHomeId={courseHomeDetail.id}
                            studentExamId={studentExamId} />
                }
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
                        onCancel={handleClose}
                        footer={[
                            <Button type="primary" danger key="back" onClick={handleClose}>
                                Hủy
                            </Button>,]}>
                        {
                            fromBank ?
                                <div style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                                    <Row justify="center" gutter={16} className="mb-3" align="middle">
                                        <Col>
                                            {
                                                selectedRows.length ? <Button loading={loading} onClick={addToExam} type="primary">
                                                    Thêm vào bài kiểm tra
                                            </Button> : 'Click vào checkbox để thêm'
                                            }
                                        </Col>

                                        <Col>
                                            <Search
                                                onChange={e => searchQuestion(e.target.value)}
                                                size="large" enterButton onSearch={value => searchQuestion(value)} placeholder="Tìm theo tên" />
                                        </Col>
                                    </Row>
                                    <QuestionBankTable />
                                </div> :
                                <Form
                                    layout="vertical"
                                    name="topic_form"
                                    onFinish={onFinish}
                                    initialValues={{
                                        name: editingExam.name, questionContent, score: editingExam.score,
                                        question_type: editingExam.question_type, difficulity: editingExam.difficult_level,
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
                                            <Option value="mc">Chọn một đáp án</Option>
                                            <Option value="cb">Chọn nhiều đáp án</Option>
                                            {/* <Option value="tx">Câu hỏi văn bản</Option> */}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="questionContent"
                                        label="Nội dung câu hỏi"
                                        rules={[{ required: true, message: 'Vui lòng nhập nội dung câu hỏi', },]}
                                    >
                                        <CKEditor
                                            key="editor"
                                            editor={ClassicEditor}
                                            data={questionContent}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setQuestionContent(data)
                                            }}
                                        >
                                        </CKEditor>
                                    </Form.Item>
                                    <Form.List name="choices">
                                        {(fields, { add, remove }) => {
                                            if (oldChoices.length > 0) {
                                                oldChoices.forEach((choice, index) => {
                                                    let isAnswer = false;
                                                    if (editingExam.answers.includes(choice.id)) {
                                                        isAnswer = true
                                                    }
                                                    fields.push({
                                                        name: index,
                                                        key: index,
                                                        isListField: true, fieldKey: index,
                                                        content: choice.content,
                                                        isAnswer,
                                                        id: choice.id
                                                    })
                                                })
                                                setOldChoices([])
                                            }
                                            return (
                                                <div>
                                                    {fields.map(field => (
                                                        <div
                                                            key={field.key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align="middle">
                                                            <Form.Item
                                                                initialValue={parseHtml(field.content)}
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
                                                                initialValue={field.isAnswer !== undefined ? field.isAnswer : false}
                                                                name={[field.name, 'isAnswer']}
                                                                fieldKey={[field.fieldKey, 'isAnswer' + field.key]}
                                                                label="Đáp án đúng"
                                                                valuePropName="checked"
                                                                className="mr-5">
                                                                <Switch />
                                                            </Form.Item>
                                                            <Form.Item
                                                                hidden={true}
                                                                initialValue={field.id}
                                                                label="Nội dung câu trả lời"
                                                                {...field}
                                                                name={[field.name, 'id']}
                                                                fieldKey={[field.fieldKey, 'id' + field.key]}
                                                            >
                                                                <Input />
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

                        }
                    </Modal> : null
            }

        </section>
    )
}

export default PrivateExamList
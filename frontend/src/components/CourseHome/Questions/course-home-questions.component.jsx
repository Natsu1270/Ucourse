import React, { useState, useEffect } from 'react'
import {
    message, Tabs, Table, Input, Row, Col, List, Typography,
    Skeleton, Button, Form, Modal, Select, Switch, InputNumber
} from 'antd'
import { getQuestionsByTeacher, deleteQuestion, createQuestion, editQuestion } from '../../../api/question.services'
import { parseHtml } from '../../../utils/text.utils'
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleTwoTone, } from '@ant-design/icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const { Option } = Select;
const { Search } = Input
const { Paragraph } = Typography

const QuestionBank = ({ token }) => {

    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState({})
    const [myQuestions, setMyQuestions] = useState([])
    const [orgQuesitons, setOrgQuestions] = useState([])
    const [questionContent, setQuestionContent] = useState('')
    const [oldChoices, setOldChoices] = useState([])

    const getQuestions = async () => {
        setLoading(true)
        try {
            const result = await getQuestionsByTeacher(token)
            setMyQuestions(result.data.data)
            setOrgQuestions(result.data.data)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    const onFinish = async values => {
        setLoading(true)
        const choices = values.choices
        const data = {
            name: values.name, difficult_level: values.difficulity,
            score: values.score, question_type: values.question_type,
            content: questionContent, choices, token
        }
        try {
            if (editingQuestion.id === undefined) {
                const result = await createQuestion(data)
                myQuestions.push(result.data.data)
                setMyQuestions(myQuestions)
                message.success("Tạo câu hỏi thành công")
            } else {
                const result = await editQuestion({ ...data, id: editingQuestion.id })
                message.success("Chỉnh sửa câu hỏi thành công", 1.5, () => window.location.reload())
            }
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
        setShowModal(false)
    }

    const searchQuestion = (name) => {
        let filterQuesitons = orgQuesitons
        if (name.trim() != "") {
            filterQuesitons = filterQuesitons.filter(q => q.name.includes(name))
        }
        setMyQuestions(filterQuesitons)
    }

    const deleteQ = async (id) => {
        setLoading(true)
        try {
            await deleteQuestion({ token, id })
            message.success('Xóa câu hỏi thành công')
            const updateList = myQuestions.filter(q => q.id != id)
            setMyQuestions(updateList)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    const openEditModal = (item) => {
        setShowModal(true)
        setEditingQuestion(item)
        setQuestionContent(item.content)
        setOldChoices(item.choices)
    }

    const handleClose = () => {
        setShowModal(false)
        setEditingQuestion({})
        setQuestionContent('')
        setOldChoices([])
    }

    useEffect(() => {
        if (token) {
            getQuestions()
        }
    }, [token])

    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Ngân hàng câu hỏi
            </h3>

            <Row justify="center" gutter={16} align="middle">
                <Col><p className="text--sub__bigger2 text-black">Tìm kiếm</p></Col>
                <Col span={12}>
                    <Search
                        onChange={e => searchQuestion(e.target.value)}
                        size="large" enterButton onSearch={value => searchQuestion(value)} placeholder="Tìm theo tên" />
                </Col>
            </Row>

            <Row justify="center" className="mt-5">
                <Col>
                    <Button type="primary" onClick={() => setShowModal(true)}>
                        <AppstoreAddOutlined />Thêm câu hỏi
                    </Button>
                </Col>
            </Row>

            <Row justify="center" className="mt-4">
                <Col span={24}>
                    <List
                        header="Danh sách câu hỏi của tôi"
                        bordered
                        loading={loading}
                        dataSource={myQuestions}
                        renderItem={item => (
                            <List.Item
                                actions={
                                    [
                                        <Button loading={loading}
                                            type="primary"
                                            onClick={() => openEditModal(item)}><EditOutlined /> Sửa</Button>,
                                        <Button loading={loading} danger type="primary" onClick={() => deleteQ(item.id)}>
                                            <DeleteOutlined /> Xóa
                                        </Button>
                                    ]
                                }
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={<p className="text--sub__bigger text-black">{item.name}</p>}
                                    // description={<p className="text--sub__bigger text-black">
                                    //     <Paragraph ellipsis >{parseHtml(item.content)}</Paragraph>
                                    // </p>}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>


            <Modal
                destroyOnClose={true}
                width={920}
                style={{ paddingBottom: "0px" }}
                bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
                className="bg-white"
                visible={showModal}
                title="Quản lý câu hỏi"
                onCancel={handleClose}
                footer={[
                    <Button type="primary" danger key="back" onClick={handleClose}>
                        Hủy
                    </Button>,]}>
                <Form
                    layout="vertical"
                    name="topic_form"
                    onFinish={onFinish}
                    initialValues={{
                        name: editingQuestion.name, questionContent, score: editingQuestion.score,
                        question_type: editingQuestion.question_type, difficulity: editingQuestion.difficult_level,
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
                            <Option value="tx">Câu hỏi văn bản</Option>
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
                                    if (editingQuestion.answers.includes(choice.id)) {
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
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Xác nhận
                                </Button>
                    </Form.Item>
                </Form>

            </Modal>

        </section>
    )
};

export default QuestionBank
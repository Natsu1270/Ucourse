import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Input, Row, Col, List, Skeleton, Button } from 'antd'
import { getQuestionsByTeacher } from '../../../api/question.services'
import { parseHtml } from '../../../utils/text.utils'
import { AppstoreAddOutlined } from '@ant-design/icons'


const { TabPane } = Tabs

const { Search } = Input

const QuestionBank = ({ token }) => {

    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState({})
    const [myQuestions, setMyQuestions] = useState([])

    const getQuestions = async () => {
        setLoading(true)
        try {
            const result = await getQuestionsByTeacher(token)
            setMyQuestions(result.data.data)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    const searchQuestion = () => {

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
                    <Search size="large" enterButton onSearch={searchQuestion} placeholder="Tìm theo tên" />
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
                                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={<p className="text--sub__bigger text-black">{item.name}</p>}
                                        description={<p className="text--sub__bigger text-black">{parseHtml(item.content)}</p>}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>


        </section>
    )
};

export default QuestionBank
import React, { useEffect, useState } from 'react'
import { List, Skeleton, Button, message, Row, Col, Input } from "antd";
import { useHistory, useRouteMatch } from 'react-router-dom'
import { AppstoreAddOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { createForumsAPI } from '../../api/forum.services';

const Forums = ({ forums, isLoading, userRole, courseHome, token }) => {

    const history = useHistory()
    const match = useRouteMatch();

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [forumList, setForums] = useState([])

    useEffect(() => {
        if (forums && forums.length) {
            setForums(forums)
        }
    }, [forums])


    const renderItem = (item) => (
        <div className="dis-flex-between forum-item">
            <span className="b-500 forum-item--title">{item.name}</span>
            <span>{item.thread_count} chủ đề &rarr;</span>
        </div>
    )

    const createForum = async () => {
        if (name.trim() === "") {
            return message.info("Vui lòng nhập tên diễn đàn")
        }
        setLoading(true)
        try {
            const { data } = await createForumsAPI({ token, courseHomeId: courseHome.id, name })
            forumList.push(data.data)
            setForums(forumList)
            message.success('Tạo diễn đàn thành công', 1.5, () => { setShowModal(false) })
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
            setLoading(false)
        }
    }

    return (
        <section className="section-5 page-2 forum">
            <h4 className="text--main forum--title mb-3">
                Diễn đàn thảo luận
            </h4>
            <h3 className="forum--subtitle mb-5">
                Thảo luận, hỗ trợ về các chủ đề trong quá trình học
            </h3>

            {
                userRole ? userRole.code === 'TC' || userRole.code === 'TA' ?
                    (<div className="text-center mt-5 mb-5">
                        <Button type="primary" onClick={() => setShowModal(true)}><AppstoreAddOutlined />Tạo diễn đàn mới</Button>
                    </div>) : null : null
            }

            <div className="forum--content">
                {
                    isLoading ? <Skeleton active paragraph={{ rows: 4 }} /> :
                        <List
                            header={<div className="forum--list-header">Danh sách diễn đàn</div>}
                            className="forum--content__list"
                            size="large"
                            bordered
                            dataSource={forumList}
                            renderItem={
                                item =>
                                    <List.Item
                                        onClick={() => history.push(`${match.url}/${item.id}`)}>
                                        {renderItem(item)}
                                    </List.Item>
                            }
                        />
                }

            </div>
            <Modal
                confirmLoading={loading}
                title="Thêm diễn đàn"
                destroyOnClose
                onCancel={() => setShowModal(false)}
                onOk={createForum}
                visible={showModal}
                style={{ background: '#fff', paddingBottom: '0' }}
            >

                <Row justify="center">

                    <Col>
                        <span className="text--sub__bigger2 mb-3 text-black">Nhập tên diễn đàn</span>
                        <Input value={name} onChange={e => setName(e.target.value)} />
                    </Col>
                </Row>

            </Modal>
        </section>
    )
};

export default Forums
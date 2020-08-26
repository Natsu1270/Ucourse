import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton, message, Row, Col, Timeline, Button, Input, Space, Divider } from "antd";
import VideoPlayer from "../Common/video.component";
import 'plyr/dist/plyr.css'
import FileViewer from 'react-file-viewer';

import { getTopicAssetAPI, createNoteAPI } from '../../api/courseHome.services'
import { BookOutlined, EditOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils/text.utils';
import Constants from '../../constants';

const CourseHomeLecture = ({ token }) => {

    const [loading, setLoading] = useState(false)
    const [lecture, setLecture] = useState({})
    const [notes, setNotes] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [content, setContent] = useState("")

    const { topic, assetId } = useParams();

    const getTopicAsset = async () => {
        setLoading(true)
        try {
            const { data } = await getTopicAssetAPI({ token, id: assetId })
            setLecture(data.data)
            setNotes(data.data.notes)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const createNote = async () => {
        setLoading(true)
        try {
            const { data } = await createNoteAPI({ token, content, topicAsset: assetId })
            message.success("Tạo ghi chú thành công")
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getTopicAsset()
        }
    }, [token])

    //const lectureTopics = topics ? topics.find(t => t.id === parseInt(topic)) : null
    //const lecture = lectureTopics ? lectureTopics.topic_assets.find(file => file.id === parseInt(assetId)) : {}


    return (
        <section className="section-5 page-2 course-lecture">
            {
                <Skeleton loading={loading} active avatar paragraph={{ rows: 4 }}>
                    <div>
                        <div className="exam-list--title">
                            {
                                <Skeleton loading={loading} active>
                                    <h3 className="text--main">
                                        {lecture.name}
                                    </h3>
                                </Skeleton>
                            }
                        </div>
                        <Row gutter={36}>
                            <Col span={16}>
                                <div className="page-card">
                                    {
                                        lecture.file_type === "video" ? (<div className="course-lecture--video">
                                            <VideoPlayer videoUrl={lecture.file} videoId={lecture.id} />
                                        </div>) : <FileViewer filePath={lecture.file} fileType={lecture.file_type} />
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="page-card">
                                    <Row justify="space-between">
                                        <Col><h3 className="text--main__smaller theme-color"><BookOutlined /> Ghi chú</h3></Col>
                                        <Col>
                                            <Button onClick={() => setShowInput(!showInput)} danger={showInput} type="primary">
                                                {
                                                    !showInput ? <Space><EditOutlined /> Thêm</Space> : "Hủy"
                                                }
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row className="mt-3" hidden={!showInput} justify="space-between">
                                        <Col span={20}>
                                            <Input value={content} onChange={e => setContent(e.target.value)} />
                                        </Col>
                                        <Col><Button onClick={createNote} type="primary">OK</Button></Col>
                                    </Row>
                                    <Timeline className="mt-5">
                                        {
                                            notes.map(note => (
                                                <Timeline.Item key={note.id}>
                                                    <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }}>
                                                        <h4>{note.content}</h4>
                                                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>{formatDate(note.created_date, Constants.MMM_Do__YY__TIME)}</p>
                                                    </Skeleton>
                                                </Timeline.Item>
                                            ))
                                        }
                                    </Timeline>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </Skeleton>
            }

        </section>
    )
}

export default CourseHomeLecture
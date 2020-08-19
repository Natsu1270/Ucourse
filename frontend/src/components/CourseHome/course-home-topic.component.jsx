import React, { useState, useEffect } from 'react'
import { Avatar, List, Row, Col, Dropdown, Menu, message, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import videoAvatar from '../../assets/file.png';
import documentAvatar from '../../assets/word.png';
import assignmentAvatar from '../../assets/exam.png';
import quizIcon from '../../assets/quiz.png';
import Constants from "../../constants";
import { parseHtml, formatDate, isTimeBefore } from "../../utils/text.utils"
import { BACKEND_HOST } from '../../configs';

import {
    CaretDownOutlined, SettingTwoTone, DeleteOutlined,
    SettingOutlined, BookOutlined, ReadOutlined, ProfileOutlined
} from '@ant-design/icons'
import { deleteTopicAsset, deleteAssigment } from '../../api/courseHome.services';
import { deleteExam } from '../../api/exam.services';

const { Text } = Typography

const CourseHomeTopic = ({
    topic, userRole, handleDelete,
    triggerEdit, token, triggerCreateAsset,
    triggerEditAsset, triggerCreateQuize,
    triggerEditQuize, triggerCreateAssignment
}) => {
    const history = useHistory()
    const [assets, setAssets] = useState([])
    const [quizes, setQuizes] = useState([])
    const [assignments, setAssignments] = useState([])

    // populated topic materials
    useEffect(() => {
        if (topic.topic_assets) {
            const topicAssets = topic.topic_assets.map(
                asset => ({
                    id: asset.id,
                    title: asset.name,
                    icon: asset.icon,
                    info: asset.info,
                    file_type: asset.file_type,
                    content: asset.file
                })
            )
            setAssets(topicAssets)


        }
        if (topic.topic_exams) {
            const topicQuizes = topic.topic_exams.map(
                quiz => ({
                    id: quiz.id,
                    title: quiz.name,
                    info: quiz.info,
                    expired: quiz.expired_date,
                    resultType: quiz.get_result_type,
                    duration: quiz.duration,
                    maxTry: quiz.max_try,
                    startDate: quiz.start_date,
                    passScore: quiz.pass_score
                })
            )
            setQuizes(topicQuizes)
        }
        if (topic.topic_assignments) {
            const topicAssignments = topic.topic_assignments.map(
                ass => ({
                    id: ass.id, name: ass.name, info: ass.info,
                    start_date: ass.start_date, due_date: ass.due_date,
                    max_score: ass.max_score, max_submit_time: ass.max_submit_time
                })
            )
            setAssignments(topicAssignments)
        }
    }, [topic])


    function gotoLecture(assetId, fileUrl, type) {
        if (type === Constants.VIDEO_FILE_TYPE) {
            history.push(`lecture/${topic.id}/${assetId}`)
        } else {
            window.open(BACKEND_HOST + fileUrl, '_blank')
        }
    }

    function gotoExam(exam_id) {
        history.push(`exams/${exam_id}`)
    }

    function gotoAssignment(assignment_id) {
        history.push(`assignment/${assignment_id}`)
    }

    const assetAvatar = (icon, type) => {
        return icon ? icon : type === Constants.VIDEO_FILE_TYPE ? videoAvatar : documentAvatar

    }

    const deleteAsset = async (id, type) => {
        const data = { token, id }
        try {
            if (type === "asset") {
                const result = await deleteTopicAsset(data)
                const updateAssets = assets.filter(asset => asset.id != id)
                setAssets(updateAssets)
            } else if (type === "assignment") {
                const result = await deleteAssigment(data)
                const updateAssignments = assignments.filter(ass => ass.id != id)
                setAssignments(updateAssignments)
            } else {
                const result = await deleteExam(data)
                const updateExams = quizes.filter(q => q.id != id)
                setQuizes(updateExams)
            }
            message.success("Xoá thành công")
        } catch (err) {
            message.error(err.message)
        }
    }

    const editAsset = async (id, type) => {
        const data = { token, id: id }
        try {
            if (type === "asset") {
                const result = await deleteTopicAsset(data)
                const updateAssets = assets.filter(asset => asset.id != id)
                setAssets(updateAssets)
            }
            message.success("Xoá thành công")
        } catch (err) {
            message.error(err.message)
        }
    }

    const addAsset = async () => {
        alert('adding asset')
    }


    const menu = (
        <Menu style={{ fontSize: '2rem' }}>
            <Menu.Item
                danger
                onClick={
                    () => handleDelete(topic.id)
                }
            >
                <DeleteOutlined /> Xóa chủ đề
            </Menu.Item>
            <Menu.Item onClick={() => triggerEdit(topic.id)}>
                <SettingOutlined /> Sửa chủ đề
            </Menu.Item>
            <Menu.Item onClick={() => triggerCreateAsset(topic.id)}>
                <ReadOutlined /> Thêm bài giảng
            </Menu.Item>
            <Menu.Item onClick={() => triggerCreateQuize(topic.id)}>
                <ProfileOutlined /> Thêm bài kiểm tra
            </Menu.Item>
            <Menu.Item onClick={() => triggerCreateAssignment(topic.id, true, null)}>
                <BookOutlined /> Thêm assignment
            </Menu.Item>
        </Menu>
    );



    return (
        <div className="course-topic">
            <Row>
                <Col span={23}>
                    <h3 className="course-topic__header text--main">{topic.name}</h3>
                </Col>
                <Col span={1} className="text-center">
                    {
                        userRole.code ?
                            userRole.code === 'TC' || userRole.code === "TA" ?
                                <Dropdown overlay={menu} placement="topCenter">
                                    <SettingTwoTone style={{ fontSize: "2rem" }} className="down-indict" />
                                </Dropdown> : null
                            : null
                    }
                </Col>
            </Row>

            {topic.info ? <div className="course-topic__info">
                {parseHtml(topic.info)}
            </div> : null}
            <div className="course-topic__content">
                {
                    assets.length > 0 ?
                        <List
                            itemLayout="horizontal"
                            dataSource={assets}
                            renderItem={item => (
                                <List.Item
                                    actions={[userRole.code ?
                                        userRole.code === 'TC' || userRole.code === "TA" ?
                                            <Dropdown overlay={<Menu>
                                                <Menu.Item danger onClick={() => deleteAsset(item.id, "asset")}>
                                                    Xóa bài giảng
                                                </Menu.Item>
                                                <Menu.Item onClick={() => triggerEditAsset(item)}>Sửa bài giảng</Menu.Item>
                                            </Menu>} placement="topCenter">
                                                <CaretDownOutlined className="down-indict" />
                                            </Dropdown> : null : null]}
                                    className="course-topic__content--item"
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={assetAvatar(item.icon, item.file_type)} />}
                                        title={<span onClick={() => gotoLecture(item.id, item.content, item.file_type)}>{item.title}</span>}
                                        description={item.info}
                                    />
                                </List.Item>
                            )}
                        /> : null
                }
                {
                    quizes.length > 0 ?
                        <List
                            itemLayout="horizontal"
                            dataSource={quizes}
                            renderItem={item => (
                                <List.Item
                                    actions={[userRole.code ?
                                        userRole.code === 'TC' || userRole.code === "TA" ?
                                            <Dropdown overlay={<Menu>
                                                <Menu.Item danger onClick={() => deleteAsset(item.id, "quizes")}>Xóa bài kiểm tra</Menu.Item>
                                                <Menu.Item onClick={() => triggerEditQuize(item)}>Sửa bài kiểm tra</Menu.Item>
                                            </Menu>} placement="topCenter">
                                                <CaretDownOutlined className="down-indict" />
                                            </Dropdown> : null : null]}
                                    className="course-topic__content--item"
                                >
                                    <List.Item.Meta
                                        onClick={() => gotoExam(item.id)}
                                        avatar={<Avatar src={quizIcon} />}
                                        title={<span>{item.title}</span>}
                                        description={
                                            item.expired ?
                                                !isTimeBefore(item.expired) ?
                                                    <Text mark>Bài kiểm tra sẽ hết hạn vào: {formatDate(item.expired, Constants.MMM_Do__YY__TIME)}</Text> :
                                                    <Text style={{ fontWeight: '500' }} type="danger">Quá thời gian làm bài: {formatDate(item.expired, Constants.MMM_Do__YY__TIME)}</Text>
                                                : null}
                                    />
                                </List.Item>
                            )}
                        /> : null
                }
                {
                    assignments.length > 0 ?
                        <List
                            itemLayout="horizontal"
                            dataSource={assignments}
                            renderItem={item => (
                                <List.Item
                                    actions={[userRole.code ?
                                        userRole.code === 'TC' || userRole.code === "TA" ?
                                            <Dropdown overlay={<Menu>
                                                <Menu.Item danger onClick={() => deleteAsset(item.id, "assignment")}>
                                                    Xóa bài assignment
                                                </Menu.Item>
                                                <Menu.Item onClick={() => triggerCreateAssignment(null, false, item)}>Sửa bài assignment</Menu.Item>
                                            </Menu>} placement="topCenter">
                                                <CaretDownOutlined className="down-indict" />
                                            </Dropdown> : null : null]}
                                    className="course-topic__content--item"
                                >
                                    <List.Item.Meta
                                        onClick={() => gotoAssignment(item.id)}
                                        avatar={<Avatar src={assignmentAvatar} />}
                                        title={<span>{item.name}</span>}
                                        description={item.info}
                                    />
                                </List.Item>
                            )}
                        /> : null
                }
            </div>
        </div>
    )
};

export default CourseHomeTopic;
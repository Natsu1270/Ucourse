import React, { useState, useEffect } from 'react'
import { Avatar, List, Row, Col, Dropdown, Menu, message, Typography, Tag } from 'antd'
import { useHistory } from 'react-router-dom'

import Constants from "../../constants";
import { parseHtml } from "../../utils/text.utils"

import {
    SettingTwoTone, DeleteOutlined,
    SettingOutlined, BookOutlined, ReadOutlined, ProfileOutlined
} from '@ant-design/icons'
import { deleteTopicAsset } from '../../api/courseHome.services';
import { deleteAssigment } from '../../api/assignment.services';
import { deleteExam } from '../../api/exam.services';
import QuizList from './Topic/quizes.component';
import AssignmentList from './Topic/assigments.component';
import AssetList from './Topic/assets.component';


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
                    passPercentage: quiz.pass_percentage,
                    percentage: quiz.percentage,
                    mandatory: quiz.mandatory,
                    question_num: quiz.question_num
                })
            )
            setQuizes(topicQuizes)
        }
        if (topic.topic_assignments) {
            const topicAssignments = topic.topic_assignments.map(
                ass => ({
                    id: ass.id, name: ass.name, info: ass.info,
                    start_date: ass.start_date, due_date: ass.due_date,
                    max_score: ass.max_score, max_submit_time: ass.max_submit_time,
                    assignment_files: ass.assignment_files, percentage: ass.percentage, mandatory: ass.mandatory,
                    pass_score: ass.pass_score
                })
            )
            setAssignments(topicAssignments)
        }
    }, [topic])


    function gotoLecture(assetId, fileUrl, type) {
        if (
            type === Constants.VIDEO_FILE_TYPE
        ) {
            history.push(`lecture/${topic.id}/${assetId}`)
        } else {
            window.open(fileUrl, '_blank')
        }
    }

    function gotoExam(exam_id) {
        history.push(`exams/${exam_id}`)
    }

    function gotoAssignment(assignment_id) {
        history.push(`${topic.id}/assignment/${assignment_id}`)
    }

    const deleteAsset = async (id, type) => {
        const data = { token, id }
        try {
            if (type === "asset") {
                const result = await deleteTopicAsset(data)
                const updateAssets = assets.filter(asset => asset.id !== id)
                setAssets(updateAssets)
            } else if (type === "assignment") {
                const result = await deleteAssigment(data)
                const updateAssignments = assignments.filter(ass => ass.id !== id)
                setAssignments(updateAssignments)
            } else {
                const result = await deleteExam(data)
                const updateExams = quizes.filter(q => q.id !== id)
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
                        <AssetList
                            assets={assets}
                            triggerEditAsset={triggerEditAsset}
                            triggerCreateAsset={triggerCreateAsset}
                            deleteAsset={deleteAsset}
                            gotoLecture={gotoLecture}
                            userRole={userRole} /> : null
                }
                {
                    quizes.length > 0 ?
                        <QuizList
                            quizes={quizes}
                            triggerEditQuize={triggerEditQuize}
                            deleteAsset={deleteAsset}
                            gotoExam={gotoExam}
                            userRole={userRole}
                        /> : null
                }
                {
                    assignments.length > 0 ?
                        <AssignmentList
                            gotoAssignment={gotoAssignment}
                            assignments={assignments}
                            deleteAsset={deleteAsset}
                            gotoExam={gotoExam}
                            userRole={userRole}
                            triggerCreateAssignment={triggerCreateAssignment}
                        /> : null
                }
            </div>
        </div>
    )
};

export default CourseHomeTopic;
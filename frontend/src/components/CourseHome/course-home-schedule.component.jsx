import React, { useState, useEffect } from 'react'
import CourseHomeTopic from "./course-home-topic.component";
import {
    createLearningTopic, editLearningTopic, deleteTopicAsset,
    createTopicAsset, editTopicAsset
} from '../../api/courseHome.services'
import { createAssignment, editAssignment } from '../../api/assignment.services'
import {
    Skeleton, Button, Modal, Row,
    Col, message
} from "antd";
import slugify from 'slugify';
import { deleteLearningTopic } from '../../api/courseHome.services';
import { createExam, editExam } from '../../api/exam.services';
import QuestionDrawer from './Schedule/question-drawer.component';
import ScheduleForm from './Schedule/schedule-form.component';


const CourseHomeSchedule = ({ topics, isLoading, userRole, token, course }) => {

    const [showModal, setShowModal] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [info, setInfo] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [learningTopics, setTopic] = useState([])
    const [isDeleting, setDeleting] = useState(false)
    const [editingTopic, setEditingTopic] = useState(null)
    const [isCreateTopic, setIsCreateTopic] = useState(true)
    const [isCreateAssignment, setIsCreateAssignment] = useState(false)
    const [fileList, setFile] = useState([])
    const [isEditAsset, setIsEditAsset] = useState(false)
    const [editingAsset, setEditingAsset] = useState({})
    const [editingQuize, setEditingQuize] = useState({})
    const [editingAssignment, setEditingAssignment] = useState({})
    const [assignmentFiles, setAssignmentFiles] = useState([])


    useEffect(() => {
        if (topics && topics.length > 0) {
            setTopic(topics)
        }
    }, [topics])


    const onFinish = values => {
        if (editingTopic === null) {
            createTopic(values.name, info)
        } else {
            editTopic(values.name, info, editingTopic)
        }
    };

    const submitCreateAsset = values => {
        createAsset(values)
    }

    const createAsset = async (values) => {
        setLoading(true)
        const { assetName: name, description: info, fileType: file_type } = values
        const data = {
            token, learning_topic: editingTopic, name, info, file_type, file: fileList[0]
        }
        const editData = {
            token, id: editingAsset.id, name, info, file_type, file: fileList[0]
        }
        try {

            const result = !isEditAsset ? await createTopicAsset(data) : await editTopicAsset(editData)
            const msg = !isEditAsset ? "Thêm bài giảng thành công" : "Chỉnh sửa bài giảng thành công"
            message.success(msg, 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    const submitAssignment = async (values) => {
        setLoading(true)
        console.log(values)
        const { assName: name, assInfo: info, assDate, assPercentage: percentage,
            assMaxScore: max_score, assMaxSubmit: max_submit_time, assFile, mandatory
        } = values
        const files = assFile ? assFile.map(file => ({
            file: file.originFileObj,
            fileName: file.name
        })) : []
        const start_date = assDate[0] ? assDate[0].format('YYYY-MM-DD HH:MM') : undefined
        const due_date = assDate[1] ? assDate[1].format('YYYY-MM-DD HH:MM') : undefined

        const data = {
            token, learning_topic: editingTopic, name, info, max_score, percentage,
            max_submit_time, start_date: start_date, due_date: due_date, files, mandatory
        }
        try {
            const result = isCreateAssignment ?
                await createAssignment(data) : await editAssignment(data, editingAssignment.id)
            message.success(
                isCreateAssignment ? "Tạo assignment thành công" : "Chỉnh sửa assignment thành công",
                1.5, () => window.location.reload()
            )
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const data = { token, id: id }
        setDeleting(true)
        try {
            const result = await deleteLearningTopic(data)
            const updateTopics = learningTopics.filter(topic => topic.id != id)
            setTopic(updateTopics)
            message.success("Xoá thành công")
        } catch (err) {
            message.error(err.message)
        }
        setDeleting(false)
    }

    const createTopic = async (name, info) => {
        setLoading(true)
        const data = {
            token, course_home: course, name, info, code: slugify(name)
        }
        try {
            const result = await createLearningTopic(data)
            const newTopic = result.data.data
            learningTopics.push(newTopic)
            setTopic(learningTopics)
            message.success("Tạo mới chủ đề học thành công")
            setShowModal(false)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const editTopic = async (name, info, id) => {
        setLoading(true)
        const data = {
            token, name, info, id
        }

        try {
            const result = await editLearningTopic(data)
            const topicIndex = learningTopics.findIndex(t => t.id === id)
            const newTopics = [...learningTopics]
            newTopics[topicIndex] = result.data.data
            setTopic(newTopics)
            message.success("Cập nhật chủ đề học thành công")
            setShowModal(false)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
        setEditingTopic(null)
        setName('')
        setInfo('')
    }

    const triggerEdit = (id) => {
        setEditingTopic(id)
        const topicToEdit = learningTopics.find(topic => topic.id === id)
        setInfo(topicToEdit.info)
        setName(topicToEdit.name)
        setIsCreateTopic(true)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setEditingAsset({})
        setEditingTopic({})
        setEditingAssignment({})
        setAssignmentFiles([])
    }

    const triggerCreateAsset = (topicId) => {
        setEditingAsset({})
        setIsCreateTopic(false)
        setShowModal(true)
        setEditingTopic(topicId)
    }

    const triggerEditAsset = (asset) => {
        setIsCreateTopic(false)
        setIsEditAsset(true)
        setEditingAsset(asset)
        setShowModal(true)
    }

    const triggerCreateQuize = (topicId) => {
        setShowDrawer(true)
        setEditingTopic(topicId)
    }

    const triggerEditQuize = quize => {
        setShowDrawer(true)
        setEditingQuize(quize)
    }

    const triggerCreateAssignment = (topic, isCreate, assignment) => {
        setIsEditAsset(false)
        setIsCreateTopic(false)
        if (isCreate) {
            setEditingTopic(topic)
            setIsCreateAssignment(true)
        } else {
            setIsCreateAssignment(false)
            setEditingAssignment(assignment)
            setAssignmentFiles(assignment.assignment_files)
        }
        setShowModal(true)
    }

    const createQuize = async (values) => {
        console.log(values)
        setLoading(true)
        const start_date = values.date ? values.date[0] : null;
        const expired_date = values.date ? values.date[1] : null;

        const data = {
            token, topic: editingTopic, name: values.name, exam_type: 'lt', get_result_type: values.resultType,
            duration: values.duration, max_try: values.max_try, pass_score: values.pass_score,
            start_date, expired_date, id: editingQuize.id, percentage: values.percentage, mandatory: values.mandatory
        }

        const editData = {
            token, name: values.name, get_result_type: values.resultType,
            duration: values.duration, max_try: values.max_try, pass_score: values.pass_score,
            start_date, expired_date, id: editingQuize.id, percentage: values.percentage, mandatory: values.mandatory
        }
        try {
            if (editingQuize.id === undefined) {
                const result = await createExam(data)
            }
            else {
                const result = await editExam(editData)
            }
            message.success(
                !editingQuize.id ? "Tạo bài kiểm tra thành công" : "Chỉnh sửa bài kiểm tra thành công",
                1.5,
                () => window.location.reload()
            )
        } catch (err) {
            message.error(err.message)
            setLoading(false)
        }

    }

    const deleteAttachment = async (id) => {
        const data = { token, id }
        setLoading(true)
        try {
            const result = await deleteTopicAsset(data)
            const newAttachments = assignmentFiles.filter(a => a.id !== id)
            setAssignmentFiles(newAttachments)
            message.success("Xóa file nộp thành công")
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const closeDrawer = () => {
        setShowDrawer(false)
        setEditingQuize({})
    }

    return (
        <section className="section-5 page-2">

            <Row>
                <Col span={10}><h3 className="text--main mb-5">Chủ đề học</h3></Col>
                <Col span={4}>{
                    userRole.code
                        ? userRole.code === "TC" || userRole.code === "TA" ?
                            <Button onClick={() => {
                                setShowModal(true)
                                setIsCreateTopic(true)
                            }
                            } type="primary">Thêm chủ đề học</Button> : null
                        : null
                }</Col>
            </Row>


            {
                isLoading ? (
                    <div>
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                    </div>
                ) : learningTopics.map(topic =>
                    <Skeleton key={topic.id} active avatar paragraph={{ rows: 4 }} loading={isDeleting}>
                        <CourseHomeTopic
                            handleDelete={handleDelete}
                            triggerEdit={triggerEdit}
                            userRole={userRole}
                            key={topic.id}
                            topic={topic}
                            token={token}
                            triggerCreateAsset={triggerCreateAsset}
                            triggerEditAsset={triggerEditAsset}
                            triggerCreateQuize={triggerCreateQuize}
                            triggerEditQuize={triggerEditQuize}
                            triggerCreateAssignment={triggerCreateAssignment}
                        />
                    </Skeleton>
                )
            }

            <Modal
                destroyOnClose={true}
                width={920}
                style={{ paddingBottom: "0px" }}
                className="bg-white"
                title="Tạo mới chủ đề học"
                visible={showModal}
                confirmLoading={loading}
                footer={[
                    <Button key="back" type="primary" danger onClick={handleClose}>
                        Huỷ
                    </Button>
                ]}
                onCancel={handleClose}
            >
                {
                    <ScheduleForm
                        name={name} onFinish={onFinish} editingAssignment={editingAssignment}
                        editingAsset={editingAsset} setFile={setFile} fileList={fileList}
                        deleteAttachment={deleteAttachment} submitAssignment={submitAssignment}
                        submitCreateAsset={submitCreateAsset} isCreateTopic={isCreateTopic}
                        isCreateAssignment={isCreateAssignment} isEditAsset={isEditAsset}
                        info={info} loading={loading} setInfo={setInfo} assignmentFiles={assignmentFiles}
                    />
                }
            </Modal>

            <QuestionDrawer
                loading={loading} closeDrawer={closeDrawer} showDrawer={showDrawer}
                editingQuize={editingQuize} createQuize={createQuize}
            />
        </section>
    )
};

export default CourseHomeSchedule;
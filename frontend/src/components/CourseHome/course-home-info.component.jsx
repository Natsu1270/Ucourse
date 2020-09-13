import React, { useEffect, useState } from 'react'
import { parseHtml } from "../../utils/text.utils";
import { Avatar, Button, message, Skeleton, Space } from "antd";
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'

import CKEditor from '@ckeditor/ckeditor5-react'
import CKEditorInline from '@ckeditor/ckeditor5-build-classic'

import { updateCourseHomeInfo } from "../../api/courseHome.services";

const CourseHomeInfo = ({ courseInfo, isLoading, userRole, token, slug, teacher }) => {

    const [editing, setEditing] = useState(false)
    const [info, setInfo] = useState(courseInfo)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (courseInfo) {
            setInfo(courseInfo)
        }
    }, [courseInfo])

    const updateInfo = async () => {
        setUpdating(true)
        try {
            const result = await updateCourseHomeInfo({ token, slug, info })
            message.success('Cập nhật thông tin khóa học thành công!')
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setInfo(courseInfo)
        }
        setUpdating(false);
        setEditing(false)
    }

    const renderButton = () => {
        if (editing) {
            return (
                <Space>
                    <Button
                        loading={updating}
                        type="danger" onClick={() => setEditing(false)}><CloseOutlined /> Huỷ</Button>
                    <Button
                        disabled={info === courseInfo}
                        loading={updating}
                        type="primary" onClick={() => updateInfo()}><CheckOutlined /> Xong</Button>
                </Space>
            )
        }
        return <Button onClick={() => setEditing(true)}><EditOutlined /> Sửa</Button>
    }
    return (
        <section className="section-5 page-2 course-home-info">

            <div className="course-home-info--header d-flex dis-flex-between mb-5">
                <h3 className="text--main">
                    Tổng quan về khóa học
                </h3>
                <div>
                    {
                        userRole.code === 'TC' || userRole.code === 'TA' ? renderButton()
                            : null
                    }
                </div>
            </div>

            <Skeleton active loading={isLoading}>

                {
                    editing ? <CKEditor
                        editor={CKEditorInline}
                        data={info}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setInfo(data)
                        }}
                    >
                    </CKEditor> :
                        parseHtml(info)
                }
                <Space>
                    <Avatar size={64} src={teacher.avatar} />
                    <span className="text--sub__bigger"> - {teacher.fullname}</span>
                </Space>

            </Skeleton>
        </section>
    )
};

export default CourseHomeInfo
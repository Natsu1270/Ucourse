import React, {useEffect, useState} from 'react'
import {parseHtml} from "../../utils/text.utils";
import {Button, message, Skeleton, Space} from "antd";
import {EditOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons'

import CKEditor from '@ckeditor/ckeditor5-react'
import CKEditorInline from '@ckeditor/ckeditor5-build-classic'

import {updateCourseHomeInfo} from "../../api/courseHome.services";

const CourseHomeInfo = ({courseInfo, isLoading, userRole, token, slug}) => {

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
        const result = await updateCourseHomeInfo({token, slug, info})
        if (result.status === 200) {
            message.success("Cập nhật thành công")
        } else {
            message.error("Có lỗi xảy ra")
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
                        disabled={updating}
                        type="danger" onClick={() => setEditing(false)}><CloseOutlined/> Huỷ</Button>
                    <Button
                        disabled={updating || info === courseInfo}
                        type="primary" onClick={() => updateInfo()}><CheckOutlined/> Xong</Button>
                </Space>
            )
        }
        return <Button onClick={() => setEditing(true)}><EditOutlined/> Sửa</Button>
    }
    return (
        <section className="section-5 page-2 course-home-info">

            <div className="course-home-info--header d-flex dis-flex-between mb-5">
                <h3 className="text--main">
                    Tổng quan về khóa học
                </h3>
                <div>
                    {
                        userRole.code === 'TC' ? renderButton()
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

            </Skeleton>
        </section>
    )
};

export default CourseHomeInfo
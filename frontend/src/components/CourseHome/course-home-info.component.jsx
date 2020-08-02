import React, {useState} from 'react'
import {parseHtml} from "../../utils/text.utils";
import {Button, Skeleton, Space} from "antd";
import {EditOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons'

import CKEditor from '@ckeditor/ckeditor5-react'
import CKEditorInline from '@ckeditor/ckeditor5-build-classic'

const CourseHomeInfo = ({courseInfo, isLoading, userRole}) => {

    const [editing, setEditing] = useState(false)
    const [info, setInfo] = useState(courseInfo)

    const renderButton = () => {
        if (editing) {
            return (
                <Space>
                    <Button type="danger" onClick={() => setEditing(false)}><CloseOutlined/> Huỷ</Button>
                    <Button type="primary" onClick={() => setEditing(true)}><CheckOutlined/> Xong</Button>

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
                            data={courseInfo}
                        >
                        </CKEditor> :
                        parseHtml(courseInfo)
                }

            </Skeleton>
        </section>
    )
};

export default CourseHomeInfo
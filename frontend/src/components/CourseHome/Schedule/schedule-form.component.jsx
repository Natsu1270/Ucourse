import React from 'react'
import {
    Form, Button, Input, Upload, Radio, Switch, Skeleton,
    List, Space, DatePicker, InputNumber, Popconfirm,
} from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import moment from 'moment'
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons'
import { disabledDate } from '../../../utils/date.utils';

const { RangePicker } = DatePicker

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const ScheduleForm = (
    {
        isCreateAssignment, isCreateTopic, onFinish, name, editingAssignment, assignmentFiles, loading,
        info, setInfo, editingAsset, submitAssignment, submitCreateAsset, fileList, setFile, deleteAttachment,
        isEditAsset
    }
) => {

    const props = {
        onRemove: file => {
            setFile([])
        },
        beforeUpload: file => {
            setFile([file])
            return false;
        },
        fileList,
    };

    const assFileProps = {
        onRemove: file => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            setFile(newFileList)
        },
        beforeUpload: file => {
            const newFileList = [...fileList, file]
            setFile(newFileList)
            return false;
        },
        fileList,
    }


    if (isCreateTopic) {
        return (
            <Form name="topic_form" {...formItemLayout} onFinish={onFinish} initialValues={{ name: name }}>
                <Form.Item
                    hasFeedback
                    {...formItemLayout}
                    name="name"
                    label="Tên chủ đề"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên chủ đề',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên chủ đề" value={name} />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    {...formItemLayout}
                    name="info"
                    label="Mô tả chủ đề"
                >

                    <CKEditor
                        key="editor"
                        editor={ClassicEditor}
                        data={info}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setInfo(data)
                        }}
                    >

                    </CKEditor>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Xác nhận
                        </Button>
                </Form.Item>
            </Form>)

    }
    if (isCreateAssignment || editingAssignment.id) {

        const initStartDate = editingAssignment.start_date ? moment(editingAssignment.start_date) : null
        const initDueDate = editingAssignment.due_date ? moment(editingAssignment.due_date) : null

        return (
            <Form
                name="assignment_form" {...formItemLayout}
                onFinish={submitAssignment}
                initialValues={{
                    assName: editingAssignment.name,
                    assInfo: editingAssignment.info,
                    assMaxSubmit: editingAssignment.max_submit_time,
                    assMaxScore: editingAssignment.max_score,
                    assPercentage: editingAssignment.percentage,
                    assDate: [initStartDate, initDueDate],
                    mandatory: editingAssignment.mandatory
                }}
            >
                <Form.Item
                    {...formItemLayout}
                    hasFeedback
                    name="assName"
                    label="Tên"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên assignment!', },
                    ]} >
                    <Input placeholder="Nhập tên assignment" value={name} />
                </Form.Item>

                <Form.Item name="mandatory" label="Bắt buộc" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    hasFeedback
                    name="assInfo"
                    label="Mô tả bài assigment"
                >
                    <Input placeholder="Nhập thông tin mô assignment" value={name} />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Vui lòng nhập phần trăm!', },
                    ]}
                    name="assPercentage"
                    label="Phần trăm điểm tổng">
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập phần trăm điểm" />
                </Form.Item>

                <Form.Item
                    name="assFile"
                    label="File đính kèm"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload {...assFileProps} name="assFile" multiple={true}>
                        <Button>
                            <UploadOutlined /> Nhấn để chọn file
                        </Button>
                    </Upload>
                </Form.Item>

                {
                    !isCreateAssignment && assignmentFiles.length > 0 ?
                        <Form.Item
                            {...formItemLayout}
                            label="File đính kèm"
                        >
                            <List
                                loading={loading}
                                itemLayout="horizontal"
                                dataSource={assignmentFiles}
                                renderItem={item => (
                                    <List.Item
                                        actions={
                                            [
                                                <Popconfirm
                                                    title="Bạn có chắc chắn muốn xóa file này?"
                                                    onConfirm={() => deleteAttachment(item.id)}
                                                    okText="Xác nhận"
                                                    cancelText="Hủy"
                                                >
                                                    <Button
                                                        danger type="primary" key="delete">Xóa</Button>
                                                </Popconfirm>

                                            ]
                                        }>
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                title={<Space><PaperClipOutlined />{item.name}</Space>}
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </Form.Item> : null

                }

                <Form.Item
                    {...formItemLayout}
                    hasFeedback
                    name="assMaxSubmit"
                    label="Giới hạn số lần nộp bài">
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập số lần nộp bài cho phép" />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    hasFeedback
                    name="assMaxScore"
                    label="Điểm bài assignment"
                    rules={[
                        { required: true, message: 'Vui lòng nhập điểm bài assignment!', },
                    ]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Nhập điểm" />
                </Form.Item>

                <Form.Item name="assDate" label="Thời gian bài assignment">
                    <RangePicker
                        disabledDate={disabledDate}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format="DD-MM-YYYY HH:mm:ss"
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Xác nhận
                </Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <Form
            name="asset_form"
            {...formItemLayout}
            onFinish={submitCreateAsset}
            initialValues={{
                assetName: editingAsset.title,
                description: editingAsset.info,
                fileType: editingAsset.file_type
            }}
        >
            <Form.Item
                {...formItemLayout}
                hasFeedback
                name="assetName"
                label="Tên"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên bài giảng',
                    },
                ]}
            >
                <Input placeholder="Nhập tên bài giảng" value={name} />
            </Form.Item>

            <Form.Item
                hasFeedback
                name="fileType" label="Loại bài giảng">
                <Radio.Group>
                    <Radio value="pdf">PDF</Radio>
                    <Radio value="doc">DOC</Radio>
                    <Radio value="video">Video</Radio>
                    <Radio value="other">Loại khác</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                hasFeedback
                name="file"
                label="File bài giảng"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: !isEditAsset,
                        message: 'Vui lòng tải lên file bài giảng',
                    },
                ]}
            >
                <Upload {...props} name="file" multiple={false}>
                    <Button disabled={fileList.length > 0}>
                        <UploadOutlined /> Nhấn để chọn file
                </Button>
                </Upload>
            </Form.Item>

            <Form.Item
                hasFeedback
                {...formItemLayout}
                name="description"
                label="Mô tả"
            >
                <Input placeholder="Nhập mô tả bải giảng" value={name} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Xác nhận
            </Button>
            </Form.Item>

        </Form>
    )
}

export default ScheduleForm
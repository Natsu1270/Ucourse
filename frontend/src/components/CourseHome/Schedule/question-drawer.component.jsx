import React from 'react'
import { Drawer, Form, Col, Row, Button, Select, Input, InputNumber, Switch, DatePicker } from 'antd'
import moment from 'moment'
import { disabledDate } from '../../../utils/date.utils'


const { Option } = Select
const { RangePicker } = DatePicker

const QuestionDrawer = ({ closeDrawer, showDrawer, createQuize, editingQuize, loading }) => {

    return (
        <Drawer
            destroyOnClose={true}
            title="Tạo bài kiểm tra"
            width={850}
            onClose={closeDrawer}
            visible={showDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: 'right', }}>
                    <Button type="primary" danger onClick={closeDrawer} style={{ marginRight: 8 }}>
                        Hủy
                </Button>
                </div>
            }
        >
            <Form
                layout="vertical"
                onFinish={createQuize}
                initialValues={
                    {
                        name: editingQuize.title,
                        resultType: editingQuize.resultType,
                        duration: editingQuize.duration,
                        max_try: editingQuize.maxTry,
                        pass_score: editingQuize.passScore,
                        date: [
                            editingQuize.startDate ?
                                moment(editingQuize.startDate) : null,
                            editingQuize.expired ? moment(editingQuize.expired) : null
                        ],
                        percentage: editingQuize.percentage, mandatory: editingQuize.mandatory
                    }
                }
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name" label="Tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra' }]}
                        >
                            <Input placeholder="Nhập tên bài kiểm tra" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="resultType"
                            label="Cách tính điểm"
                            rules={[{ required: true, message: 'Vui lòng chọn hình thức tính điểm' }]}
                        >
                            <Select placeholder="Hình thức tính điểm">
                                <Option value="best">Lấy điểm cao nhất</Option>
                                <Option value="last">Lấy điểm bài làm cuối cùng</Option>
                                <Option value="average">Lấy điểm trung bình</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item hasFeedback name="duration" label="Thời gian làm bài (giây)"
                            rules={[{ required: true, message: 'Xác định thời gian làm bài' }]}>
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item hasFeedback name="max_try" label="Số lần làm bài cho phép (để trống nêu không giới hạn)"
                        >
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            name="percentage"
                            label="Phần trăm điểm tổng kết"
                            rules={[{ required: true, message: 'Nhập phần trăm điểm' }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item hasFeedback name="pass_score" label="Điểm để qua bài test"
                        >
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="mandatory" label="Bắt buộc" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="date" label="Thời gian bài kiểm tra">
                            <RangePicker
                                disabledDate={disabledDate}
                                // disabledTime={disabledRangeTime}
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                }}
                                format="DD-MM-YYYY HH:mm:ss"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item >
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Xác nhận
                </Button>
                </Form.Item>

            </Form>
        </Drawer>

    )
}

export default QuestionDrawer
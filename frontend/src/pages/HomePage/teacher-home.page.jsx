import React, { useState, useEffect } from 'react'


import { getCourseHomesByTeacher } from '../../api/courseHome.services'
import { message, Collapse, Avatar, Button, Descriptions, Badge, Space, Typography, Row, Col, } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';

import { Chart, Interval, Tooltip } from 'bizcharts';
import { parseHtml } from '../../utils/text.utils';


const { Panel } = Collapse
const { Paragraph } = Typography;

const TeacherHomePage = ({ token }) => {

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [courseHomes, setCourseHomes] = useState([])

    const getCourseHomes = async () => {
        setLoading(true)
        try {
            const { data } = await getCourseHomesByTeacher(token)
            setCourseHomes(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        if (token) {
            getCourseHomes()
        }
    }, [token]);

    const genExtra = (slug) => (
        <Button type="primary"
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
                history.push(`learn/${slug}`)
            }}
        >Truy cập</Button>
    );

    const chartData = courseHome => {
        return [
            { item: 'Forums', num: courseHome.forums.length },
            { item: 'Chủ đề học', num: courseHome.learning_topics.length },
            { item: 'Bài kiểm tra', num: courseHome.quiz_num },
            { item: 'Bài assignment', num: courseHome.assignment_num },
            { item: 'Bài giảng', num: courseHome.lecture_num },
        ]

    }

    return (

        // 

        <section className="page section-10">

            <div className="page-card-2">
                <h3 className="text--main private-home--title">
                    Trong tiến trình
                </h3>

                <Collapse
                    defaultActiveKey={[courseHomes[0] ? courseHomes[0].id.toString() : '1']}
                    expandIconPosition="left"
                    accordion>
                    {
                        courseHomes.map(courseHome => {

                            return (
                                <Panel
                                    key={courseHome.id.toString()}
                                    header={<span className="text--sub__bigger">{courseHome.full_name}</span>}
                                    extra={genExtra(courseHome.slug)}
                                >

                                    <Descriptions title="Thông tin" bordered className="mb-5">
                                        <Descriptions.Item label="Khóa học">
                                            <Space>
                                                <Avatar size={48} src={courseHome.course.icon} />
                                                <Link style={{ fontSize: '1.8rem' }} to={`courses/${courseHome.course.slug}`}>{courseHome.course.title}</Link>
                                            </Space>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Trạng thái">
                                            <Badge status="processing" text={courseHome.status} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Học viên">
                                            {courseHome.students.length} / {courseHome.maximum_number}
                                        </Descriptions.Item>

                                    </Descriptions>
                                    <h3 className="mb-4">Biểu đồ tài nguyên khóa học hiện tại</h3>
                                    <Row justify="center">
                                        <Col span={18}>
                                            <Chart height={300} autoFit data={chartData(courseHome)}>
                                                <Interval position="item*num" color="item" />
                                                <Tooltip shared />
                                            </Chart>
                                        </Col>
                                    </Row>

                                </Panel>
                            )
                        })
                    }
                </Collapse>

            </div>

        </section>

    )
};


export default TeacherHomePage
import React, { useEffect, useState } from 'react'
import {
    Chart, LineAdvance, Coordinate, Line, Point, Area, G2, Interval, Axis,
    Tooltip,
} from 'bizcharts';
import DataSet from "@antv/data-set";
import { Skeleton, Layout, Row, Col } from 'antd';
import { dataByMonth, lineChartDataByMonth } from './admin.utils.js'
import { DatabaseOutlined, PieChartOutlined, FireTwoTone, DatabaseTwoTone, PieChartTwoTone, FileSearchOutlined } from '@ant-design/icons';


const { Content } = Layout

const ResourcesAdmin = ({ data, loading }) => {

    const [chartData, setChartData] = useState([])
    const [dv1, setDv1] = useState(null)
    const [dv2, setDv2] = useState(null)


    const pieData = [
        { type: 'Chương trình học', value: data.programCount },
        { type: 'Khóa học', value: data.courseCount },
        { type: 'Lơp học', value: data.classCount },
        { type: 'Chủ đề học', value: data.topicCount },
        { type: 'Bài kiểm tra', value: data.examCount },
        { type: 'Bài assignment', value: data.assignmentCount },
        { type: 'Bài giảng', value: data.lectureCount },

    ];



    useEffect(() => {
        if (data) {
            const courseData = dataByMonth(data.courses, 'created_date')
            const programData = dataByMonth(data.programs, 'created_date')
            const courseDataChart = lineChartDataByMonth(courseData, "Khóa học") || []
            const programDataChart = lineChartDataByMonth(programData, "Chương trình học") || []

            const chartData = [...courseDataChart, ...programDataChart]
            setChartData(chartData)

            if (data.topCourses) {
                const topCourseData = data.topCourses.map(course => ({
                    course: course.course,
                    buyCount: course.buyCount,
                    viewCount: course.viewCount
                }))

                const ds = new DataSet();
                const dv = ds.createView().source(topCourseData);
                dv.source(topCourseData).transform({
                    type: 'reverse',
                });
                setDv1(dv)
            }

            if (data.topViewCourses) {
                const topViewData = data.topCourses.map(course => ({
                    course: course.course,
                    viewCount: course.viewCount
                }))

                const ds = new DataSet();
                const dv = ds.createView().source(topViewData);
                dv.source(topViewData).transform({
                    type: 'reverse',
                });
                setDv2(dv)
            }
        }
    }, [data])



    return (
        <Layout>
            <Content style={{ padding: '2rem 4rem', minHeight: 600 }}>
                <Row gutter={[40, 20]}>
                    <Col span={14}>
                        <div className="data-card">
                            <Skeleton loading={loading} active>
                                <Row className="mb-5" gutter={[1, 1]} align="middle" style={{ padding: '0 3rem' }}>
                                    <Col>
                                        <span className="text--sub__bigger">
                                            <DatabaseTwoTone
                                                twoToneColor="#63ace5"
                                                className="data-card__icon" />  Khóa học và chương trình theo tháng
                                        </span>
                                    </Col>
                                </Row>
                                <Chart
                                    scale={{ count: { min: 0, max: 100 } }}
                                    padding={[10, 20, 50, 40]} autoFit height={250} data={chartData} >
                                    <LineAdvance
                                        shape="smooth"
                                        point
                                        area
                                        position="month*count"
                                        color="type"
                                    />
                                </Chart>
                            </Skeleton>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="data-card">
                            <Skeleton loading={loading} active>
                                <Row className="mb-5" gutter={[1, 1]} align="middle" style={{ padding: '0 3rem' }}>
                                    <Col>
                                        <span className="text--sub__bigger">
                                            <PieChartTwoTone twoToneColor="#a8e6cf" className="data-card__icon" />  Thành phần
                                        </span>
                                    </Col>
                                </Row>
                                <Chart height={250} data={pieData} autoFit
                                    scale={{
                                        value: {
                                            min: 0,
                                            max: 100,
                                        }
                                    }}
                                >
                                    <Coordinate type="polar" radius={0.8} />
                                    <Line
                                        position="type*value"
                                        size="2"
                                    />
                                    <Point
                                        position="type*value"
                                        shape="circle"
                                    />

                                    <Area
                                        position="type*value"
                                    />
                                </Chart>
                            </Skeleton>

                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="data-card">
                            <Skeleton loading={loading} active>
                                <Row className="mb-5" gutter={[1, 1]} align="middle" style={{ padding: '0 3rem' }}>
                                    <Col>
                                        <span className="text--sub__bigger">
                                            <FireTwoTone twoToneColor="red" className="data-card__icon" />  Khóa học có nhiều lượt mua
                                        </span>
                                    </Col>
                                </Row>
                                <Row justify="center">
                                    <Col>
                                        <Chart
                                            data={dv1} height={250} width={600} padding={[10, 80, 40, 200]} autoFit
                                        >
                                            <Coordinate transpose />
                                            <Axis
                                                name="course"
                                            />
                                            <Axis name="buyCount" visible={false} />
                                            <Tooltip />
                                            <Interval
                                                position="course*buyCount"
                                                label="buyCount"
                                                color="course"
                                            />
                                        </Chart>
                                    </Col>

                                </Row>
                            </Skeleton>

                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="data-card">
                            <Skeleton loading={loading} active>
                                <Row className="mb-5" gutter={[1, 1]} align="middle" style={{ padding: '0 3rem' }}>
                                    <Col>
                                        <span className="text--sub__bigger">
                                            <FileSearchOutlined twoToneColor="red" className="data-card__icon" />
                                             Khóa học có nhiều lượt xem
                                        </span>
                                    </Col>
                                </Row>
                                <Row justify="center">
                                    <Col>
                                        <Chart
                                            data={dv2} height={250} width={600} padding={[10, 80, 40, 200]} autoFit
                                        >
                                            <Coordinate transpose />
                                            <Axis
                                                name="course"
                                            />
                                            <Axis name="viewCount" visible={false} />
                                            <Tooltip />
                                            <Interval
                                                position="course*viewCount"
                                                label="viewCount"
                                                color="course"
                                            />
                                        </Chart>
                                    </Col>

                                </Row>
                            </Skeleton>

                        </div>
                    </Col>


                </Row>
            </Content>
        </Layout>
    )
}

export default ResourcesAdmin



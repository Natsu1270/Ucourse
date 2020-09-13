import React, { useEffect, useState } from 'react'
import {
    Chart, LineAdvance,
} from 'bizcharts';
import { Skeleton, Layout, Row, Col } from 'antd';
import { dataByMonth, moneyChartData } from './admin.utils.js'
import { DollarTwoTone } from '@ant-design/icons';


const { Content } = Layout

const IncomeAdmin = ({ data, loading }) => {

    const [chartData, setChartData] = useState([])
    const [programIncome, setProgramIncome] = useState(0)
    const [courseIncome, setCourseIncome] = useState(0)


    useEffect(() => {
        if (data) {
            if (data.buyCourses) {
                const totalCourses = data.buyCourses.reduce((total, item) => total + parseInt(item.money), 0)
                setCourseIncome(totalCourses)
            }

            if (data.buyPrograms) {
                const totalPrograms = data.buyPrograms.reduce((total, item) => total + parseInt(item.money), 0)
                setProgramIncome(totalPrograms)
            }
            const courseData = dataByMonth(data.buyCourses, 'bought_date')
            const programData = dataByMonth(data.buyPrograms, 'bought_date')
            const courseDataChart = moneyChartData(courseData, "Khóa học") || []
            const programDataChart = moneyChartData(programData, "Chương trình học") || []

            const chartData = [...courseDataChart, ...programDataChart]
            setChartData(chartData)
        }
    }, [data])

    const renderMoney = (amount) => {
        return '$' + amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    return (
        <Layout>
            <Content style={{ padding: '2rem 4rem', minHeight: 600 }}>
                <Row gutter={[40, 20]}>
                    <Col span={24}>
                        <div className="data-card">
                            <Skeleton loading={loading} active>
                                <Row className="mb-5" gutter={16} align="middle" style={{ padding: '0 3rem' }}>
                                    <Col span={4}>
                                        <span className="text--sub__bigger">
                                            <DollarTwoTone
                                                twoToneColor="#f6cd61"
                                                className="data-card__icon" />  Doanh thu
                                        </span>
                                    </Col>
                                    <Col span={20}>
                                        <Row gutter={[1, 1]} align="middle">
                                            <Col span={8}>
                                                <span className="text--main">{renderMoney(programIncome)}</span>
                                                <span className="text--sub__bigger"> Chương trình học</span></Col>
                                            <Col span={8}><span className="text--main">{renderMoney(courseIncome)}</span>
                                                <span className="text--sub__bigger"> Khóa học</span>
                                            </Col>
                                            <Col span={8}><span className="text--main">{
                                                renderMoney(programIncome + courseIncome)
                                            }</span>
                                                <span className="text--sub__bigger"> Tổng</span>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                                <Chart
                                    scale={{ count: { min: 0, max: 1000000 } }}
                                    padding={[10, 20, 50, 100]} autoFit height={400} data={chartData} >
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
                </Row>
            </Content>
        </Layout>
    )
}

export default IncomeAdmin



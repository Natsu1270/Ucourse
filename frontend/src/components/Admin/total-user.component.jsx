import React, { useState, useEffect } from 'react'
import { Chart, LineAdvance } from 'bizcharts';
import './data-card.styles.scss'
import { Row, Col, Avatar } from 'antd'
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { dataByMonth, lineChartDataByMonth } from './admin.utils'

const UserDataCard = ({ data, num }) => {
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        if (data) {
            const userData = dataByMonth(data, 'date_joined')
            const chartData = lineChartDataByMonth(userData)
            setChartData(chartData)
        }
    }, [data])
    return (
        <div className='data-card'>
            <Row align="middle" gutter={16} className="data-card__info">
                <Col >
                    <UserOutlined style={{ fontSize: '6rem' }} />
                    <span className="text--main">{num}</span>
                </Col>
                <Col>
                    <span className="text--sub__bigger">Tổng số người dùng</span>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Chart scale={{ count: { min: 0, max: 50 } }}
                        padding={[10, 20, 50, 40]} autoFit height={280} data={chartData} >
                        <LineAdvance
                            shape="smooth"
                            point
                            area
                            position="month*count"
                        // color="city"
                        />
                    </Chart>
                </Col>
            </Row>

        </div >
    )
}

export default UserDataCard
import React, { useState, useEffect } from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';
import './data-card.styles.scss'
import { Row, Col, Avatar } from 'antd'
import { TeamOutlined } from '@ant-design/icons';
import { dataByMonth } from './admin.utils'

const UserDetail = ({ data, adminCount, teacherCount, studentCount, taCount }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        if (data) {
            const chartData = [
                { role: 'Admin', count: adminCount },
                { role: 'Teacher', count: teacherCount },
                { role: 'Teacher Assistant', count: taCount },
                { role: 'Student', count: studentCount },

            ];
            setChartData(chartData)
        }
    }, [data])
    return (
        <div className='data-card'>
            <Row align="middle" gutter={8} className="data-card__info">

                <Col span={24}>
                    <Row gutter={[1, 1]} align="middle">
                        <Col span={6}><span className="text--main">{adminCount}</span>
                            <span className="text--sub__bigger"> Quản trị viên</span></Col>
                        <Col span={6}><span className="text--main">{teacherCount}</span>
                            <span className="text--sub__bigger"> Giảng viên</span>
                        </Col>
                        <Col span={6}><span className="text--main">{taCount}</span>
                            <span className="text--sub__bigger"> Trợ giảng</span>
                        </Col>
                        <Col span={6}><span className="text--main">{studentCount}</span>
                            <span className="text--sub__bigger"> Học viên</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Chart
                        scale={{ count: { min: 0, max: 20 } }}
                        height={250} autoFit data={chartData}
                        interactions={['active-region']}
                        padding={[30, 30, 50, 50]} >
                        <Interval position="role*count" color="role" />
                        {/* <Tooltip shared /> */}
                    </Chart>
                </Col>
            </Row>

        </div >
    )
}

export default UserDetail
import React from 'react'
import { Divider, Row, Col, Layout, Button } from 'antd'
import { TeamOutlined, DownloadOutlined, BookOutlined, BookTwoTone, AppstoreTwoTone, EuroTwoTone, DollarTwoTone } from '@ant-design/icons'
import { formatDate } from '../../utils/text.utils'
import Constants from '../../constants'
import { CSVLink } from 'react-csv'
const { Content } = Layout


const AdminReport = ({ userData, courseData, programData, courseIncomeData, programIncomeData }) => {

    const csvUserData = userData ? userData.map(user => ({
        id: user.id, username: user.username,
        fullname: user.user_profile ? user.user_profile.fullname : 'n/a',
        gender: user.user_profile ? user.user_profile.gender : 'n/a',
        age: user.user_profile ? user.user_profile.age : 'n/a',
        address: user.user_profile ? user.user_profile.address : 'n/a',
        email: user.email, dateJoined: formatDate(user.date_joined, Constants.DD_MM_YYYY),

    })) : []

    const csvCourseData = courseData ? courseData.map(course => ({
        id: course.id,
        name: course.title,
        feeType: course.fee_type,
        price: course.price ? course.price : 'n/a',
        level: course.level,
        field: course.field,
        created_date: formatDate(course.created_date, Constants.DD_MM_YYYY),
        views: course.view_count,
    })) : []

    const csvProgamdata = programData ? programData.map(program => ({
        id: program.id,
        name: program.name,
        courseNum: program.courses_count,
        discount: program.discount,
        discount_percentage: program.discount_percentage,
        field: program.field,
        createdDate: formatDate(program.created_date, Constants.DD_MM_YYYY),
        views: program.view_count,
        status: program.status,
    })) : []

    const csvBuyCourseData = courseIncomeData ? courseIncomeData.map(course => ({
        id: course.id,
        user: course.user,
        money: course.money,
        course: course.course,
        date: formatDate(course.bought_date, Constants.DD_MM_YYYY),
    })) : []

    const csvBuyProgamdata = programIncomeData ? programIncomeData.map(program => ({
        id: program.id,
        user: program.user,
        money: program.money,
        program: program.program,
        date: formatDate(program.bought_date, Constants.DD_MM_YYYY),
    })) : []

    return (
        <Layout>
            <Content style={{ padding: '2rem 4rem', minHeight: 600 }}>
                <h3 className="text--main">Báo cáo</h3>
                <Divider />

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <div className="data-card report-card">
                            <p className="text--sub__bigger"><TeamOutlined className='data-card__icon' />
                            Danh sách người dùng</p>
                            <Divider />
                            <div className="text-center mt-3">
                                <CSVLink data={csvUserData} filename="DS-nguoidung.csv">
                                    <Button type="primary">
                                        <DownloadOutlined />Xuất báo cáo</Button></CSVLink>
                            </div>
                        </div>

                    </Col>
                    <Col span={8}>
                        <div className="data-card report-card">
                            <p className="text--sub__bigger">
                                <BookTwoTone twoToneColor="#a8e6cf" className='data-card__icon' />
                            Danh sách khóa học</p>
                            <Divider />
                            <div className="text-center mt-3">
                                <CSVLink data={csvCourseData} filename="DS-khoahoc.csv">
                                    <Button type="primary">
                                        <DownloadOutlined />Xuất báo cáo</Button></CSVLink>
                            </div>
                        </div>

                    </Col>
                    <Col span={8}>
                        <div className="data-card report-card">
                            <p className="text--sub__bigger">
                                <AppstoreTwoTone twoToneColor="#ff8b94" className='data-card__icon' />
                            Danh sách chương trình học</p>
                            <Divider />
                            <div className="text-center mt-3">
                                <CSVLink data={csvProgamdata} filename="DS-ct.csv">
                                    <Button type="primary">
                                        <DownloadOutlined />Xuất báo cáo</Button></CSVLink>
                            </div>
                        </div>

                    </Col>

                    <Col span={8}>
                        <div className="data-card report-card">
                            <p className="text--sub__bigger">
                                <EuroTwoTone twoToneColor="#f6cd61" className='data-card__icon' />
                                    Người dùng mua khóa học</p>
                            <Divider />
                            <div className="text-center mt-3">
                                <CSVLink data={csvBuyCourseData} filename="DS-muakhoahoc.csv">
                                    <Button type="primary">
                                        <DownloadOutlined />Xuất báo cáo</Button></CSVLink>
                            </div>
                        </div>

                    </Col>
                    <Col span={8}>
                        <div className="data-card report-card">
                            <p className="text--sub__bigger">
                                <DollarTwoTone twoToneColor="#63ace5" className='data-card__icon' />
                            Người dùng mua chương trình học</p>
                            <Divider />
                            <div className="text-center mt-3">
                                <CSVLink data={csvBuyProgamdata} filename="DS-muact.csv">
                                    <Button type="primary">
                                        <DownloadOutlined />Xuất báo cáo</Button></CSVLink>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default AdminReport
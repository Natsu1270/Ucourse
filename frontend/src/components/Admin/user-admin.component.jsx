import React from 'react'
import UserDetail from './user-data-detail.component';
import UserDataCard from './total-user.component';
import { Skeleton, Layout, Row, Col } from 'antd';
import UserPercentage from './user-percentage.component';

const { Content } = Layout

const UserAdmin = ({ userData, loading }) => {

    return (
        <Layout>
            <Content style={{ padding: '2rem 4rem', minHeight: 600 }}>

                <Row gutter={[40, 20]}>
                    <Col span={24}>
                        <Skeleton loading={loading} active>
                            <UserDataCard data={userData.users} num={userData.userCount} />
                        </Skeleton>
                    </Col>
                    <Col span={12}>
                        <Skeleton loading={loading} active>
                            <UserDetail
                                adminCount={userData.adminCount}
                                teacherCount={userData.teacherCount}
                                taCount={userData.taCount}
                                studentCount={userData.studentCount}
                                data={userData.users}
                            />
                        </Skeleton>
                    </Col>
                    <Col span={12}>
                        <div className="data-card">
                            <Skeleton loading={loading} active>
                                <UserPercentage
                                    adminCount={userData.adminCount}
                                    teacherCount={userData.teacherCount}
                                    taCount={userData.taCount}
                                    studentCount={userData.studentCount} />
                            </Skeleton>

                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default UserAdmin
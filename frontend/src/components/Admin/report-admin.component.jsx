import React from 'react'
import { Layout } from 'antd'


const { Content } = Layout


const AdminReport = () => {

    return (
        <Layout>
            <Content style={{ padding: '2rem 4rem', minHeight: 600 }}>
                <div className="data-card">
                    <h3 className="text--main">Báo cáo</h3>
                </div>
            </Content>
        </Layout>
    )
}

export default AdminReport
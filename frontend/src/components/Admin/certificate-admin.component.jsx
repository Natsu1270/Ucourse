import React, { useEffect, useState } from 'react'
import { Skeleton, Layout, Row, Col } from 'antd';


const { Content } = Layout

const CertificateAdmin = () => {

    useEffect(() => {

    }, [])

    return (
        <Layout>
            <Content style={{ padding: '2rem 4rem', minHeight: 600 }}>
                <h3 className="text--main">Thống kê chương trình học và cấp phát chứng chỉ</h3>
            </Content>
        </Layout>
    )
}

export default CertificateAdmin



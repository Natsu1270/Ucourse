import React, { useState } from 'react'
import { Divider, Input, Row, Col, message } from 'antd'


const { Search } = Input

const CertificateInqury = () => {

    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({})

    const inqury = async (value) => {
        setLoading(true)
        try {
            // const {data} = await 
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }

    return (
        <section className="section-10 page">
            <div className="page-card-2">
                <h3 className="title--big">
                    Tra cứu thông tin chứng chỉ
                </h3>

                <Divider />
                <Row gutter={16}>
                    <Col>
                        Nhập dãy số trên chứng chỉ
                </Col>
                    <Col>
                        <Search size="large" enterButton onSearch={inqury} loading={loading} placeholder="Nhập mã chứng chỉ..." />
                    </Col>
                </Row>
            </div>


        </section>
    )
}

export default CertificateInqury
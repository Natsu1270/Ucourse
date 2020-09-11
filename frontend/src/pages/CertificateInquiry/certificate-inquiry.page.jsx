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

                <Row gutter={16} align="middle" justify="center" className="mt-5">
                    <Col>
                        <span className="text--sub__bigger3 text-black">Nhập dãy số trên chứng chỉ</span>
                    </Col>
                    <Col>
                        <Search size="large" enterButton onSearch={inqury} loading={loading} placeholder="Nhập mã chứng chỉ..." />
                    </Col>
                </Row>
                <Divider />
            </div>


        </section>
    )
}

export default CertificateInqury
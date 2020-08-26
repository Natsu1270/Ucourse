import React, { useState } from 'react'
import { Steps, Button, message } from 'antd'

const { Step } = Steps;

const GuideLinePage = () => {

    const [state, setState] = useState(0)

    function next() {
        setState(state + 1)
    }

    function prev() {
        setState(state - 1)
    }

    const steps = [
        {
            title: 'Đăng nhập/ Đăng ký tài khoản',
            content: 'Hình đăng nhập',
        },
        {
            title: 'Tìm kiếm/ Khám phá',
            content: 'Hình ở đây',
        },
        {
            title: 'Click vào một khóa học',
            content: 'Hình',
        },
        {
            title: 'Chọn đăng ký',
            content: 'Hình',
        },
        {
            title: 'Thanh toán',
            content: 'Hình',
        },
        {
            title: 'Đăng ký lớp học',
            content: 'Hình',
        },
    ];

    return (
        <section className="section-10 page-2">
            <div className="page-card">
                <Steps current={state}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[state].content}</div>
                <div className="steps-action">
                    {state < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Bước kế tiếp
                        </Button>
                    )}
                    {state === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Hoàn tất
                        </Button>
                    )}
                    {state > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Quay lại
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default GuideLinePage
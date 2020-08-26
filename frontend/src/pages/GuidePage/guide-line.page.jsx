import React, { useState } from 'react'
import { Steps, Button, message, Divider } from 'antd'
import file from '../../assets/c1.jpg'

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
            content: 'Bước đầu tiên là đăng nhập',
            src: file

        },
        {
            title: 'Tìm kiếm/ Khám phá',
            content: 'Hình ở đây',
            src: file
        },
        {
            title: 'Click vào một khóa học',
            content: 'Hình',
            src: file
        },
        {
            title: 'Chọn đăng ký',
            content: 'Hình',
            src: file
        },
        {
            title: 'Thanh toán',
            content: 'Hình',
            src: file
        },
        {
            title: 'Đăng ký lớp học',
            content: 'Hình',
            src: file
        },
    ];

    return (
        <section className="section-10 page-2">

            <div className="page-card">
                <h2 className="title--big text-center">Các bước đăng ký lớp học</h2>
                <Divider />
                <Steps current={state}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    <h3>{steps[state].content}</h3>
                    <img width={500} src={steps[state].src} />
                </div>
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
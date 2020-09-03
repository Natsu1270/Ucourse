import React, { useState } from 'react'
import { Steps, Button, message, Divider } from 'antd'
import dangnhap from '../../assets/dang-nhap.png'
import khampha from '../../assets/trang-kham-pha.png'
import khoahoc from '../../assets/khoahoc.PNG'
import chondangky from '../../assets/chondangky.png'
import thanhtoan from '../../assets/thanhtoan.png'
import chonlop from '../../assets/chon-lop.png'


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
            content: 'Bước đầu tiên là đăng nhập, nếu chưa có tài khoản vui lòng đăng ký!',
            src: dangnhap

        },
        {
            title: 'Tìm kiếm/ Khám phá',
            content: 'Khám phá các lĩnh vực bạn quan tâm tại đây',
            src: khampha
        },
        {
            title: 'Click vào một khóa học',
            content: 'Xem thông tin chi tiết khóa học',
            src: khoahoc
        },
        {
            title: 'Chọn đăng ký',
            content: 'Nhấn chọn nút "Đăng ký học"',
            src: chondangky
        },
        {
            title: 'Thanh toán',
            content: 'Thanh toán qua ví điện tử MoMo',
            src: thanhtoan
        },
        {
            title: 'Đăng ký lớp học',
            content: 'Chọn lớp muốn đăng ký và hoàn tất!',
            src: chonlop
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
                <div className="steps-content" style={{ maxHeight: '50vh', overflow: 'auto' }}>
                    <h3>{steps[state].content}</h3>
                    <img width={800} src={steps[state].src} />
                </div>
                <div className="steps-action">
                    {state < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Bước kế tiếp
                        </Button>
                    )}
                    {state === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Hoàn thành')}>
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
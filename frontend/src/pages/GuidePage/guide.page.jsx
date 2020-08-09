import React, {useEffect} from 'react'
import aboutImg from '../../assets/about.png'

const GuidePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="section-10 page section--about cs-about">
            <h2 className="title--big text-center">Hướng dẫn thanh toán</h2>
            <div className="row slide">
                <div className="col-md-7 cs-about--text cs-about--left bradius mt-3">
                    {/* <span className="cs-about--text__main">H​ƯỚNG DẪN GIAO DỊCH THANH TOÁN TRỰC TUYẾN AN TOÀN</span> */}
                    <p></p>
                  
                    <span className="cs-about--text__main">Thanh toán qua tài khoản MOMO</span>
                    <p className="cs-about--text__sub">
                        <p>Bước 1. Mở ví MoMo, chọn "Quét Mã".</p>
                        <p>Bước 2. Quét mã QR. </p>
                        <p>Bước 3. Nhập số tiền cần thanh toán.</p>
                        <p>Bước 4. Kiểm tra và Bấm "Xác nhận".</p>
                        <b>Tham khảo chi tiết tại</b><a href="https://momo.vn/huong-dan/huong-dan-thanh-toan-bang-hinh-thuc-quet-ma">    Link  </a>
                        
                    <br/>
                    <span className="cs-about--text__main">Thanh toán qua thẻ nội địa</span>
                
                        <p> Bước 1. Chọn thanh toán bằng thẻ nội địa NAPAS trên trang web.</p>
                        <p> Bước 2. Nhập thông tin thẻ tại cổng thanh toán nội địa NAPAS.</p>
                        <p>Sau khi chọn hình thức thanh toán qua cổng thanh toán nội địa NAPAS, khách hàng được chuyển tới cổng thanh toán nội địa NAPAS. Tại cổng thanh toán nội địa NAPAS, khách hàng thực hiện nhập các thông tin thẻ theo yêu cầu của NHPH.</p>
                        <p> Bước 3. Xác thực OTP </p>
                        <b>Tham khảo chi tiết tại</b><a href="https://napas.com.vn/san-pham-dich-vu/danh-cho-khach-hang-ca-nhan/huong-dan-giao-dich-thanh-toan-an-toan/Thong-tin-san-pham-dich-vu-4-20.html">   Link   </a>
                        </p>
                </div>

                <div className="col-md-5 img-area">
                    {/* <div className="swiper-slide swiper-slide-active" style ="width:150px">
                    <div dangerouslySetInnerHTML={{__html:'<img data-src="https://static.mservice.io/img/momo-upload-api-191011111736-637063894564375003.png"/>'}}></div>
                    </div> */}
                <div dangerouslySetInnerHTML={{__html:'<iframe src="https://static.mservice.io/img/momo-upload-api-191008171113-637061514736041034.png" width="100%" height="350" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" ></iframe>'}}></div>
                <br/>
                <div dangerouslySetInnerHTML={{__html:'<iframe src="https://tcxd.vn/wp-content/uploads/2020/07/The-Napas-la-gi-.jpg" width="100%" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" ></iframe>'}}></div>
                
            </div>
            </div>
        </section>
    )
}

export default GuidePage
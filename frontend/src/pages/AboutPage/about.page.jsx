import React from 'react'
import aboutImg from '../../assets/about.png'

const AboutPage = () => {
    return (
        <section className="section-10 section--about cs-about">
            <h2 className="title--big text-center">About us</h2>
            <div className="row slide">
                <div className="col-md-6 cs-about--text cs-about--left bradius mt-3">
                    <span className="cs-about--text__main">A piece of history</span>
                    <p></p>
                    <p className="cs-about--text__sub">Được hình thành vào 11/2019, Trung tâm đào tạo trực
                        tyến <b>Csource</b> đã và đang đạt được những thành công
                        vô cùng nổi bật. <b>Csource</b> là một trung tâm đào tạo về lĩnh vực công nghệ thông tin. Trung
                        tâm được
                        thành lập bởi 2 sinh viên Bùi Duy Hùng và Trần Thị Anh của Khoa Khoa học & Kỹ thuật Máy tính,
                        Trường Đại học
                        Bách Khoa - Đại học Quốc gia Thành phố Hồ Chí Minh. <b>Csource</b> cung cấp các khóa học hướng
                        tới tất cả các
                        đối tượng và lứa tuổi có nhu cầu nâng cao kiến thức về lĩnh vực công nghệ thông tin. </p>
                    <br />
                    <span className="cs-about--text__main">Our vision</span>
                    <p className="cs-about--text__sub"><b>Csource</b> kết hợp 2 hình thức đào tạo: Đào tạo tập trung và mua
                        bán khóa học trực tuyến bằng cách cung
                        cấp các khoá học trực tuyến đa phương tiện đồng thời có các bài giảng tương tác thực giữa giảng
                        viên và người
                        học. Kết hợp hệ thống kiểm tra đánh giá năng lực và cung cấp các chứng chỉ tương ứng với kết quả
                        của học viên.
                        Do đó bất cứ ai cũng có thể tham gia, tiết kiệm chi phí và thời gian, cũng như chủ động trong
                        việc sắp xếp
                        thời gian của mình.</p>
                    <p className="cs-about--text__sub">Trong những năm sắp tới, trung tâm dự kiến sẽ mở thêm nhiều khóa học
                        và thu hút thêm đông đảo các đối
                        tượng học viên.
                    </p>
                </div>

                <div className="col-md-6 img-area">
                    <div className="img-fluid align-center img-about">
                        <img src={aboutImg} width="100%" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPage
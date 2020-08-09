import React, {useEffect} from 'react'
import aboutImg from '../../assets/about.png'

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="section-10 page section--about cs-about">
            <h2 className="title--big text-center">Liên hệ</h2>
            <div className="row slide">
                <div className="col-md-7 cs-about--text cs-about--left bradius mt-3">
                    <span className="cs-about--text__main">Thông tin</span>
                    <p></p>
                        <p className="cs-about--text__sub"><b>Trụ sở:</b> số 108, đường Tân Lập, phường 4, quận 11, thành phố Hồ Chí Minh</p>
                        <p className="cs-about--text__sub"><b>Điên thoại:</b> (08) 388.678.77  -  Fax: (08) 388.678.88</p>
                         <p className="cs-about--text__sub"><b>Email:</b> trungtamdaotaoCongngheUcourse@gmail.com</p>
                         <p className="cs-about--text__sub"><b>Website:</b> www.daotaoucorse.com</p>
                         <p className="cs-about--text__sub"><b>Tổng đài tư vấn:</b> (08) 111.222.33 (từ 8:00 - 21:00)</p>

                    <br/>
                </div>

                <div className="col-md-5 img-area">    
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6916844288376!2d106.65327931423681!3d10.758227992333863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef28887405d%3A0xc9de6139aea1bb43!2zMTA4IFTDom4gS2hhaSwgUGjGsOG7nW5nIDQsIFF14bqtbiAxMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1596955066996!5m2!1svi!2s" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" ></iframe> */}
                <div dangerouslySetInnerHTML={{__html:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6916844288376!2d106.65327931423681!3d10.758227992333863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef28887405d%3A0xc9de6139aea1bb43!2zMTA4IFTDom4gS2hhaSwgUGjGsOG7nW5nIDQsIFF14bqtbiAxMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1596955066996!5m2!1svi!2s" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" ></iframe>'}}></div>
                </div>  
            </div>
        </section>
    )
}

export default ContactPage
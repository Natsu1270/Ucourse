import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/temp-logo.png'


const Footer = () => {
    return (
        <footer className="page-footer font-small blue ">

            <div className="container-fluid text-center text-md-left pt-2">

                <div className="row">

                    <div className="col-md-6 mt-md-0 mt-3">
                        <h1 className="text-white">UCourse</h1>
                        <br />
                        <p className="text-white ">Learn online, ear certificates</p>
                        <div className="img-fluid align-center mt-3 mb-3 footer-logo">
                            <img src={logo} width="100px" alt="logo" />
                        </div>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-3 mb-md-0 mb-3 mt-2">

                        <h5 className="text-uppercase text-white">TRỢ GIÚP</h5>
                        <br />

                        <ul className="list-unstyled">
                            <li>
                                <Link to="/cauhoi"> Các câu hỏi thường gặp </Link>
                            </li>
                            <li>
                                <Link to="/huongdan-thanhtoan">Hướng dẫn thanh toán</Link>
                            </li>
                            <li>
                                <Link to="/taikhoan-giaodich">Tài khoản giao dịch</Link>
                            </li>
                            <li>
                                <Link to="/lienhe">Liên hệ</Link>
                            </li>
                        </ul>

                    </div>

                    <div className="col-md-3 mb-md-0 mb-3 mt-2">

                        <h5 className="text-uppercase text-white">KẾT NỐI VỚI CHÚNG TÔI</h5>
                        <br />
                        <ul className="list-unstyled">
                            <li>
                                <i className="fa fa-envelope-square"></i><a  href="mailto:trungtamdaotaoCongngheUcourse@gmail.com"> Email</a>
                            </li>

                            <li>
                                <i className="fab fa-facebook-square"></i><a href=""> Facebook </a>
                            </li>
                            <li>

                                <i className="fab fa-twitter-square"></i><a href ="https://twitter.com/TUcourse"> Twitter</a>
                            </li>

                            <li>
                                <i className="fab fa-google-plus-square"></i><a href ="https://twitter.com/TUcourse"> Google plus</a>

                            </li>
                        </ul>

                    </div>

                </div>

            </div>

            <div className="footer-copyright text-center py-3">©2019 Copyright:
                <Link to="/"> UCOURSE</Link>
            </div>
        </footer>

    )
}

export default Footer

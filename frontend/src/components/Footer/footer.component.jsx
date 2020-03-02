import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="page-footer font-small blue ">

            <div className="container-fluid text-center text-md-left pt-5">

                <div className="row">

                    <div className="col-md-6 mt-md-0 mt-3">
                        <h1 className="text-white">CSourse</h1>
                        <br />
                        <p className="text-white ">Learn online, ear certificates</p>
                        <div className="img-fluid align-center mt-3 mb-3 footer-logo">
                            <img src="" width="200px" alt="logo" />
                        </div>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-3 mb-md-0 mb-3 mt-2">

                        <h5 className="text-uppercase">TRỢ GIÚP</h5>
                        <br />

                        <ul className="list-unstyled">
                            <li>
                                <Link to="#"> Hướng dẫn đăng ký </Link>
                            </li>
                            <li>
                                <Link to="#">Hướng dẫn thanh toán</Link>
                            </li>
                            <li>
                                <Link to="#">Tài khoản giao dịch</Link>
                            </li>
                            <li>
                                <Link to="#">Liên hệ</Link>
                            </li>
                        </ul>

                    </div>

                    <div className="col-md-3 mb-md-0 mb-3 mt-2">

                        <h5 className="text-uppercase">KẾT NỐI VỚI CHÚNG TÔI</h5>
                        <br />
                        <ul className="list-unstyled">
                            <li>
                                <i className="fa fa-envelope-square"></i><a> Email</a>
                            </li>
                            <li><i className="fab fa-facebook-square"></i><a> Facebook </a></li>
                            <li>
                                <i className="fab fa-twitter-square"></i><a> Twitter</a>
                            </li>
                            <li>
                                <i className="fab fa-google-plus-square"></i><a> Google plus</a>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>

            <div className="footer-copyright text-center py-3">©2019 Copyright:
                <Link to="#">CsourceTraining.com</Link>
            </div>
        </footer>

    )
}

export default Footer

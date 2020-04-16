import React from 'react'
import {Result, Button} from 'antd'
import {Link} from "react-router-dom";

const Page404NotFound = () => {

    return <div className="page page404 section-10">
        <div className="page__content">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><Link to="/">Trang chủ</Link></Button>}
            />
        </div>
    </div>
};


export default Page404NotFound
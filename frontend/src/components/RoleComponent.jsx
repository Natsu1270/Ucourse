import React from 'react'
import ResultComponent from './Common/result.component'
import Constants from '../constants'
import { Redirect } from 'react-router-dom'

const RoleComponent = ({
    roleCode, token, StudentComponent, TeacherTAComponent, AdminComponent, ...otherProps
}) => {
    if (roleCode === undefined) return (
        <section className="page section-10">
            <div className="page-card">
                <ResultComponent type={Constants.RESULT_TYPE_NODATA} title="Lỗi" info="Xin lỗi vì sự cố này" />
            </div>
        </section>
    )
    if (roleCode === "AD") {
        return <Redirect to="/admin" />
    }
    if (roleCode === "TC" || roleCode === "TA") {
        return <TeacherTAComponent token={token} {...otherProps} />
    }
    return <StudentComponent token={token} {...otherProps} />
}

export default RoleComponent
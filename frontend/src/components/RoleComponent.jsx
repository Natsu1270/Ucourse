import React from 'react'

const RoleComponent = ({
    roleCode, token, StudentComponent, TeacherTAComponent, AdminComponent, ...otherProps
}) => {
    if (roleCode === undefined) return
    if (roleCode === "AD") {
        return <AdminComponent token={token} {...otherProps} />
    }
    if (roleCode === "TC" || roleCode === "TA") {
        return <TeacherTAComponent token={token} {...otherProps} />
    }
    return <StudentComponent token={token} {...otherProps} />
}

export default RoleComponent
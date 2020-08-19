import React from 'react'

const RoleComponent = ({ roleCode, token, StudentComponent, TeacherTAComponent, AdminComponent }) => {
    if (roleCode === undefined) return
    if (roleCode === "AD") {
        return <AdminComponent token={token} />
    }
    if (roleCode === "TC" || roleCode === "TA") {
        return <TeacherTAComponent token={token} />
    }
    return <StudentComponent token={token} />
}

export default RoleComponent
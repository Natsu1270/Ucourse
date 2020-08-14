export const isRoleTeacherOrTA = (role) => {
    return role ? role === 'TC' || role === 'TA' ? true : false : false
}
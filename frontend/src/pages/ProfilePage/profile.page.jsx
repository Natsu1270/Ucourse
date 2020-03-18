import React from 'react'

import ProfileMenu from "../../components/Profile/ProfileMenu/profile-menu.components";
import ProfileSetting from "../../components/Profile/ProfileSetting/profile-setting.component";

const ProfilePage = () => {

    return (
        <div className="profile-page section">
            <ProfileMenu />
            <ProfileSetting />
        </div>
    )
}

export default ProfilePage
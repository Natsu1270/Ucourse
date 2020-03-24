import React from 'react'
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {profileLoadingSelector} from "../../../redux/Profile/profile.selects";
import ProfileSetting from "./profile-setting.component";
import WithSpinner from "../../Hocs/with-spinner.component";


const {profileLoading} = useSelector(createStructuredSelector({
    profileLoading: profileLoadingSelector
}))

const ProfileSettingContainer = WithSpinner()

export default ProfileSettingContainer




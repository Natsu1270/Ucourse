import React, {useEffect} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {useSelector, useDispatch} from 'react-redux'

import {currentUserSelector, tokenSelector} from '../../redux/Auth/auth.selects'

import ProfileMenu from '../../components/Profile/ProfileMenu/profile-menu.components'
import ProfileSetting from '../../components/Profile/ProfileSetting/profile-setting.component'
import AccountSetting from '../../components/Profile/AccountSetting/account-setting.component'
import {profileLoadingSelector, userProfileSelector} from "../../redux/Profile/profile.selects";
import {getProfileStart} from "../../redux/Profile/profile.actions";

const ProfilePage = ({match}) => {
    const {currentUser, token, userProfile, isProfileLoading} = useSelector(createStructuredSelector({
        currentUser: currentUserSelector,
        token: tokenSelector,
        userProfile: userProfileSelector,
        isProfileLoading: profileLoadingSelector
    }));

    return (
        <div className='profile-page section'>
            <Router>
                <ProfileMenu currentUser={currentUser} userProfile={userProfile} match={match}/>
                <Route exact path={match.url}>
                    <ProfileSetting profile={userProfile} isLoading={isProfileLoading} token={token}/>
                </Route>
                <Route exact path={`${match.url}/account`}>
                    <AccountSetting userProfile={userProfile} currentUser={currentUser} token={token}/>
                </Route>

            </Router>
        </div>
    )
}

export default ProfilePage
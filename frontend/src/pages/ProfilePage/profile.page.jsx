import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { currentUserSelector, tokenSelector } from '../../redux/Auth/auth.selects'

import ProfileMenu from '../../components/Profile/ProfileMenu/profile-menu.components'
import ProfileSetting from '../../components/Profile/ProfileSetting/profile-setting.component'
import AccountSetting from '../../components/Profile/AccountSetting/account-setting.component'

const ProfilePage = ({ match }) => {

    const { currentUser, token } = useSelector(createStructuredSelector({
        currentUser: currentUserSelector,
        token: tokenSelector
    }))

    return (
        <div className='profile-page section'>
            <Router>
                <ProfileMenu currentUser={currentUser} match={match} />
                <Route exact path={match.url}>
                    <ProfileSetting />
                </Route>
                <Route exact path={`${match.url}/account`}>
                    <AccountSetting currentUser={currentUser} token={token} />
                </Route>


            </Router>
        </div>
    )
}

export default ProfilePage
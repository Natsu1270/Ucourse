import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import ProfileMenu from '../../components/Profile/ProfileMenu/profile-menu.components'
import ProfileSetting from '../../components/Profile/ProfileSetting/profile-setting.component'
import AccountSetting from '../../components/Profile/AccountSetting/account-setting.component'

const ProfilePage = () => {

    return (
        <div className='profile-page section'>
            <Router>
                <ProfileMenu />
                <Switch>
                    <Route exact path='/profile'>
                        <ProfileSetting />
                    </Route>
                    <Route exact path='/profile/account'>
                        <AccountSetting />
                    </Route>

                </Switch>

            </Router>
        </div>
    )
}

export default ProfilePage
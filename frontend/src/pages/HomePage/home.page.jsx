import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { showRLModal } from '../../redux/UI/ui.actions'
import MainBanner from "../../components/Banners/main-banner.component";
import SubBanner from "../../components/Banners/sub-banner.component";
import banner from '../../assets/banner.png'

const HomePage = ({ currentUser }) => {
    return (
        <main className="home-page">
            <MainBanner currentUser = {currentUser}/>
            <SubBanner />
        </main>
    )
};

export default HomePage
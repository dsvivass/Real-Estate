import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import githubImage from '../../assets/github.png'

function Header() {
    return (
        <div className="topbar">
            <div className="topbar__logo">
                <img src="https://www.voyansi.com/hs-fs/hubfs/Voyansi_Logo_Horizontal_RGB.png?width=500&name=Voyansi_Logo_Horizontal_RGB.png" alt="" className="topbar__logo-image" />
                <p></p>
            </div>
            <div className="topbar__navigation">
                <div className="topbar__navigation-item">
                    <Link to='/Real-Estate' style={{ textDecoration: 'none' }}><p className="topbar__navigation-item-text">Real estate</p></Link>

                </div>
            </div>
            <div className="topbar__create">
                <div className="topbar__create-item--special">
                    <a href="https://github.com/dsvivass/Real-Estate" style={{ textDecoration: 'none' }} target='_blank' ><img src={githubImage} alt="" height={32} /></a>

                </div>
            </div>
        </div>
    )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

function Header() {
    return (
        <div className="topbar">
            <div className="topbar__logo">
                <img src="https://www.voyansi.com/hs-fs/hubfs/Voyansi_Logo_Horizontal_RGB.png?width=500&name=Voyansi_Logo_Horizontal_RGB.png" alt="" className="topbar__logo-image" />
                <p></p>
            </div>
            <div className="topbar__navigation">
                <div className="topbar__navigation-item">
                    <Link to='/' style={{ textDecoration: 'none' }}><p className="topbar__navigation-item-text">Rooms</p></Link>

                </div>
            </div>
            <div className="topbar__create">
                <div className="topbar__create-item--special">
                    <Link to='/create' style={{ textDecoration: 'none' }}><p className="topbar__create-item--special-text">+ Create</p></Link>

                </div>
            </div>
        </div>
    )
}

export default Header
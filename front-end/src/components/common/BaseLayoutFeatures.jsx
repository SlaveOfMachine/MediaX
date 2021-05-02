import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [expanded, toggle] = useState(false);

    return (
        <div className='base-navbar smooth-shadow'>
            <div className='nav-brand-icons'>
                <div className="nav-brand">
                    { process.env.REACT_APP_NAME || 'App' }
                </div>
                <div onClick={() => toggle(!expanded)}>
                    <MenuIcon />
                </div>
            </div>
            <div className={`nav-menu ${expanded ? '' : 'desktop-element'}`}>
                <Link to='/dashboard' className='base-link'>DASHBOARD</Link>
                <Link to='/settings' className='base-link'>SETTINGS</Link>
                <button className='base-link' onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
}

function Loader() {
    return (
        <div className='axios-loader-container'>
            <div className='axios-loader'></div>
        </div>
    )
}

function AxiosMessage() {
    return (
        <div className='axios-message-container'>
            <div className='axios-message'>Server error</div>
        </div>
    )
}

function logout() {
    axios.post('/auth/logout')
        .then(response => {
            if (response.data.success) {
                localStorage.removeItem('accessToken');
                window.location.reload();
            }
        })
        .catch(error => console.log(error));
}

function MenuIcon() {
    return (
        <div className="menu-icon-container mobile-element">
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
        </div>
    )
}

export {
    Navbar,
    Loader,
    AxiosMessage,
}
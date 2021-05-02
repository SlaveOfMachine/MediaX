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
                <Link to='/collections' className='base-link'>COLLECTIONS</Link>
                <Link to='/settings' className='base-link'>SETTINGS</Link>
                <Link to='/channel' className='base-link'>CHANNEL</Link>
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

function PageNotFound() {
    return (
        <div className='page-not-found base-card'>
            404 Not Found
        </div>
    )       
}

function BaseCard(props) {
    const { title, count } = props;
    return <div className='base-card base-card-component'>
        <div className="base-card-title">{ title }</div>
        <div className="base-card-count">{ count }</div>
    </div>
}

export {
    Navbar,
    Loader,
    AxiosMessage,
    PageNotFound,
    BaseCard,
}
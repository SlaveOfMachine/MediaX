import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultUser from '../../assets/icons/defaultUser.svg';

function Navbar(props) {
    const [expanded, toggle] = useState(false);
    const [popup, togglePopup] = useState(false);

    return (
        <div className='base-navbar-container' onMouseLeave={() => togglePopup(false)}>
            <div className='base-navbar smooth-shadow dark'>
                <div className='nav-brand-icons'>
                    <div className="nav-brand">
                        { process.env.REACT_APP_NAME || 'App' }
                    </div>
                    <div onClick={() => toggle(!expanded)}>
                        <MenuIcon />
                    </div>
                </div>
                <div className={`nav-menu ${expanded ? '' : 'desktop-element'}`}>
                    <NavLinks verified={props.verifiedUser} />
                    <span className='desktop-element control-panel' onClick={() => togglePopup(!popup)}>
                        <img src={defaultUser} alt="profile"/>
                    </span>
                </div>
            </div>
            <BaseNavPopup toggle={popup} logout={logout} />
        </div>
    )
}

function NavLinks(props) {
    if (props.verified) {
        return (
            <span className='nav-links'>
                <Link to='/dashboard' className='nav-link'>DASHBOARD</Link>
                <Link to='/collections' className='nav-link'>COLLECTIONS</Link>
                <Link to='/settings' className='nav-link'>SETTINGS</Link>
                <Link to='/channel' className='nav-link'>CHANNEL</Link>
                <span className='nav-link mobile-element' onClick={logout}>LOGOUT</span>
            </span>
        )
    }
    return <span className='nav-link mobile-element' onClick={logout}>LOGOUT</span>
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
                window.location.replace('/');
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
    return (
        <div className='base-card base-card-component'>
            <div className="base-card-title">{ title }</div>
            <div className="base-card-count">{ count }</div>
        </div>
    )
}

function BaseNavPopup(props) {
    return (
        <div className={`base-popup-container smooth-shadow ${props.toggle ? '' : 'd-none'}`}>
            <div className='nav-popup-menu'>
                <div className='nav-popup-menu-item' onClick={() => props.logout()}>Logout</div>
            </div>
        </div>
    )
}

function BaseButton(props) {
    return (
        <div className="base-button-container">
            <button onClick={props.clicked} className={`base-button ${props.type || 'dark'}`}>{props.title}</button>
        </div>
    )
}

export {
    Navbar,
    Loader,
    AxiosMessage,
    PageNotFound,
    BaseCard,
    BaseButton,
}
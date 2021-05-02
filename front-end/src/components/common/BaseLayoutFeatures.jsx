import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='base-navbar smooth-shadow'>
            <div className="nav-brand">
                { process.env.REACT_APP_NAME || 'App' }
            </div>
            <div className="nav-menu">
                <a href='#' className='base-link' onClick={logout}>LOGOUT</a>
            </div>
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

export {
    Navbar,
}
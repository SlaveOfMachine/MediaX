import React from 'react';
import Icon from '@mdi/react'

const SIDEBAR_MENU = [
    { section: 'profile', label: 'PROFILE' },
    { section: 'subscription', label: 'SUBSCRIPTION' },
    { section: 'integrations', label: 'INTEGRATION' },
];
function Settings () {
    return (
        <div className='settings-container'>
            <div className="settings-content">
                <SideBar />
                <div className="settings-body">
                </div>
                <div className="settings-foot"></div>
            </div>
        </div>
    )
}

function SideBar() {
    const sidebarContents = SIDEBAR_MENU.map((menu,index) => {
        return <div
            className='sidebar-content'
            key={index}>
            <span className="sidebar-label">
                <i className='account-circle'></i>
                { menu.label }
            </span>
        </div>
    })
    return <div className='settings-sidebar'>
        { sidebarContents }
    </div>
}


export default Settings;
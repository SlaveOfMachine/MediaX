import React from 'react';
import Icon from '@mdi/react';
import {
    mdiAccount,
    mdiChip,
    mdiCurrencyUsd
} from '@mdi/js';

const SIDEBAR_MENU = [
    { section: 'profile', label: 'PROFILE', icon: mdiAccount },
    { section: 'subscription', label: 'SUBSCRIPTION', icon: mdiCurrencyUsd },
    { section: 'integrations', label: 'INTEGRATION', icon: mdiChip },
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
            className="sidebar-content"
            key={index}
        >
            <Icon className="sidebar-icon" path={menu.icon} size={1} />
            <span className="sidebar-label">
                { menu.label }
            </span>
        </div>
    })
    return <div className='settings-sidebar smooth-shadow'>
        { sidebarContents }
    </div>
}


export default Settings;
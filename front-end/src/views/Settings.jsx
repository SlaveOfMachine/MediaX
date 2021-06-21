import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiAccount,
    mdiChip,
    mdiCurrencyUsd
} from '@mdi/js';
import SettingAccount from '../components/settings/SettingAccount';

const SIDEBAR_MENU = [
    { section: 'account', label: 'ACCOUNT', icon: mdiAccount },
    { section: 'subscription', label: 'SUBSCRIPTION', icon: mdiCurrencyUsd },
    { section: 'integrations', label: 'INTEGRATION', icon: mdiChip },
];

function Settings () {
    const [section, setSection] = useState('account');
    return (
        <div className='settings-container'>
            <div className="settings-content">
                <SideBar setSection={setSection} activeSection={section} />
                <div className="settings-body">
                    <SettingSection section={section} />
                </div>
            </div>
        </div>
    )
}

function SideBar(props) {
    const sidebarContents = SIDEBAR_MENU.map((menu,index) => {
        const selected = props.activeSection === menu.section ? 'sidebar-content-highlighted' : '';
        return <div
            className={`sidebar-content ${selected}`}
            key={index}
            onClick={() => {props.setSection(menu.section)}}
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

function SettingSection(props) {
    const section = props.section;
    switch (section) {
        case 'account':
            return <SettingAccount />
        default:
            return '';
    }
}


export default Settings;
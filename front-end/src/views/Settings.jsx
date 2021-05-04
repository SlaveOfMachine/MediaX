import React from 'react';
import BaseInput from '../components/common/BaseInput';
import { BaseButton } from '../components/common/BaseLayoutFeatures';

const SIDEBAR_MENU = [
    { section: 'profile', label: 'PROFILE' },
    { section: 'subscription', label: 'SUBSCRIPTION' },
    { section: 'integrations', label: 'INTEGRATION' },
];
class Settings extends React.Component {
    state = {
        active: SIDEBAR_MENU[0]
    }

    switchSection = (active) => {
        this.setState({ active });
    }

    render() {
        return (
            <div className='settings-container'>
                <div className="settings-content">
                    <div className="settings-body">
                        <SettingsSidebar active={this.state.active} switchSection={this.switchSection}/>
                        <SettingsSection active={this.state.active} />
                    </div>
                    <div className="settings-foot"></div>
                </div>
            </div>
        )
    }
}

function SettingsSidebar(props) {
    const active = props.active.section;
    const items = [];
    for (let item of SIDEBAR_MENU) {
        items.push(
            <div
                key={item.section}
                className={`settings-sidebar-item sidebar-item-${active === item.section ? 'active' : 'inactive'}`}
                onClick={() => props.switchSection(item)}
            >
                <div className="sidebar-item-text">
                    { item.label }
                </div>
            </div>
        );
    }
    return (
        <div className='settings-sidebar'>
            {items}
        </div>
    )
}

function SettingsSection(props) {
    const active = props.active;
    const section = getSection(props.active);
    return (
        <div className="settings-section smooth-shadow">
            <div className="setting-section-title">{ active.label }</div>
            { section }
        </div>
    )
}

function getSection(active) {
    switch (active.section) {
        case 'profile':
            return <ProfileSection />
        
        case 'subscription':
            return <SubscriptionSection />
        
        case 'integrations':
            return <IntegrationsSection />
        
        default:
            return 'No Section Found'
    }
}

function ProfileSection() {
    return (
        <div className='section-content'>
            <div className="sub-section">
                <h3 className='sub-section-title'>Personal</h3>
                <div className='section-inputs'>
                    <BaseInput placeholder='Enter Name' label='Name' id='name' />
                    <BaseInput placeholder='Enter Email' label='Email' id='email' toggleText='CHANGE' disabled={true} />
                </div>
            </div>
            <div className="sub-section">
                <h3 className='sub-section-title'>Security</h3>
                <div className='section-inputs'>
                    <BaseInput placeholder='Enter Password' label='Password' id='password' />
                    <BaseInput placeholder='Confirm Old Password' label='Confirm Password' id='confirm_password' />
                </div>
            </div>
            <div className="section-buttons">
                <BaseButton title='Save' type='primary' />
                <BaseButton title='Reset' type='warning' />
            </div>
        </div>
    )
}

function SubscriptionSection() {
    return (
        <div>SUBSCRIPTION SECTION</div>
    )
}

function IntegrationsSection() {
    return (
        <div>INTEGRATIONS SECTION</div>
    )
}

export default Settings;
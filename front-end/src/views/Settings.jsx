import React from 'react';
import BaseInput from '../components/common/BaseInput';
import { BaseButton } from '../components/common/BaseLayoutFeatures';
import axios from '../helpers/axios';

const SIDEBAR_MENU = [
    { section: 'profile', label: 'PROFILE' },
    { section: 'subscription', label: 'SUBSCRIPTION' },
    { section: 'integrations', label: 'INTEGRATION' },
];
class Settings extends React.Component {
    state = {
        active: SIDEBAR_MENU[0],
        user: {},
    }

    componentDidMount() {
        this.getProfileData();
    }

    switchSection = (active) => {
        this.setState({ active });
        switch (active.section) {
            case 'profile':
                return this.getProfileData();
            default:
                console.log('Failed to get data');
        }
    }

    getProfileData = () => {
        axios.get('settings/user').then(response => {
                const user = response.data.user;
                if (user) {
                    user.password = '';
                    user.confirm_password = '';
                    this.setState({ user });
                }
            }).catch(error => console.log(error));
    }

    handleInputChange = (event) => {
        const user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    saveSettings = () => {
        console.log('save');
    }

    render() {
        return (
            <div className='settings-container'>
                <div className="settings-content">
                    <div className="settings-body">
                        <SettingsSidebar active={this.state.active} switchSection={this.switchSection}/>
                        <SettingsSection
                            active={this.state.active}
                            user={this.state.user}
                            handleInputChange={this.handleInputChange}
                            handleResetClick={this.getProfileData}
                            handleSaveClick={this.saveSettings}
                        />
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
        <div className='settings-sidebar smooth-shadow'>
            {items}
        </div>
    )
}

function SettingsSection(props) {
    const active = props.active;
    const section = getSection(props);
    return (
        <div className="settings-section smooth-shadow">
            <div className="setting-section-title">{ active.label }</div>
            { section }
        </div>
    )
}

function getSection(props) {
    const active = props.active;
    switch (active.section) {
        case 'profile':
            const section = <ProfileSection
                user={props.user}
                handleInputChange={props.handleInputChange}
                handleResetClick={props.handleResetClick}
                handleSaveClick={props.handleSaveClick}
            />;
            return (Object.keys(props.user).length) ? section : '';
        case 'subscription':
            return <SubscriptionSection />
        
        case 'integrations':
            return <IntegrationsSection />
        
        default:
            return 'No Section Found'
    }
}

function ProfileSection(props) {
    return (
        <div className='section-content'>
            <div className="sub-section">
                <h3 className='sub-section-title'>Personal</h3>
                <div className='section-inputs'>
                    <BaseInput
                        placeholder='Enter Name'
                        label='Name'
                        id='name'
                        value={props.user.name}
                        onInputChange={props.handleInputChange}
                        name='name'
                    />
                    <BaseInput
                        placeholder='Enter Email'
                        label='Email'
                        id='email'
                        value={props.user.email}
                        toggleText='CHANGE'
                        disabled={true}
                        onInputChange={props.handleInputChange}
                        name='email'
                    />
                </div>
            </div>
            <div className="sub-section">
                <h3 className='sub-section-title'>Security</h3>
                <div className='section-inputs'>
                    <BaseInput
                        placeholder='Enter Password'
                        label='Password'
                        id='password'
                        value={props.user.password}
                        onInputChange={props.handleInputChange}
                        name='password'
                    />
                    <BaseInput
                        placeholder='Confirm Old Password'
                        label='Confirm Password'
                        id='confirm_password'
                        value={props.user.confirm_password}
                        onInputChange={props.handleInputChange}
                        name='confirm_password'
                    />
                </div>
            </div>
            <div className="section-buttons">
                <BaseButton title='Save' type='primary' clicked={props.handleSaveClick} />
                <BaseButton title='Reset' type='warning' clicked={props.handleResetClick}  />
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
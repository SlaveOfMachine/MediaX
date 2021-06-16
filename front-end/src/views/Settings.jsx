import React from 'react';
import axios from '../helpers/axios';
import BaseInput from '../components/common/BaseInput';
import BaseConfirmModal from '../components/common/BaseConfirmModal';
import { BaseButton } from '../components/common/BaseLayoutFeatures';

const SIDEBAR_MENU = [
    { section: 'profile', label: 'PROFILE' },
    { section: 'subscription', label: 'SUBSCRIPTION' },
    { section: 'integrations', label: 'INTEGRATION' },
];
class Settings extends React.Component {
    state = {
        active: SIDEBAR_MENU[0],
        user: {},
        showEmailChangeModal: false,
        loading: false,
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

    emailChangeModal = () => {
        const showEmailChangeModal = !this.state.showEmailChangeModal;
        this.setState({ showEmailChangeModal });
    }

    sendEmailChangeMail = () => {
        this.loader();
        axios.post('mailer', { action: 'change-email' }, {headers: {noLoading: true}})
            .then(response => {
                this.loader(false);
                this.emailChangeModal();
                console.log(response);
            })
            .catch(error => {
                this.loader(false);
                console.log(error);
                this.emailChangeModal();
            });
    }

    loader = (loading = true) => this.setState({ loading });
    

    saveSettings = () => {
        console.log('save');
    }

    render() {
        return (
            <div className='settings-container'>
                <div className="settings-content">
                    <div className="settings-body">
                        <SettingsSidebar active={this.state.active} switchSection={this.switchSection}/>
                        <SettingsSection instance={this} />
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
                className={`settings-sidebar-item smooth-shadow sidebar-item-${active === item.section ? 'active' : 'inactive'}`}
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
    const active = props.instance.state.active;
    const section = getSection(props, active);
    return (
        <div className="settings-section smooth-shadow">
            <div className="setting-section-title">{ active.label }</div>
            { section }
        </div>
    )
}

function getSection(props, active) {
    const user = props.instance.state.user;
    switch (active.section) {
        case 'profile':
            const section = <ProfileSection instance={props.instance} user={user} />;
            return (Object.keys(user).length) ? section : '';
        case 'subscription':
            return <SubscriptionSection />
        
        case 'integrations':
            return <IntegrationsSection />
        
        default:
            return 'No Section Found'
    }
}

function ProfileSection(props) {
    const user = props.user;
    return (
        <div className='section-content'>
            <div className="sub-section">
                <h3 className='sub-section-title'>Personal</h3>
                <div className='section-inputs'>
                    <BaseInput
                        placeholder='Enter Name'
                        label='Name'
                        id='name'
                        value={user.name}
                        onInputChange={props.instance.handleInputChange}
                        name='name'
                    />
                    <BaseInput
                        placeholder='Enter Email'
                        label='Email'
                        id='email'
                        value={user.email}
                        toggleText='CHANGE'
                        eventTriggered={props.instance.emailChangeModal}
                        disabled={true}
                        onInputChange={props.instance.handleInputChange}
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
                        value={user.password}
                        onInputChange={props.instance.handleInputChange}
                        name='password'
                    />
                    <BaseInput
                        placeholder='Confirm Old Password'
                        label='Confirm Password'
                        id='confirm_password'
                        value={user.confirm_password}
                        onInputChange={props.instance.handleInputChange}
                        name='confirm_password'
                    />
                </div>
            </div>
            <div className="section-buttons">
                <BaseButton title='Save' type='primary' clicked={props.instance.saveSettings} />
                <BaseButton title='Reset' type='warning' clicked={props.instance.getProfileData}  />
            </div>
            <div className="modals">
                {
                    props.instance.state.showEmailChangeModal &&
                    <BaseConfirmModal
                        title='Change Email'
                        description='You will get a email containing the link, please click on it to change your current email.'
                        confirmButtonText='Send Email'
                        cancelButtonText="Don't Send"
                        close={props.instance.emailChangeModal}
                        confirm={props.instance.sendEmailChangeMail}
                        loading={props.instance.state.loading}
                    /> 
                }
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
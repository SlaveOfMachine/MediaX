import React from 'react';
import { BaseButton } from '../components/common/BaseLayoutFeatures';
import axios from 'axios';
import BaseHelper from '../components/common/BaseHelper';
import { connect } from 'react-redux';

function VerificationPending() {
    return (
        <div className='verification-container'>
            <div className="verification-content">
                <div className="verificaton-text">
                    We have sent an verification email to <UserEmail />.
                </div>
                <div className="verificaton-text">
                    Please confirm to gain access to your account.
                </div>
                <div className="verification-control">
                    <BaseButton
                        title='Resend'
                        type='primary'
                        clicked={ResendMail}
                    />
                </div>
            </div>
        </div>
    )
}

function VerificationProcess(props) {
    VerifyEmail(props);
    return (
        <div className='verification-container'>
            <div className="verification-content">
                <div className="verificaton-text">
                    Verifying your email, please wait...
                </div>
            </div>
        </div>
    )
}

function UserEmail() {
    const user  = JSON.parse(localStorage.getItem('user'));
    return <span className='highlighted-text'>{user.email}</span> || 'your email';
}

function ResendMail() {
    axios.post('mailer', { action: 'welcome-mail' })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

function VerifyEmail(props) {
    const hash = props.match.params.hash;
    if (hash) {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`auth/verify-email/${user.id}/${hash}`, { headers: { noLoading: true } })
            .then(response => {
                if (!response.data.success) {
                    const messageContainer = document.querySelector('.verificaton-text');
                    if (messageContainer) {
                        messageContainer.innerHTML = response.data.message;
                    }
                    return false;
                }
                const helper = new BaseHelper();
                return helper.handleAuthResponse(response);
            }).catch(error => {
                console.log(error);
            });
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
})

export {
    VerificationPending,
    VerificationProcess,
};
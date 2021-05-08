import React from 'react';

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
            </div>
        </div>
    )
}

function UserEmail() {
    const user  = JSON.parse(localStorage.getItem('user'));
    return <span className='highlighted-text'>{user.email}</span> || 'your email';
}

export {
    VerificationPending
};
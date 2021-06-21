import React from 'react';
import BaseInput from '../common/BaseInput';
import { BaseButton } from '../common/BaseLayoutFeatures';

class SettingAccount extends React.Component {
    render() {
        return (
            <div className="settings-section">
                <div className="section-head">
                    <div className="section-title">ACCOUNT</div>
                </div>
                <div className="section-body">
                    <div className="input-group">
                        <div className="input-label">
                            <label for='name' className="base-label">Name</label>
                            <BaseInput
                                placeholder='Enter name'
                                id='name'
                            />
                        </div>
                        <div className="input-label">
                            <label for='email' className="base-label">Email</label>
                            <BaseInput
                                placeholder='Enter email'
                                id='email'
                                toggleText='Change'
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-label">
                            <label for='password' className="base-label">Password</label>
                            <BaseInput
                                placeholder='Enter new password'
                                id='password'
                                type='password'
                            />
                        </div>
                        <div className="input-label">
                            <label for='old_password' className="base-label">Confirm Old Password</label>
                            <BaseInput
                                placeholder='Confirm old password'
                                id='old_password'
                                type='password'
                            />
                        </div>
                    </div>
                </div>
                <div className="section-foot">
                    <BaseButton
                        type='primary'
                        title='Save'
                        width='100px'
                    />
                    <BaseButton type='danger' />
                </div>
            </div>
        )
    }
}

export default SettingAccount;
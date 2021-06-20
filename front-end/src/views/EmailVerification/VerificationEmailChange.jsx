import React from 'react';
import BaseHelper from '../../components/common/BaseHelper';
import BaseInput from '../../components/common/BaseInput';
import { BaseButton } from '../../components/common/BaseLayoutFeatures';
import { changeEmail } from '../../store';

class VerificationEmailChange extends BaseHelper {

    state = {
        loading: false,
        errors: {},
        formParams: {
            email: '',
        },
        validated: false,
    }

    changeEmail = async () => {
        await this.validate('email-change');
        if (this.state.validated) {
            this.loading();
            console.log('va;idat');
            changeEmail()
                .then(response => console.log(response))
        }
    }

    handleChange = (event) => {
        const formParams = {
            email: event.target.value,
        }
        this.setState({ formParams });
    }

    render() {
        return (
            <div className="verification-container">
                <div className="verification-content">
                    <BaseInput 
                        className="base-input"
                        placeholder="Enter new email"
                        error={ this.state.errors.email }
                        value={ this.state.formParams.email }
                        onInputChange={ this.handleChange }
                        onEnterPressed={ this.changeEmail }
                    />
                    <BaseButton
                        type='primary'
                        title='Change'
                        loading={ this.state.loading }
                        clicked={ this.changeEmail }
                    />
                </div>
            </div>
        )
    }
}

export default VerificationEmailChange;
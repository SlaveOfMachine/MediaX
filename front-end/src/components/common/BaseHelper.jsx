import React from 'react';
import FormValidator from '../../assets/js/formValidator';

class BaseHelper extends React.Component {

    passwordTypeSwitch = () => {
        const showPassword = !this.state.showPassword;
        this.setState({
            showPassword,
        })
    }

    handleInputs = (event) => {
        const formParams = this.state.formParams;
        formParams[event.target.name] = event.target.value;
        if (this.state.liveValidate) this.validate();        
        this.setState({ formParams })
    }

    validate = (form) => {
        const formData = this.state.formParams;

        const errors = this.validateForms(formData);
        const validated = Object.keys(errors).length === 0;

        this.setState({
            validated,
            liveValidate: true,
            errors,
        })
    }

    validateForms(formData) {
        let errors = null;
        const form = this.state.pageName;
        switch (form) {
            case 'login':
                errors = FormValidator.validateLoginForm(formData)
            break;
            case 'register':
                errors = FormValidator.validateRegisterForm(formData)
            break;
            case 'email-change':
                errors = FormValidator.validateEmailChangeForm(formData)
            break;
            case 'setting-profile':
                errors = FormValidator.validateSettingProfile(formData);
            break;
            default:
                errors = {};
            break;
        }
        return errors;
    }

    loading() {
        this.setState({
            loading: !this.state.loading
        })
    }

}

export default BaseHelper;
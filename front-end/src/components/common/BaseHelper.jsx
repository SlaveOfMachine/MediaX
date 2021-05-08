import React from 'react';
import FormValidator from '../../assets/js/formValidator';
import jwt_decode from 'jwt-decode';

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
        this.setState({
            formParams,
        })
    }

    validate = (form) => {
        const formData = this.state.formParams;

        const errors = this.validateForms(form, formData);
        const validated = Object.keys(errors).length === 0;

        this.setState({
            validated,
            liveValidate: true,
            errors,
        })
    }

    validateForms(form, formData) {
        let errors = null;
        switch (form) {
            case 'login':
                errors = FormValidator.validateLoginForm(formData)
            break;
            case 'register':
                errors = FormValidator.validateRegisterForm(formData)
            break;
            default:
                errors = {};
            break;
        }
        return errors;
    }

    handleAuthResponse(response) {
        const token = response.data.token;
        if (!token) {
            const errors = this.state.errors;
            errors.email = 'Failed to login';
            return this.setState({ errors });
        }
        const tokenObject = jwt_decode(token);
        const user = tokenObject.user || {};
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
    }

}

export default BaseHelper;
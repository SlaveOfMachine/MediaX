import React from 'react';
import FormValidator from '../../assets/js/formValidator';
import { withRouter } from 'react-router'

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
        let errors = {};
        switch (form) {
            case 'login':
                errors = FormValidator.validateLoginForm(formData)
            break;
            case 'register':
                errors = FormValidator.validateRegisterForm(formData)
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
        localStorage.setItem('accessToken', token);
        this.props.history.push('/dashboard');
    }
}

export default BaseHelper;
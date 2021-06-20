class FormValidator {
    regex = {
        email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    }

    validateRegisterForm(formData) {
        const errors = {};

        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email || !formData.email.match(this.regex.email)) errors.email = 'Correct email is required';
        if (!formData.password || formData.password.length < 8) errors.password = 'A password with a minimum length of 8 is required';

        if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords not matching';

        return errors;
    }

    validateLoginForm(formData) {
        const errors = {};

        if (!formData.password) errors.password = 'Password is required';
        if (!formData.email) errors.email = 'Email is required';

        return errors;
    }

    validateEmailChangeForm(formData) {
        const errors = {};
        if (!formData.email) {
            errors.email = 'Please enter your new email';
        } else if (!formData.email.match(this.regex.email)) {
            errors.email = 'Email is incorrect';
        }
        console.log(errors);
        return errors;
    }
}

const Validator = new FormValidator();
export default Validator;
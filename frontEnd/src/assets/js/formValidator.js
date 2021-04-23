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
}

const Validator = new FormValidator();
export default Validator;
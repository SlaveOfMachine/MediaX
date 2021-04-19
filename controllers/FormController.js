class FormController {
    regex = {
        email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    }

    handleQueryError(errorResponse, response) {
        const errors = errorResponse.errors;
        if (errors && errors.length) {
            const message = errors[0].message;
            response.status(500).json({message});
        }
        response.status(500).json({message: 'Failed to register'});
    }

    validateRegisterForm(params, response) {
        const { email, password, name } = params;
        const errors = {};

        if (!name) errors.name = 'Name is required';
        if (!email || !email.match(this.regex.email)) errors.email = 'Correct email is required';
        if (!password || password.length < 8) errors.password = 'A password with a minimum length of 8 is required';

        if (Object.keys(errors).length > 0) {
            response.status(422).send({ message: 'Failed to validate', errors });
        }
        return {
            email, password, name
        };
    }
}

module.exports = FormController;
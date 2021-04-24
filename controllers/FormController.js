class FormController {
    regex = {
        email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    }

    handleQueryError(errorResponse) {
        const errors = errorResponse.errors;
        let message = 'Request Failed';
        if (errors && errors.length) {
            message = errors[0].message;
        }
        return { status: 500, message }
    }

    validateRegisterForm(params) {
        const { email, password, name } = params;
        const errors = {};
        let message = 'Fields Validated';
        let status = 200;

        if (!name) errors.name = 'Name is required';
        if (!email || !email.match(this.regex.email)) errors.email = 'Correct email is required';
        if (!password || password.length < 8) errors.password = 'A password with a minimum length of 8 is required';

        if (Object.keys(errors).length > 0) {
            status = 422;
            message = 'Failed to validate';
        }

        return {
            fields: { email, password, name },
            status,
            message,
            errors
        };
    }

    validateLoginForm(params) {
        const { email, password } = params;
        const errors = {};
        let message = 'Fields Validated';
        let status = 200;

        if (!email || !email.match(this.regex.email)) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            status = 422;
            message = 'Failed to validate';
        }

        return {
            fields: { email, password },
            status,
            message,
            errors
        };
    }

    checkInsertSuccess(row) {
        const inserted = row && row.id;
        const response = {};
        if (inserted) {
            this.encryptPassword(row);
            response.status = 200;
            response.message = 'User Registered';
        } else {
            response.status = 500;
            response.message = 'Failed to register';
        }
        return response;
    }

    async encryptPassword(user) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) logger.error(err);
            bcrypt.hash(user.password, salt, function(err, password) {
                if (err) logger.error(err);
                user.update({ password })
            });
        });
    }

    checkPassword(user, password) {
        const bcrypt = require('bcrypt');
        return bcrypt.compareSync(password, user.password);
    }
}

module.exports = FormController;
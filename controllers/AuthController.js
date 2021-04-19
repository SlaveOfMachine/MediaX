const User = require('../models').User;
const FormController = require('./FormController');

class AuthController extends FormController {

    constructor() {
        super();
    }

    index(response) {
        User.findAll().then(data => response.send(data));
    }

    async register(request, response) {
        const params = request.body;
        const validatedData = this.validateRegisterForm(params, response);
        await this.emailUsed(validatedData.email, response);
        await User.create(validatedData).catch(errorResponse => {
                logger.error(errorResponse);
                this.handleQueryError(errorResponse, response);
            }).then(row => {
                const inserted = row && row.id;
                if (inserted) response.status(200).json({message: 'User Registered'})
                response.status(500).json({message: 'Failed to register'});
            });

    }

    async emailUsed(email, response) {
        User.findAll({ where: { email } })
        .catch(errorResponse => {
            logger.error(errorResponse);
            this.handleQueryError(errorResponse, response);
        }).then(row => {
            if (row && row.length) response.status(401).json({message: 'Email already in use'});
        })
    }
}

const Auth = new AuthController();
module.exports = Auth;
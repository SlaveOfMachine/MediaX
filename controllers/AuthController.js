const User = require('../models').User;
const AuthHelper = require('../helpers/AuthHelper');

class AuthController extends AuthHelper {

    constructor() {
        super();
    }

    index(response) {
        User.findAll().then(data => response.send(data));
    }

    async register(request, response) {
        const params = request.body;
        let queryResponse = { status: 401, message: 'Request Failed' };
        const validatedData = this.validateRegisterForm(params);
        if (validatedData.status != 200) {
            queryResponse.message = validatedData.message;
            queryResponse.status = 422;
        } else {
            queryResponse = await this.emailUsed(validatedData.fields.email);
            if (queryResponse.status === 200) {
                await User.create(validatedData.fields).catch(errorResponse => {
                    queryResponse = this.handleQueryError(errorResponse);
                }).then(row => {
                    queryResponse = this.checkInsertSuccess(row);
                });
            }
        }
        return response.status(queryResponse.status).json({message: queryResponse.message});
    }

    async login(request, response) {
        const params = request.body;
        let queryResponse = { status: 401, message: 'Request Failed' };
        const validatedData = this.validateLoginForm(params);
        const { email, password } = validatedData.fields;

        if (validatedData.status != 200) {
            queryResponse.message = validatedData.message;
            queryResponse.status = 422;
        } else {
            await User.findOne({ where: { email } }).catch(errorResponse => {
                    logger.error(errorResponse);
                    queryResponse = this.handleQueryError(errorResponse);
                }).then(row => {
                    queryResponse = this.authenticate(row, password);
                })
        }
        return response
            .status(queryResponse.status)
            .json({
                message: queryResponse.message,
                token: queryResponse.token || null,
                refresh_token: queryResponse.refreshToken
            });
    }

    authenticate(user, password) {
        const response = { status: 401, message: 'Email is not registered' };
        if (user) {
            const valid = this.checkPassword(user, password);
            if (!valid) {
                response.message = 'Failed to login';
            } else {
                const tokens = this.getAuthToken(user);
                response.status = 200;
                response.message = 'User authenticated';
                response.token = tokens.accessToken;
                response.refreshToken = tokens.refreshToken;
            }
        }
        return response;
    }

    async emailUsed(email) {
        let queryResponse = { status: 401, message: 'Request Failed' };
        await User.findAll({ where: { email } })
            .catch(errorResponse => {
                logger.error(errorResponse);
                queryResponse = this.handleQueryError(errorResponse);
            }).then(row => {
                if (row && row.length) {
                    queryResponse.status = 401;
                    queryResponse.message = 'Email already in use';
                } else {
                    queryResponse.status = 200;
                    queryResponse.message = 'Email is available';
                }
            })
        return queryResponse;
    }
}

const Auth = new AuthController();
module.exports = Auth;
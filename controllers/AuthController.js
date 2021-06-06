const User = require('../models').User;
const VerificationToken = require('../models').VerificationToken;
const AuthHelper = require('../helpers/AuthHelper');
const Mailer = require('../controllers/MailController');
const moment = require('moment');

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
                    if (queryResponse.status === 200) {
                        const tokens = this.getAuthToken(row);
                        queryResponse.token = tokens.accessToken;
                        queryResponse.refreshToken = tokens.refreshToken;
                        Mailer.fireMail('welcome-mail', row);
                    }
                });
            }
        }
        
        return response.status(queryResponse.status).json(queryResponse);
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

    async logout(request, response) {
        response
            .status(200)
            .json({
                success: true,
                message: 'Authorized to logout'
            });
    }

    authenticate(user, password) {
        const response = { status: 401, message: 'Email is not registered' };
        if (user) {
            const valid = password === '<skip>' ? true : this.checkPassword(user, password);
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

    async verifyEmail(request, response) {
        const { userId, hash } = request.params;
        const user = await User.findOne({where: { id: userId }});
        if (user && hash) {
            const tokenRow = await VerificationToken.findOne({ userId });
            if (tokenRow) {
                const expiry = moment(tokenRow.expiry);
                if (!moment().isSameOrAfter(expiry)) {
                    user.update({emailVerified: true});
                    tokenRow.destroy();
                    const authResponse = this.authenticate(user, '<skip>');
                    return response.status(200).json({
                        message: 'Email verified',
                        success: true,
                        token: authResponse.token || null,
                        refresh_token: authResponse.refreshToken
                    });
                }
            }
        }
        return response.status(200).json({ message: 'This link is no longer valid',  success: false });
    }
}

const Auth = new AuthController();
module.exports = Auth;
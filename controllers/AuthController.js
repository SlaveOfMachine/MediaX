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

    changeEmail(request, response) {
        console.log(request.user);
    }

    async updateUser(request, response) {
        const params = request.body;
        const user = await User.findOne({where: {id: request.user.id}});
        let message = '';

        const updated = await user.update({ name: params.name })
            .catch(error => {
                logger.error(error);
                message = 'Profile update failed!';
                return false;
            });

        const passwordUpdated = updated ? await this.updatePassword(user, params) : false;
        const tokens = updated ? this.getAuthToken(user) : {};

        if (updated && !passwordUpdated) {
            message = 'Failed to update password';
        }

        return response.status(200).json({
            success: updated,
            password_success: passwordUpdated,
            token: tokens.accessToken,
            message,
        });
    }

    async updatePassword(user, params) {
        const { old_password, new_password } = params;
        if (old_password && new_password) {
            if (this.checkPassword(user, old_password)) {
                const updated = await user.update({password: new_password})
                    .catch(error => {
                        logger.error(error);
                        return false;
                    });
                user.password = new_password;
                this.encryptPassword(user);
                return updated;
            }
            return false;
        }
        return true;
    }
}

const Auth = new AuthController();
module.exports = Auth;
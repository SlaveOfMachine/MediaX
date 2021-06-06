const NodeMailer = require('../config/mailer');
const MailHelper = require('../helpers/MailHelper');
const VerificationToken = require('../models').VerificationToken;
const User = require('../models').User;
const Str = require('@supercharge/strings');
const moment = require('moment');

class MailController extends MailHelper {

    async sendEmail(request, response) {
        const body = request.body;
        const action = body.action;
        const user = await User.findOne({where: {id: request.user.id}});

        let mailResponse = this.fireMail(action, user);
        response
            .status(mailResponse.status)
            .json({...mailResponse});
    }

    fireMail(action, user = {}) {
        let mailResponse = {status: 500, message: 'Failed to send email'};
        switch (action) {
            case 'welcome-mail':
                mailResponse = this.emailConfirmMail({
                    user,
                    subject: `Welcome to ${process.env.APP_NAME}`,
                    route: 'emailVerify',
                    template: 'welcome'
                });
            break;
            case 'change-email':
                mailResponse = this.emailConfirmMail({
                    user,
                    subject: 'Email Change',
                    route: 'emailChange',
                    template: 'emailChange'
                });
            break;
        }
        return mailResponse;
    }

    emailConfirmMail(data) {
        let response = {status: 500, message: 'Failed to send email'};
        if (data.user) {
            const token = Str.random();
            const expiry = moment().add(6, 'days').format('YYYY-MM-DD');
            const html = this.getHtmlTemplate(data.template, {
                APP_NAME: process.env.APP_NAME,
                USER_NAME: data.user.name || 'Customer',
                VERIFICATION_URL: `${process.env.SITE_URL}/${data.route}/${token}`,
                EXPIRY: expiry
            });
            NodeMailer.send({
                from: process.env.MAIL_FROM,
                to: data.user.email,
                subject: data.subject,
                html,
            });
            VerificationToken.destroy({where:{ userId: data.user.id }});
            data.user.createVerificationToken({ token, expiry })
                .catch(error => logger.error(error));

            response = {
                status: 200,
                message: `Mail sent to ${data.user.email}`,
                showMessage: true
            }
        }
        return response;
    }

}

const Mailer = new MailController();
module.exports = Mailer;
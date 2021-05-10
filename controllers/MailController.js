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
        let mailResponse = {status: 500, message: 'Failed to send email'};
        switch (action) {
            case 'welcome-mail':
                const user = await User.findOne({where: {id: request.user.id}});
                console.log(user);
                mailResponse = this.welcomeEmail(user);
                break;
        }
        response
            .status(mailResponse.status)
            .json({message: mailResponse.message});
    }

    welcomeEmail(user) {
        let response = {status: 500, message: 'Failed to send email'};
        if (user) {
            const token = Str.random();
            const expiry = moment().add(6, 'days').format('YYYY-MM-DD');
            const html = this.getHtmlTemplate('welcome', {
                APP_NAME: process.env.APP_NAME,
                USER_NAME: user.name || 'Customer',
                VERIFICATION_URL: `${process.env.SITE_URL}/emailVerify/${token}`,
                EXPIRY: expiry
            });
            NodeMailer.send({
                from: process.env.MAIL_FROM,
                to: user.email,
                subject: `Welcome to ${process.env.APP_NAME}`,
                html,
            });
            VerificationToken.destroy({where:{ userId: user.id }});
            user.createVerificationToken({ token, expiry })
                .catch(error => logger.error(error));

            response = {status: 200, message: 'Welcome mail sent'};
        }
        return response;
    }
}

const Mailer = new MailController();
module.exports = Mailer;
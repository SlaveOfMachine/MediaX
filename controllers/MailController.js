const NodeMailer = require('../config/mailer');
const MailHelper = require('../helpers/MailHelper');
const Str = require('@supercharge/strings')

class MailController extends MailHelper {

    welcomeEmail(data) {
        const randomString = Str.random();
        const html = this.getHtmlTemplate('welcome', {
            APP_NAME: process.env.APP_NAME,
            USER_NAME: data.name || 'Customer',
            VERIFICATION_URL: `${process.env.SITE_URL}/email-verify/${randomString}`,
        });        
        NodeMailer.send({
            from: process.env.MAIL_FROM || data.from,
            to: data.email,
            subject: `Welcome to ${process.env.APP_NAME}`,
            html,
        });
    }
}

const Mailer = new MailController();
module.exports = Mailer;
const nodemailer = require("nodemailer");
const logger = require("./logger");

class NodeMailer {

    async send(data) {
        const sender = this.sender();
        sender.sendMail(data)
            .catch(error => {
                logger.error(`Failed to send email to ${data.to || 'as'}`);
                logger.error(error);
            });
    }

    sender() {
        const envMailSecure = process.env.MAIL_SECURE;
        const secure = envMailSecure === true || envMailSecure === 'true';
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            },
        });
    }
}

const Mailer = new NodeMailer();
module.exports = Mailer;
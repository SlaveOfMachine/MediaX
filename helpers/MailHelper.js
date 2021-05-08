const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
class MailHelper {

    getHtmlTemplate(templateName, replacements) {
        try {
            const base = path.join(__dirname, '../');
            const html = fs.readFileSync(`${base}/templates/${templateName}.html`, 'utf8');
            const template = handlebars.compile(html);
            const htmlToSend = template(replacements);
            return htmlToSend;
        } catch (error) {
            logger.error(error);
        }
        return '';
    }
}

module.exports = MailHelper;
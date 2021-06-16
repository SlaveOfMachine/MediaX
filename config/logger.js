const fs = require('fs');
const moment = require('moment');
const path = require('path');

class Logger {

    fileName        = 'server.log';
    base            = path.join(__dirname, '../');
    dailyLog        = process.env.LOG_FILE_TYPE === 'daily';
    logDateFormat   = this.dailyLog ? 'H:MM:SS' : 'YYYY-MM-DD H:MM:SS';

    constructor() {
        this.createLogFiles();
    }

    createLogFiles() {
        this.fileName = this.dailyLog ? this.getDateFileName() : this.fileName;

        const infoPath  = `${this.base}/logs/info-logs/${this.fileName}`;
        const errorPath = `${this.base}/logs/error-logs/${this.fileName}`;
        
        this.createWriteFile(errorPath);
        this.createWriteFile(infoPath);
    }

    createWriteFile(filePath, text = null) {
        fs.open(filePath, 'r', (error) => {
            if (error && error != 'null') {

                const write = fs.createWriteStream(filePath);
                write.on('error', (error) => console.log({
                    message: 'Failed to create log file',
                    error,
                }));
            } else if (text) {
                text = `${text}`;
                fs.appendFile(filePath, text, (error) => {
                    if (error && error != 'null') {
                        console.log('Failed to write to log file');
                    }
                })
            }
        })
    }

    getDateFileName() {
        const date = moment().format('YYYY-MM-DD');
        return `${date}.log`;
    }

    formatText(logData, type) {
        logData = JSON.stringify(logData);
        const dateStamp = moment().format(this.logDateFormat);
        return `[${dateStamp} - ${type}]: ${logData} \n`;
    }

    info(message) {
        const path = `${this.base}/logs/info-logs/${this.fileName}`;
        message = this.formatText(message, 'Info');
        this.createWriteFile(path, message);
    }

    error(error) {
        const path = `${this.base}/logs/error-logs/${this.fileName}`;
        error = this.formatText(error, 'Error');
        this.createWriteFile(path, error);
    }

}

module.exports = new Logger;
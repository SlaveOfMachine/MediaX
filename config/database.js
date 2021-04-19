const { Sequelize } = require('sequelize');
const logger = require('./logger');
const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DRIVER
} = process.env;

const Database = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DRIVER
    }
);

Database.authenticate()
    .then(() => console.log(`Connect to database: ${ DB_NAME }`))
    .catch((error) => {
        console.log({
            message: `Failed to connect to database: ${ DB_NAME }`,
        });
        logger.error(error);
    })

module.exports = Database;
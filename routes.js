const express = require('express');
const User = require('./models').User;
const Controllers = require('./config/controllerProvider');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('./config/logger');

// Routes
router.get('/ping', () => Controllers.Mailer.welcomeEmail());

/* Auth Routes */
{
    router.post('/auth/register', (req, res) => Controllers.Auth.register(req, res));
    router.post('/auth/login', (req, res) => Controllers.Auth.login(req, res));
    router.post('/auth/logout', (req, res) => Controllers.Auth.logout(req, res));
    router.get('/auth/verify-email/:userId/:hash', (req, res) => Controllers.Auth.verifyEmail(req, res));
}
/* Auth Routes */

/* Analytics Routes */
{
    router.get('/analytics', auth, (req, res) => Controllers.Analytics.index(req, res));
}
/* Analytics Routes */

/* Settings Routes */
{
    router.get('/settings/user', auth, (req, res) => Controllers.Settings.show(req, res));
}
/* Settings Routes */

/* Mailer Routes */
{
    router.post('/mailer', auth, (req, res) => Controllers.Mailer.sendEmail(req, res));
}
/* Mailer Routes */

async function auth(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        const tokenData = verifyToken(token);
        if (!tokenData) {
            res.status(401).json({message: 'Failed To Authenticate'});
        } else {
            const requestUser = tokenData.user;
            if (requestUser) {
                req.user = requestUser;
            } else {
                logger.error('Failed to find user from token');
            }
            next();
        }
    } else {
        res.status(403).json({message: 'Access Forbidden'});
    }
}

function verifyToken(token) {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        logger.error('Secret key not found');
        return false;
    }
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = router;
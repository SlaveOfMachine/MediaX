const express = require('express');
const { response } = express;
const Controllers = require('./config/controllerProvider');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('./config/logger');

// Routes
router.get('/ping', (req, res) => res.send({message: 'Api for Mediax'}));

/* Auth Routes */
{
    router.post('/auth/register', auth, (req, res) => Controllers.Auth.register(req, res));
    router.post('/auth/login', (req, res) => Controllers.Auth.login(req, res));
}
/* Auth Routes */

function auth(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        const user = verifyToken(token);
        if (!user) {
            res.status(401).json({message: 'Failed To Authenticate'});
        } else {
            req.user = user;
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
    console.log(jwt.verify(token, secretKey));
    return jwt.verify(token, secretKey);
}

module.exports = router;
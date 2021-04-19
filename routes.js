const express = require('express');
const { response } = express;
const Controllers = require('./config/controllerProvider');
const router = express.Router();

// Routes
router.get('/ping', (req, res) => res.send({message: 'Api for Mediax'}));

router.post('/auth/register', (req, res) => Controllers.Auth.register(req, res));

module.exports = router;
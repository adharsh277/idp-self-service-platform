const express = require('express');
const { createService } = require('../controllers/serviceController');

const router = express.Router();

router.post('/create-service', createService);

module.exports = router;
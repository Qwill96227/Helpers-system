const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

router.post('/subscribe', volunteerController.subscribe);

router.get('/subscriptions/:identifier', volunteerController.viewSubscriptions);

module.exports = router;
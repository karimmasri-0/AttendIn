const express = require('express');
const router = express.Router();
const adminMiddleware = require("../Middleware/adminMiddleware")
const monitoringController = require('../Controllers/monitoringController');
router.use(adminMiddleware);
router.get('/:id', monitoringController.RegisteredStudentsNumber);

module.exports = router;
    
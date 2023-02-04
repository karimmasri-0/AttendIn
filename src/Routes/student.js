const express = require('express');
const router = express.Router();
const studentMiddleware = require("../Middleware/studentMiddleware")
const Student = require('../Controllers/studentController');
router.use(studentMiddleware);
router.get('/:id', Student.studentSchedule);
router.post('/', Student.createAttendance);
module.exports = router;
    
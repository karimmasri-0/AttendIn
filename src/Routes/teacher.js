const express = require('express');
const router = express.Router();
const teacherMiddleware = require("../Middleware/teacherMiddleware")
const roomReservation = require('../Controllers/roomReservController');
router.use(teacherMiddleware);
router.get('/', roomReservation.getAllRoomReservations);
router.get('/:id', roomReservation.getSingleRoomReservation);
module.exports = router;
    
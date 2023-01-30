const express = require('express');
const router = express.Router();
const adminMiddleware = require("../Middleware/adminMiddleware")
const roomReservation = require('../Controllers/roomReservController');
router.use(adminMiddleware);
router.get('/', roomReservation.getAllRoomReservations);
router.get('/:id', roomReservation.getSingleRoomReservation);
router.post('/', roomReservation.createRoomReservation);
router.delete('/:id',roomReservation.deleteRoomReservation);
module.exports = router;
    
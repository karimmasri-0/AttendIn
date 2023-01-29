const express = require('express');
const router = express.Router();
const adminMiddleware = require("../Middleware/adminMiddleware")
const roomController = require('../Controllers/roomController');
router.use(adminMiddleware);
router.get('/', roomController.getAllRooms);
router.get('/:id',roomController.getSingleRoom);
router.post('/',roomController.createRoom);
router.put('/:id',roomController.updateRoom)
router.delete('/:id',roomController.deleteRoom);
module.exports = router;
    
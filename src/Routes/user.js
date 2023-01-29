const express = require('express');
const router = express.Router();
const adminMiddleware = require("../Middleware/adminMiddleware")
const userController = require('../Controllers/userController');
router.use(adminMiddleware);
router.get('/teachers', userController.getAllTeachers);
router.get('/teachers/:id',userController.getSingleTeacher);
router.put('/teachers/update/:id',userController.updateTeacher);
router.get('/students', userController.getAllStudents);
router.get('/students/:id',userController.getSingleStudent);
router.put('/students/update/:id',userController.updateStudent);
router.post('/createAccount',userController.createAccount);
router.delete('/delete/:id',userController.deleteAccount);
module.exports = router;

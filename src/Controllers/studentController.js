const RoomReservation = require('../Models/roomReservation');
const Attendance = require('../Models/attendance');
const User = require("../Models/user")
exports.studentSchedule = (req, res) => {
    const id = req.params.id
    RoomReservation.studentSchedulebyday(id, (err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Schedule."
            });
        }
        else res.send(data);
    })
}
exports.createAttendance = (req, res) => {
    const UserId = req.body.UserId;
    const roomres = req.body.roomres;
    Attendance.allAttendance((err, data) => {
        if (err) {
            res.send(err);
        }
        const userreg = (data.find(r => r.UserId == UserId && r.roomresid == roomres))
        if (!userreg) {
            const attend = new Attendance(
                null,
                roomres,
                UserId,
            )
            Attendance.create(attend, (err, data) => {
                console.log(err);
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating attendance."
                    });
                }
                else res.send({message:"You are Registered Successfully"});
            })
        }
        else{
            res.send({message:"you are registered"});
        }
    })
}
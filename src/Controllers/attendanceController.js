// const Attendace = require('../Models/attendance');

// exports.createAttendance = async (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }
//     const attendance = new Attendace(
//         null,
//         req.body.roomresid,
//         req.params.UserId,
//     )
//     Attendace.create(attendance, (err, data) => {
//         if (err) {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while taking Attendance."
//             });
//         }
//         else res.send({ message: "Registered Successfully" });
//     });
// };
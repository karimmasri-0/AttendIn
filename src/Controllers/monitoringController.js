
const Attendance = require('../Models/attendance');
exports.RegisteredStudentsNumber = (req, res) =>{
    const { id } = req.params;
    Attendance.RegisteredStudentsNumber(id, (err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving UserRegistered."
            });
        }
        else {
            console.log(data);
            res.json({ data:data });
        }
    })
};
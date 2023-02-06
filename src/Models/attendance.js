const { connection } = require('../config');
class Attendace {
    constructor(id, roomresid, UserId) {
        this.id = id;
        this.roomresid = roomresid;
        this.UserId = UserId;
    }
    static create(attendance, result) {
        const newattendance = Object.values(attendance);
        connection.query(`INSERT INTO attendance SET id = ? , roomresid = ?, UserId = ?`, newattendance, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, attendance);
        });
    }
    static allAttendance(result) {
        connection.query("SELECT * FROM attendance ", (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        })
    }
    static RegisteredStudentsNumber(id, result) {
        connection.query("SELECT COUNT(attendance.UserId) as Students, user.FirstName as Teacher  FROM attendance" +
            " LEFT JOIN roomreservation ON roomreservation.id = attendance.roomresid" +
            " LEFT JOIN course ON course.id = roomreservation.CourseId" +
            " LEFT JOIN user ON user.id = course.UserId " +
            " WHERE attendance.roomresid  = ?", id, (err, res) => {
                if (err) {
                    result(null, err);
                    return;
                }
                result(null, res);
            })
    }
}
module.exports = Attendace;

const { connection } = require('../config');
class Attendace{
    constructor(id,roomresid, UserId) {
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
            result(null, user);
        });
    }
        static allAttendance(result) {
        connection.query("SELECT COUNT(attendance.id) as StudentNB,room.name as room,course.name as course FROM attendance RIGHT JOIN roomreservation ON ", (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        })
    }

}
module.exports = Attendace;

const { connection } = require('../config');

class RoomReservation {
    constructor(id, RoomId, CourseId, Date, STime, ETime) {
        this.id = id;
        this.RoomId = RoomId;
        this.CourseId = CourseId;
        this.Date = Date;
        this.STime = STime;
        this.ETime = ETime;
    }
    static allRoomReservationsForTeacher(id,result) {
        connection.query("SELECT roomreservation.id, room.Name as Room, course.Name as Course,roomreservation.Date as Date,roomreservation.STime,roomreservation.ETime FROM roomreservation" +
            " RIGHT JOIN room ON  roomreservation.RoomId = room.id" +
            " RIGHT JOIN course ON  roomreservation.CourseId = course.id " +
            "RIGHT JOIN user ON user.id = course.UserId WHERE user.id = ?",id, (err, res) => {
                if (err) {
                    result(null, err);
                    return;
                }
                result(null, res);
            })
    }
    static allRoomReservations(result) {
        connection.query("SELECT roomreservation.id, room.Name as Room, course.Name as Course,roomreservation.Date as Date,roomreservation.STime,roomreservation.ETime FROM roomreservation" +
            " RIGHT JOIN room ON  roomreservation.RoomId = room.id" +
            " RIGHT JOIN course ON  roomreservation.CourseId = course.id " +
            "WHERE roomreservation.id =roomreservation.id", (err, res) => {
                if (err) {
                    result(null, err);
                    return;
                }
                result(null, res);
            })
    }
    static studentSchedulebyday(id,result) {
        connection.query("SELECT user.FirstName as Student,room.Name as Room,course.Name as Course,roomreservation.Date,roomreservation.STime,roomreservation.ETime FROM roomreservation"+
        " LEFT JOIN room ON room.id = roomreservation.RoomId"+
        " LEFT JOIN course ON course.id = roomreservation.CourseId"+
        " LEFT JOIN coursereservation ON coursereservation.CourseId = course.id"+
        " LEFT JOIN user ON user.id = coursereservation.UserID WHERE Role= 2 AND user.id=?",id, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.length) {
                result(null, res);
                
                return;
            }
            result({ kind: "not_found" }, null);
            })
    }
    static findRoomReservationById(id, result) {
        connection.query("SELECT roomreservation.id, room.Name as Room, course.Name as Course,roomreservation.Date as Date,roomreservation.STime,roomreservation.ETime FROM roomreservation" +
            " RIGHT JOIN room ON  roomreservation.RoomId = room.id" +
            " RIGHT JOIN course ON  roomreservation.CourseId = course.id " +
            " WHERE roomreservation.id = ?  ", id, (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.length) {
                    result(null, res[0]);
                    return;
                }
                result({ kind: "not_found" }, null);
            });
    }

    static create(roomres, result) {
        const newroomres = Object.values(roomres);
        connection.query(`INSERT INTO roomreservation SET id = ? , RoomId = ?, CourseId = ?, DATE = ?, STime = ?, ETime = ?`, newroomres, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, roomres);
        });
    }
    static remove(id, result) {
        connection.query("DELETE FROM roomreservation WHERE id = ?", id, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, res);
        });
    }
}

module.exports = RoomReservation;

const { connection } = require('../config');

class Room {
    constructor(id, Name, Description, Capacity) {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Capacity = Capacity;
    }
    static allRooms(result) {
        connection.query("SELECT * FROM room", (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        })
    }
    static findRoomById(id, result) {
        connection.query("SELECT * FROM room WHERE id = ?", id, (err, res) => {
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

    static create(room, result) {
        const newroom = Object.values(room);
        connection.query(`INSERT INTO room SET id = ? , Name = ?, Description = ?, Capacity = ?`, newroom, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, room);
        });
    }
    static updateRoomById(room, result) {
        // console.log(room);
        connection.query(
            `UPDATE room SET Name = ?, Description = ?, Capacity = ?  WHERE id = ?`,
            [room.Name, room.Description, room.Capacity, room.id],
            (err, res) => {
                if (err) {
                    console.log(err)
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, room);
            }
        );
    }
    static remove(id, result) {
        connection.query("DELETE FROM room WHERE id = ?", id, (err, res) => {
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

module.exports = Room;

const { connection } = require('../config');

class User {
    constructor(id, FirstName, MiddleName, LastName, Username, Password, Role) {
        this.id = id;
        this.FirstName = FirstName;
        this.MiddleName = MiddleName;
        this.LastName = LastName;
        this.Username = Username;
        this.Password = Password;
        this.Role = Role;
    }
    static allTeachers(result) {
        connection.query("SELECT * FROM user WHERE Role=1", (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        })
    }
    static allStudents(result) {
        connection.query("SELECT * FROM user WHERE Role=2", (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        })

    } as
    static findTeacherById(id, result) {
        connection.query("SELECT * FROM user WHERE id = ? and Role=1", id, (err, res) => {
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
    static findStudentById(id, result) {
        connection.query("SELECT * FROM user WHERE id = ? and Role=2", id, (err, res) => {
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
    static create(user, result) {
        const newuser = Object.values(user);
        connection.query(`INSERT INTO user SET id = ? , FirstName = ?, MiddleName = ?, LastName = ?, Username = ?, Password = ? , Role = ?`, newuser, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, user);
        });
    }
    static updateStudentById(user, result) {
        connection.query(
            "UPDATE user SET FirstName = ?, MiddleName = ?, LastName = ?, Username = ?, Password = ?  WHERE id = ? AND Role = ?",
            [user.FirstName, user.MiddleName, user.LastName, user.Username, user.Password, user.id, user.Role],
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, user);
            }
        );
    }
    static updateTeacherById(user, result) {
        connection.query(
            "UPDATE user SET FirstName = ?, MiddleName = ?, LastName = ?, Username = ?, Password = ?  WHERE id = ? AND Role = ?",
            [user.FirstName, user.MiddleName, user.LastName, user.Username, user.Password, user.id, user.Role],
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, user);
            }
        );
    }
    static remove(id, result) {
        connection.query("DELETE FROM user WHERE id = ? AND Role !=0", id, (err, res) => {
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
    static allUsers (result){
        connection.query("SELECT * FROM user ",  (err,res)=>{
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
           
        })
    }


}

module.exports = User;

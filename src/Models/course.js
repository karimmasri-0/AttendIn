// const { connection } = require('../config');

// class Course {
//     constructor(id, Name, UserId) {
//         this.id = id;
//         this.Name = Name;
//         this.UserId = UserId;
//     }
//     static allCourses(result) {
//         connection.query("SELECT cooures.id,course.Name,user.name FROM course LEFT JOIN course Where course.UserId = user.id AND Role=1", (err, res) => {
//             if (err) {
//                 result(null, err);
//                 return;
//             }
//             result(null, res);
//         })
//     }
//     static findCourseById(id, result) {
//         connection.query("SELECT * FROM course WHERE id = ?", id, (err, res) => {
//             if (err) {
//                 result(err, null);
//                 return;
//             }
//             if (res.length) {
//                 result(null, res[0]);
//                 return;
//             }
//             result({ kind: "not_found" }, null);
//         });
//     }

//     static create(course, result) {
//         const newcourse = Object.values(course);
//         connection.query(`INSERT INTO course SET id = ? , Name = ?, UserId = ?`, newcourse, (err, res) => {
//             if (err) {
//                 result(err, null);
//                 return;
//             }
//             result(null, room);
//         });
//     }
//     static updateCourseById(course, result) {
//         connection.query(
//             "UPDATE course SET Name = ?, UserId = ?,WHERE id = ?",
//             [course.Name, course.UserId, course.id],
//             (err, res) => {
//                 if (err) {
//                     result(err, null);
//                     return;
//                 }
//                 if (res.affectedRows == 0) {
//                     result({ kind: "not_found" }, null);
//                     return;
//                 }
//                 result(null, room);
//             }
//         );
//     }
//     static remove(id, result) {
//         connection.query("DELETE FROM course WHERE id = ?", id, (err, res) => {
//             if (err) {
//                 result(err, null);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 result({ kind: "not_found" }, null);
//                 return;
//             }
//             result(null, res);
//         });
//     }
// }

// module.exports = User;

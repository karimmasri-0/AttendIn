const User = require('../Models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllTeachers = (req,res) => {
    User.allTeachers((err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Teachers."
            });
        }
        else res.send(data);
    })
}

exports.getAllStudents = (req, res) => {
    User.allStudents((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Students."
            });
        }
        else res.send(data);
    })
}
exports.getSingleTeacher = (req, res) => {
    const id = req.params.id
    User.findTeacherById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Teacher with id ${req.params.id}.` })
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Teacher with id ${req.params.id}`
                })
            }
        } else res.send(data);
    })
}
exports.getSingleStudent = (req, res) => {
    const id = req.params.id
    User.findStudentById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found Student with id ${req.params.id}.` })
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Student with id ${req.params.id}`
                })
            }
        } else res.send(data);
    })
}
exports.createAccount = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.Password, salt);
    const user = new User(
        null,
        req.body.FirstName,
        req.body.MiddleName,
        req.body.LastName,
        req.body.Username,
        hashedPassword,
        req.body.Role
    )
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        }
        else res.send({ message: "Account Created Successfully" });
    });
};
exports.updateStudent = async (req, res) => {
    if (!req.body.FirstName || !req.body.MiddleName || !req.body.LastName || !req.body.Username || !req.body.Password) {
        res.status(400).send({
            message: "All Field Required!"
        });
    }else{
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.Password, salt);
    const user = new User(
        req.params.id,
        req.body.FirstName,
        req.body.MiddleName,
        req.body.LastName,
        req.body.Username,
        hashedPassword,
        2
    )
    User.updateStudentById(user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found student with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating student with id " + req.params.id
                });
            }
        } else res.send(data);
    }
    );
    }
};

exports.updateTeacher = async (req, res) => {
    if (!req.body.FirstName || !req.body.MiddleName || !req.body.LastName || !req.body.Username || !req.body.Password) {
        res.status(400).send({
            message: "All Field Required!"
        });
    }else{
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.Password, salt);
    const user = new User(
        req.params.id,
        req.body.FirstName,
        req.body.MiddleName,
        req.body.LastName,
        req.body.Username,
        hashedPassword,
        1
    )
    User.updateTeacherById(user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Teacher with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Teacher with id " + req.params.id
                });
            }
        } else res.send(data);
    }
    );
    }
};
exports.deleteAccount = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};
exports.login = (req, res) => {
    const { Username, Password } = req.body;
    User.allUsers(async (err, data) => {
        const user = data.find(r => r.Username == Username);
        console.log(user);
        if (!user) {
            res.json({ message: 'Incorrect Username' })
        } else {
            let isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) {
                res.json({ message: 'Password dosn\'t Match' })

            } else {
                let payload = { id: user.id };
                let access_token = jwt.sign(payload, "huss123", { expiresIn: 10000 });
                res.json({
                    message: true,
                    data: {
                        id: user.id,
                        Role: user.Role,
                        Username: user.Username,
                        FirstName: user.FirstName
                    }, access_token: access_token
                });
            }
        }

    });
};

const createAdmin = () => {
    User.allUsers(async (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        }
        if (!data || data.length == 0) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash('123456', salt);
            const user = new User(
                null,
                'Hussein',
                'Ali',
                'Aref',
                'Hussein.aref.csci@gmail.com',
                hashedPassword,
                0
            )
            User.create(user, async (err, data) => {
                if (err) {
                    console.log({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                }
                else console.log({ message: 'done' });
            });
        }

    });

};
(() => { createAdmin(); })();
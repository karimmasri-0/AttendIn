const User = require('../Models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
                let payload = { id: user.id,Role:user.Role };
                let access_token = jwt.sign(payload, "huss123", { expiresIn: 10000 });
                res.json({
                    message: true,
                    data: {
                        id: user.id,
                        Role: user.Role,
                        Username: user.Username,
                        FirstName: user.FirstName
                    },
                     access_token: access_token
                });
            }
        }

    });
};

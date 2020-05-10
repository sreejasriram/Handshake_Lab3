// const User = require("../dbSchema/users");
// const passwordHash = require('password-hash');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../config');

// const login = async (args) => {
//     let user = await User.findOne({ email_id: args.email_id });
//     if (user.length === 0) {
//         return { status: 401, message: "NO_USER" };
//     }
//     if (passwordHash.verify(args.password, user.password)) {
//         const payload = { user_id: user._id, name: user.name, email_id: user.email_id, is_owner: user.is_owner };
//         var token = jwt.sign(payload, secret, {
//             expiresIn: 1008000
//         });
//         token = 'JWT ' + token;
//         return { status: 200, message: token };
//     }
//     else {
//         return { status: 401, message: "INCORRECT_PASSWORD" };
//     }
// }

// exports.login = login;
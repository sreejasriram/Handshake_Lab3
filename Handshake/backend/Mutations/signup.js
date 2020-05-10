// const User = require("../dbSchema/users");
// const passwordHash = require('password-hash');

// const customerSignup = async (args) => {
//     let hashedPassword = passwordHash.generate(args.password);
//     let newUser = new User({
//         name: args.name,
//         email_id: args.email_id,
//         password: hashedPassword,
//         address: args.address,
//         phone_number: args.phone_number
//     });
//     let user = await User.find({ email_id: args.email_id });
//     if (user.length) {
//         return { status: 400, message: "USER_EXISTS" };
//     }
//     let savedUser = await newUser.save();
//     if (savedUser) {
//         return { status: 200, message: "USER_ADDED" };
//     }
//     else {
//         return { status: 500, message: "INTERNAL_SERVER_ERROR" };
//     }
// };

// const ownerSignup = async (args) => {
//     let hashedPassword = passwordHash.generate(args.password);
//     let newUser = new User({
//         name: args.name,
//         email_id: args.email_id,
//         password: hashedPassword,
//         address: args.address,
//         phone_number: args.phone_number,
//         is_owner: true
//     });
//     let newRestaurant = {
//         res_name: args.res_name,
//         res_cuisine: args.res_cuisine,
//         res_zip_code: args.res_zip_code,
//         res_phone_number: args.phone_number,
//         res_address: args.address,
//         owner_user_id: newUser._id
//     };

//     newUser.restaurant = newRestaurant;

//     let user = await User.find({ email_id: args.email_id });
//     if (user.length) {
//         return { status: 400, message: "USER_EXISTS" };
//     }
//     let savedUser = await newUser.save();
//     if (savedUser) {
//         return { status: 200, message: "USER_ADDED" };
//     }
//     else {
//         return { status: 500, message: "INTERNAL_SERVER_ERROR" };
//     }
// };

// exports.customerSignup = customerSignup;
// exports.ownerSignup = ownerSignup;

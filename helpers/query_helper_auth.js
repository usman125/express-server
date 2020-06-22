const UserModel = model('user');

exports.authLogin = async (email, password) => {
    try {
        return await UserModel.findOne({ email: email });
    }
    catch (err) {
        console.log("Error logging in user", err);
        return false;
    };
};

exports.authRegister = async (userObj) => {
    try {
        return await new UserModel(userObj).save();
    }
    catch (err) {
        console.log("Error registering user", err);
        return false;
    };
};
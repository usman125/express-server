const UserModel = model('user');

exports.login = function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    console.log("Login request", username, password)
    UserModel.find().
        where('username').equals(username).
        where('password').equals(password).
        exec(function(err, users){
            if(err){
                res.send(err);
            }
            res.json(users);
    });

}

exports.authenticate = function(req,res,next){
    res.send("Authenticate Responce");
}

exports.verify = function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    console.log("call from Verify");
    UserModel.findOne({
        $or: [ { username: username }, { email: email } ]
    }).then(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
}
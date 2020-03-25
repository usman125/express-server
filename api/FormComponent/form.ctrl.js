let UserModel = model('user');
let FormsModel = model('form');

exports.getSingleFormById = (req, res, next) => {

    console.log("REQUEST PARAMS FOR FORM:---", req.query.id, req.query.title)

    // UserModel.findById(req.query.userId, (err, user) => {
    //     if (err) {
    //         res.json(err);
    //     } 
    //     else {
    //         UserModel.find().
    //             where('_id').equals(req.query.userId).
    //             exec(function(err, user){
    //                 if(err){
    //                     res.json(err);
    //                 }
    //                 res.json([{status:1,message:'Access Granted',user:user}]);
    //         }); 
    //     }
    // })

}

// exports.editUser = (req,res,next) => {
//     const newUser = {
//                             name: req.body.name,
//                             email: req.body.email,
//                             password: req.body.password,
//                             username: req.body.username,
//                             contact: req.body.contact,
//                             projects: req.body.projects
//                         };
//     console.log("EDIT User", newUser)

//     UserModel.findById(req.body.userId, (err, user) => {
//         if (err) {
//             res.json(err);
//         } 
//         else {

//             UserModel.findByIdAndUpdate(req.body.id, newUser, function(err, result){
//                 if(err){ res.json(err); }

//                 res.json([{status:1,message:'User edited',result:result}]);
//             });
//         }
//     })
// }

exports.addForm = (req, res, next) => {

    const newUser = new FormsModel({
        name: req.body.title,
        smeRef: req.body.smeRef,
        components: req.body.components,
        type: req.body.type,
        page: req.body.page,
        numPages: req.body.numPages,
    });

    newUser.save(function (err, result) {
        if (err) { res.json(err); }
        res.json([{ status: 1, message: 'Form added', result: result }]);
    });
}

exports.allForms = (req, res, next) => {
    FormsModel.find(function (err, forms) {
        if (err) {
            res.send(err);
        }
        res.json([{ status: 1, message: 'Access Granted', forms: forms }]);
    });
}
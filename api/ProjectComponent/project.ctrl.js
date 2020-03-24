let ProjectModel = model('project');
let UserModel = model('user');

exports.getSingleProjectById = (req,res,next) => {
    
    console.log("single project", req.query.projectId)
    UserModel.findById(req.query.userId, (err, user) => {
        if (err) {
            res.json(err);
        } 
        else {
            ProjectModel.find().
                where('_id').equals(req.query.projectId).
                exec(function(err, project){
                    if(err){
                        res.json(err);
                    }
                    res.json([{status:1,message:'Access Granted',project:project}]);
            });
        }
    })
    
}

exports.editproject = (req,res,next) => {
    const newProject = {
                            name: req.body.name,
                            url: req.body.url,
                            users: req.body.users
                        };
    console.log("EDIT PROJECT", newProject)
    
    UserModel.findById(req.body.userId, (err, user) => {
        if (err) {
            res.json(err);
        } 
        else {
            ProjectModel.findByIdAndUpdate(req.body.id, newProject, function(err, result){
                if(err){ res.json(err); }
            
                res.json([{status:1,message:'Project edited',result:result}]);
            });
        }
    })

}

exports.addproject = (req,res,next) => {
    const newProject = new ProjectModel({
                                name: req.body.name,
                                url: req.body.url,
                                users: req.body.users
                            });
    
    UserModel.findById(req.body.userId, (err, user) => {
        if (err) {
            res.json(err);
        } 
        else {

            newProject.save(function(err, result){
                if(err){ res.json(err); }

                for( let i=0; i<req.body.users.length; i++ ) {

                    UserModel.findOne({ _id: req.body.users[i] }, (err, user) => {
                        user.projects.push(result._id)
                        UserModel.findByIdAndUpdate(user._id, user, (err, resultUser) => {
                            console.log("User updated")
                        })
                    } )

                }
            
                res.json([{status:1,message:'Project added',result:result}]);
            });
        }
    })
}

exports.allprojects = (req, res, next) => {

    // UserModel.findById(req.body.userId, (err, user) => {
    //     if (err) {
    //         res.json(err);
    //     } 
    //     else {
            ProjectModel.find(function(err, projects){
                if(err){
                    res.send(err);
                }
                res.json([{status:1,message:'Access Granted',projects: projects}]);
            });
    //     }
    // })
}

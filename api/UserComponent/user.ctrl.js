// const { Mongoose } = require("mongoose");
var mongoose = require('mongoose');
let UserModel = model('user');
let ProjectModel = model('project');

exports.getSingleUserById = (req, res, next) => {

  UserModel.findById(req.query.userId, (err, user) => {
    if (err) {
      res.json(err);
    }
    else {
      UserModel.find().
        where('_id').equals(req.query.userId).
        exec(function (err, user) {
          if (err) {
            res.json(err);
          }
          res.json([{ status: 1, message: 'Access Granted', user: user }]);
        });
    }
  })

}

exports.editUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    contact: req.body.contact,
    projects: req.body.projects
  };
  console.log("EDIT User", newUser)

  UserModel.findById(req.body.userId, (err, user) => {
    if (err) {
      res.json(err);
    }
    else {

      UserModel.findByIdAndUpdate(req.body.id, newUser, function (err, result) {
        if (err) { res.json(err); }

        res.json([{ status: 1, message: 'User edited', result: result }]);
      });
    }
  })
}

exports.addUser = (req, res, next) => {

  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    contact: req.body.contact
  });

  UserModel.findById(req.body.userId, (err, user) => {
    if (err) {
      res.json(err);
    }
    else {
      newUser.save(function (err, result) {
        if (err) { res.json(err); }
        res.json([{ status: 1, message: 'User added', result: result }]);
      });
    }
  })
}

exports.allusers = (req, res, next) => {

  // UserModel.findById(req.query.userId, (err, user) => {
  //     if (err) {
  //         res.json(err);
  //     }
  //     else {

  // UserModel.find(function(err, users){
  //     if(err){
  //         res.send(err);
  //     }
  //     res.json([{status:1,message:'Access Granted',users:users}]);
  // });
  UserModel.aggregate([
    {
      $match: {
        _id: {
          $ne: mongoose.Types.ObjectId(req.query.userId)
        }
      }
    }
  ]).exec(function (err, users) {
    if (err) {
      res.json(err);
    }
    res.json([{ status: 1, message: 'Access Granted', users: users }]);
  })
  // }
  // })

}
exports.alluserswithstats = (req, res, next) => {
  UserModel.aggregate([
    {
      $match: {
        _id: {
          $ne: mongoose.Types.ObjectId(req.query.userId)
        }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'userRef',
        as: 'user_books'
      }
    },
    {
      $unwind: {
        path: '$user_books',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _Id: '$_id',
          name: '$name',
          email: '$email',
          contact: '$contact',
          location: '$location',
        },
        wishlist: { $sum: { $cond: ['$user_books.wishlist', 1, 0] } },
        exchange: { $sum: { $cond: ['$user_books.exchange', 1, 0] } },
        total: { $sum: { $cond: ['$user_books', 1, 0] } }
      }
    },
    // {
    //   $facet: {
    //     "exchange": [
    //       { $match: { 'user_books.exchange': true } },
    //       {
    //         $count: 'exchange'
    //       }
    //     ],
    //     "wishlist": [
    //       { $match: { 'user_books.wishlist': true } },
    //       {
    //         $count: 'wishlist'
    //       }
    //     ],
    //     "total": [
    //       {
    //         $match: {
    //           'user_books._id': { $exists: 1 }
    //         }
    //       },
    //       {
    //         $count: 'total'
    //       }
    //     ]
    //   }
    // },
  ]).exec(function (err, users) {
    if (err) {
      res.json(err);
    }
    res.json([{ status: 1, message: 'Access Granted', users: users }]);
  })
}

exports.userbookstats = (req, res, next) => {
  UserModel.aggregate([
    {
      $match: {
        _id: { $eq: mongoose.Types.ObjectId(req.query.userId) }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'userRef',
        as: 'user_books'
      }
    },
    {
      $unwind: '$user_books'
    },
    {
      $facet: {
        "exchange": [
          { $match: { 'user_books.exchange': true } },
          {
            $count: 'exchange'
          }
        ],
        "wishlist": [
          { $match: { 'user_books.wishlist': true } },
          {
            $count: 'wishlist'
          }
        ],
        "total": [
          {
            $match: {
              _id: { $exists: 1 }
            }
          },
          {
            $count: 'total'
          }
        ]
      }
    }
  ]).exec(function (err, stats) {
    if (err) {
      res.json(err);
    }
    res.json([{ status: 1, message: 'Access Granted', stats: stats }]);
  })
}
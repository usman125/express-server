let BookModel = model('book');
var mongoose = require('mongoose');

const { failure401, failure404, failure500 } = require('../../helpers/api_helper');
const { updateBookWishlist } = require('../../helpers/query_helper_book');

exports.getSingleBookById = (req, res, next) => {

  // BookModel.findById(req.query.userId, (err, user) => {
  //   if (err) {
  //     res.json(err);
  //   }
  //   else {
  BookModel.find().
    where('_id').equals(req.query.userId).
    exec(function (err, book) {
      if (err) {
        res.json(err);
      }
      res.json([{ status: 1, message: 'Access Granted', book: book }]);
    });
  //   }
  // })

}

exports.editBook = (req, res, next) => {
  const newBook = {
    name: req.body.name,
    author: req.body.author,
    publish: req.body.publish,
  };
  console.log("EDIT User", req.body.newBook)

  // BookModel.findById(req.body.userId, (err, user) => {
  //   if (err) {
  //     res.json(err);
  //   }
  //   else {

  BookModel.findByIdAndUpdate(req.body.id, newBook, function (err, result) {
    if (err) { res.json(err); }

    res.json([{ status: 1, message: 'User edited', result: result }]);
  });
  //   }
  // })
}

exports.addBook = (req, res, next) => {

  const newBook = new BookModel({
    name: req.body.name,
    author: req.body.author,
    publish: req.body.publish,
    userRef: mongoose.Types.ObjectId(req.body.userRef)
  });

  // BookModel.findById(req.body.userId, (err, user) => {
  //   if (err) {
  //     res.json(err);
  //   }
  //   else {
  newBook.save(function (err, result) {
    if (err) { res.json(err); }
    res.json([{ status: 1, message: 'User added', result: result }]);
  });
  //   }
  // })
}

exports.allBooks = (req, res, next) => {

  // BookModel.findById(req.query.userId, (err, user) => {
  //   if (err) {
  //     res.json(err);
  //   }
  //   else {

  // BookModel.find(function (err, books) {
  //   if (err) {
  //     res.json(err);
  //   }
  //   res.json([{ status: 1, message: 'Access Granted', books: books }]);
  // });
  //   }
  // })
  BookModel.aggregate([
    {
      $match: {
        userRef: mongoose.Types.ObjectId(req.query.userId)
      }
    }
  ]).exec(function (err, books) {
    if (err) {
      res.json(err);
    }
    res.json([{ status: 1, message: 'Access Granted', books: books }]);
  })

}

exports.toggleWishlist = async (req, res, next) => {
  // console.log(req.body);
  // var newBook = {
  //   wishlist: !req.body.wishlist,
  // };
  // BookModel.findByIdAndUpdate(req.body._id, newBook, function (result, err) {
  //   if (err) res.send(err);
  //   res.json([{ status: 1, message: 'Book Updated', result: result }]);
  // })
  BookModel.update(
    {
      _id: mongoose.Types.ObjectId(req.body._id)
    },
    {
      $set: {
        wishlist: !req.body.wishlist
      }
    }, { multi: false, upsert: false }, function (err, result) {
      if (err) {
        res.json(err);
      }
      res.json([{ status: 1, message: 'Book Updated', result: result }]);
    }
  );
  // try {
  //   let response = await updateBookWishlist(book);
  //   if (response) {
  //     next(response);
  //   }
  //   else {
  //     failure404(res);
  //   };
  // }
  // catch (err) {
  //   failure500(res);
  // };

}

exports.toggleReading = (req, res, next) => {
  BookModel.update(
    {
      _id: mongoose.Types.ObjectId(req.body._id)
    },
    {
      $set: {
        reading: !req.body.reading,
        completed: !req.body.completed,
      }
    }, { multi: false, upsert: false }, function (err, result) {
      if (err) {
        res.json(err);
      }
      res.json([{ status: 1, message: 'Book Updated', result: result }]);
    }
  );
}

exports.toggleExchange = (req, res, next) => {
  BookModel.update(
    {
      _id: mongoose.Types.ObjectId(req.body._id)
    },
    {
      $set: {
        exchange: !req.body.exchange,
      }
    }, { multi: false, upsert: false }, function (err, result) {
      if (err) {
        res.json(err);
      }
      res.json([{ status: 1, message: 'Book Updated', result: result }]);
    }
  );
}

exports.toggleCompleted = (req, res, next) => {
  BookModel.update(
    {
      _id: mongoose.Types.ObjectId(req.body._id)
    },
    {
      $set: {
        reading: !req.body.reading,
        completed: !req.body.completed,
      }
    }, { multi: false, upsert: false }, function (err, result) {
      if (err) {
        res.json(err);
      }
      res.json([{ status: 1, message: 'Book Updated', result: result }]);
    }
  );
}

exports.booksStats = (req, res, next) => {
  BookModel.aggregate([
    {
      $match: {
        userRef: mongoose.Types.ObjectId(req.query.userId)
      }
    },
    {
      $facet: {
        "exchange": [
          { $match: { exchange: true } },
          {
            $count: 'exchange'
          }
        ],
        "wishlist": [
          // Filter out documents without a price e.g., _id: 7
          { $match: { wishlist: true } },
          {
            $count: 'wishlist'
          }
          // { $match: { price: { $exists: 1 } } },
          // {
          //   $bucket: {
          //     groupBy: "$price",
          //     boundaries: [0, 150, 200, 300, 400],
          //     default: "Other",
          //     output: {
          //       "count": { $sum: 1 },
          //       "titles": { $push: "$title" }
          //     }
          //   }
          // }
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
      },
    }
  ]).exec(function (err, result) {
    if (err) res.json(err);
    res.json([{ status: 1, message: 'Book Stats', stats: result[0] }])
  });
}
let BookModel = model('book');

exports.updateBookWishlist = async (book) => {
  try {
    return BookModel.update(
      {
        _id: mongoose.Types.ObjectId(book._id)
      },
      {
        $set: {
          wishlist: !book.wishlist,
        }
      }
    ).exec();
  }
  catch (err) {
    console.log("Error logging in user", err);
    return false;
  };
};
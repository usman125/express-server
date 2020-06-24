var controller = require('./book.ctrl.js')
const { success } = require('../../helpers/api_helper');

module.exports = function (router) {

  router.get('/book', controller.getSingleBookById);
  router.post('/addbook', controller.addBook);
  router.post('/editbook', controller.editBook);
  router.get('/allbooks', controller.allBooks);

  router.post('/toggle/wishlist', controller.toggleWishlist, success);
  router.post('/toggle/reading', controller.toggleReading);
  router.post('/toggle/exchange', controller.toggleExchange);
  router.post('/toggle/completed', controller.toggleCompleted);
  
  router.get('/booksstats', controller.booksStats);

}
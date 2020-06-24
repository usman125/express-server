var controller = require('./user.ctrl.js')

module.exports = function(router){

    router.get('/user', controller.getSingleUserById )
    router.post('/adduser', controller.addUser )
    router.post('/edituser', controller.editUser )
    router.get('/allusers', controller.allusers )
    router.get('/alluserswithstats', controller.alluserswithstats )
    router.get('/userbookstats', controller.userbookstats )
    
}

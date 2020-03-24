var controller = require('./auth.ctrl.js')

module.exports = function(router){

    router.get('/', (req,res) => res.send('hello world'))
    router.post('/auth/login', controller.login)
    router.post('/auth/authenticate', controller.authenticate)

}


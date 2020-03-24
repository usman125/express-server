var controller = require('./form.ctrl.js')

module.exports = function(router){
    router.get('/form/:id/:title', controller.getSingleFormById )
    router.post('/addform', controller.addForm )
    router.get('/form', controller.allForms )
}

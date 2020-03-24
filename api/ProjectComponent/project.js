var controller = require('./project.ctrl.js')

module.exports = function(router){

    router.get('/project', controller.getSingleProjectById )
    router.post('/addproject', controller.addproject )
    router.post('/editproject', controller.editproject )
    router.get('/allprojects', controller.allprojects )
    
}
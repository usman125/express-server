var controller = require('./auth.ctrl.js')
const { saveSession, success } = require('../../helpers/api_helper');

module.exports = function (router) {

    router.get('/', (req, res) => res.send('hello world'));
    router.post('/auth/login', saveSession, controller.login, success);
    router.post('/auth/register', saveSession, controller.register, success);

}


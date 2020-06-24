var UserComponent = component('User');
var ProjectComponent = component('Project');
var AuthComponent = component('Auth');
var FormComponent = component('Form');
var AttachmentComponent = component('Attachment');
var BookComponent = component('Book');

module.exports = function (router) {
    AuthComponent(router);
    UserComponent(router);
    ProjectComponent(router);
    FormComponent(router);
    AttachmentComponent(router);
    BookComponent(router);
}

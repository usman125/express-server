var mongoose = require('mongoose');
var seeder = require('mongoose-seed');
var Schema = mongoose.Schema;



seeder.connect('mongodb://localhost:27017/khaleef-ping', function(){
  seeder.loadModels([
    'model/user.js'
  ]);
    // Clear specified collections 
  seeder.clearModels(['users'], function() {

      // Callback to populate DB once collections have been cleared 
      seeder.populateModels(data, function() {
          seeder.disconnect(); 
      });
  });

});

// USER

var data = [{
    'model': 'users',
    'documents': [
        {
            'name': 'Super Admin',
            'email': 'bilalasif09@gmail.com',
            'username': 'super_admin',
            'password': 'khaleef@dmin!@#',
            'contact': '03164615571'
        }
    ]
}];

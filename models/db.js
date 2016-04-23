// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
var dbURI    = require('../config').db.uri;
var defaultAdmin = require('../config').default.admin;

User = require('./User');
var UserType  = require('./Constants').UserType;

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);

      User.findOne({userType:UserType.ADMIN}, function (err,admin) {
         if(err)
         {
             console.log("erro when searching for an admin account : "+ err);
             return;
         }
         else {
             if(admin)
                console.log("An admin exists ( " + admin.name + " | " + admin.userType + "  | pass: "  + admin.password + ")");
             else
             {
                 admin = new User(defaultAdmin);
                 admin.password = defaultAdmin.password;
                 admin.setPassword(defaultAdmin.password,function (err,p) {
                     if(err) return console.log("error when setting the user password : " + err);
                 });

                 console.log(defaultAdmin.password);
                 admin.save(function(err, admin) {
                     if (err) return console.error(" Could not save admin user. error code: " + err);

                     console.log(admin);
                 });
             }
         }

      });


});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN THE SCHEMAS & MODELS

//require('./chatRoom');
//require('./User');
//require('./Message');

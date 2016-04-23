var passportLocalMongoose = require('passport-local-mongoose');
var collectionsConfig     = require('../config').db.collections;
var modelsConfig          = require('../config').db.models;

var UserType  = require('./Constants').UserType;
var mongoose  = require('mongoose');


/*
 * User schema
 */
var UserSchema = new mongoose.Schema({
    name         : String,
    joinDate     : { type: Date, default: Date.now },
    email        : String,
    password     : String,
    description  : String,
    userType     : {type:String, default:UserType.BASIC},
});


UserSchema.plugin(passportLocalMongoose);

/*
 * An email address is expected to be unique
 */
UserSchema.statics.findByEmail = function (email_, cb) {
  return this.findOne({ email: email_ }, cb);
}




// User model
User = mongoose.model(modelsConfig.user, UserSchema);

// Export User model

module.exports = User;

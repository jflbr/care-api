/*
 *  passport-local user serialization et deserialization
 *      -
 */

var passport      =  require('passport');
var passportLacal = require('passport-local');
var SqliteUser    = require('../models/User').user;
var UserManager_  = require('../models/User').userManager;
var UserManager   = new UserManager_();

function setup(app) {
    console.log('[PASSPORT INIT] Initializing passport ...');
    app.use(passport.initialize());
    app.use(passport.session());



    passport.serializeUser ( function(user,done){
        UserManager.findUserByEmail( user.email,function(err, users) {
            if(err) {
                console.error("[PASSPORT] User serialization failed : " + err);
                return done(err,false);
            }
            else {
                user = users[0];
                return done(null,user._id);
            }
        });
    });


    passport.deserializeUser( function(id,done){

        UserManager.findUserById(id,function(err, users) {
            if(err) {
                console.error("[PASSPORT] User deserialization failed : " + err);
                return done(err,false);
            } else {


                user = users[0];
                //user._id = id;
                //var user = new SqliteUser(user_.username,user_.email, user_.password);
                //user._id = user_.id;
                return done(null,user);
            }
        });
        }
    );

    require('./localStrategy')();
}


exports.setup = setup;

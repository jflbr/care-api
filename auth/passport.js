var passport =  require('passport');
var passportLacal = require('passport-local');
var User = require('../models/User');

function setup(app) {
    console.log('setting up passport stuff...');
    app.use(passport.initialize());
    app.use(passport.session());





    passport.serializeUser ( function(user,done){
        return done(null, user._id);
        }
    );

    passport.deserializeUser( function(id,done){

        User.findById(id,function (err, user) {
            if(err) {
                console.error("passport.deserializeUser failed : " + err);
                return done(err,false);
            }else{
                return done(null,user);
            }
            });
        }
    );

    require('./localStrategy')();

}


exports.setup = setup;

var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User     = require('../models/User');

function setup() {

    passport.use( 'local-login', new LocalStrategy({
        usernameField : "email", /* Les champs doivent matcher avec ceux de l'envoi du form */
        passwordField : "password",
        passReqToCallback : true
    },function (req,email, password, done) {

        //An email address or a nickname as username is valid
        User.findOne( {'email':email} ,
            function (err,user)
            {
                //no related user found / an error occured
                if(err || !user)
                {
                    console.log("Authentication failed - Wrong email ' " + email + " '");
                    return done(err ,false,req.flash('auth', {signinAttemptError:true,info:'Incorrect email',email:email}));
                }
                else
                {
                    if(user.password === password)
                    {
                        console.log("Authentication succeeded for credentials ( " + email + ", " + password + ")");
                        return done(null,user);
                    }
                    else
                    {
                        console.log("Authentication failed - Wrong password");
                        return done(err,false,req.flash('auth', {signinAttemptError:true,info:'Incorrect password',email:email}));
                    }
                }//user exists

            }//findOne cb

        );//findOne
    }//Strategy cb

));//passport local-login strategy

passport.use( 'local-signup', new LocalStrategy({
    usernameField : "email", /* Les champs doivent matcher avec ceux de l'envoi du form */
    passwordField : "password",
    passReqToCallback : true
},function (req,email, password, done) {

    console.log("++++ signup check ++++");

    //Check whether there's already an user with the given email address or a nickname
    User.findOne( { 'email':email },
        function (err,user)
        {
            if (err){
                console.log("findOne failed");
                return done(err);
            }
            // check to see if theres already a user with that email
            if (user) {
                console.log("User found");
                console.log(user);
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                console.log("User creation with email : " + email + " & password : " + password );

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password = password;//newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });

            }
        }//findOne cb

    );//findOne
}//Strategy cb

));//passport local-signup strategy

}//setup


module.exports = setup;

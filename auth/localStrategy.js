/*
 *  passport-local implementation
 *      - local signin (email || username(TODO) & password)
 *      - local signup (email, username & password)
 */


var LocalStrategy = require('passport-local').Strategy;
var passport      = require('passport');
var SqliteUser    = require('../models/User').user;
var UserManager_  = require('../models/User').userManager;
var UserManager   = new UserManager_();


function setup() {

    passport.use( 'local-login', new LocalStrategy({
        usernameField : "email", /* Les champs doivent matcher avec ceux de l'envoi du form */
        passwordField : "password",
        passReqToCallback : true
    },function (req,email, password, done) {

        console.log("[SIGNIN] Credentials(" + email + ", " + password + ")");

        //An email address or a nickname as username is valid (TODO: username handling)
        UserManager.findUserByEmail(email,
            function (err,users) {

                //Database access error
                if ( err ) {
                    return done(err);
                }

                //no matching data
                if ( users.length == 0 ) {
                    console.log("Authentication failed - Incorrect email address ' " + email + " '");
                    return done(null, false, { message: 'Incorrect email address.' });
                }

                else {
                    console.log("[SIGNIN] Number of users with email address '" + email + "': " + users.length);
                    user = users[0];

                    if( user.password === password  ) {
                        console.log("[SIGNIN] Authentication succeeded");
                        return done(null,user);
                    }
                    else {
                        console.log("[SIGNIN] Authentication failed - Incorrect password");
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                }//user found
            } //findUserByEmail cb
        );//findUserByEmail
    }//Strategy cb
));//passport local-login strategy


    passport.use( 'local-signup', new LocalStrategy({
        usernameField : "email", /* Les champs doivent matcher avec ceux de l'envoi du form */
        passwordField : "password",
        passReqToCallback : true
    },function (req,email, password, done) {

        console.log("[SIGNUP] credentials("+ email +", " + password + ", " + req.body.username +")");

        //Check whether there's already an user with the given email address or a nickname
        UserManager.findUserByEmail(email,
            function (err,users) {
                //querry failed
                if (err) {
                    console.log("[SIGNUP] Error while reading database");
                    return done(err);
                }
                //email already exists

                if (users.length > 0 ) {
                    console.log('[SIGNUP] Email "'+ email +'" is already registered');
                    return done(null, false, { message: "Email '" + email + "' is already registered" });
                }

                //no matching data (on est bon!)
                else {
                    console.log("[SIGNUP] User creation ");
                    /*
                     * TODO : email validation (for the API itself)
                     *
                     */

                    // create the user - TODO : deprecate password parameter and use a setter for encryption
                    var newUser = new SqliteUser(req.body.username,email, password);

                    // save the user
                    UserManager.saveUser(newUser,function(err) {
                        if (err) {
                            console.log("[SIGNUP] User creation failed");
                            return done(err);
                        }
                        //---TODO: last_insted_id---
                    UserManager.findUserByEmail(newUser.email,function (err,users) {
                        if (err) {
                            console.log("[SIGNUP] Failed to retrive the created user");
                            return done(err);
                        }
                        newUser._id = users[0]._id;
                        //-------------------------
                        return done(null, newUser);
                    });

                    });
                }//user creation
            });//findUserByEmail + cb
        }//Strategy cb
    ));//passport local-signup strategy

}//setup


module.exports = setup;

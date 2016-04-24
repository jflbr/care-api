/*
 *  Authentication and user registration handling
 *      - signin (local)
 *      - signup (local)
 *      - logout
 *      - delete (TODO)
 */



var express  = require("express");
var router   = express.Router();
var passport = require('passport');




module.exports = function () {
    router.use(function (req,res,next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

                next();
            });
    router.route('/signin')

        .post( function(req, res, next) {
            passport.authenticate('local-login', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.json( {"user_id":null,"message":info.message} ); }
                req.logIn(user, function(err) {
                  if (err) { return next(err); }

                  return res.json( {"user_id":req.user._id,"email":req.user.email} );
                });
              })(req, res, next);
            }
        );

        router.route('/signup')

            .post( function(req, res, next) {
                passport.authenticate('local-signup', function(err, user, info) {
                    if (err) { return res.json( {"user_id":null,"message":"Service unavailable"} ); }
                    if (!user) { return res.json( {"user_id":null,"message":info.message} ); }
                    req.logIn(user, function(err) {
                      if (err) { return res.json( {"user_id":null,"message":"Service unavailable"} ); }

                      return res.json( {"user_id":req.user._id,"email":req.user.email} );
                    });
                  })(req, res, next);
                }
            );


        router.route('/logout')
            .all( function(req, res){
                  req.logout();
                  return res.json( {"message":"logged out"} );
            });


    return router;
};

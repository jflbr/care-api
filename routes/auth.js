var express = require("express");
var router  = express.Router();
var passport = require('passport');




module.exports = function () {
    router.use(function (req,res,next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

                next();
            });
    router.route('/signin')

        .post( passport.authenticate( 'local-login',
            { failureRedirect : '/auth/signin' ,
              failureFlash: true
            } ),                  //failure
            function (req, res) { //success
                console.log("[Signin] received credentials : email: " + req.body.email + " | pass:" + req.body.password );
                if(req.user) {
                    res.json( {"user_id":req.user._id,"email":req.user.email});
                }
                else {
                    res.json( {"user_id":null, "email":null});
                }
            }
        )
        .get( function (req, res) {

            console.log(" +++ signin get");

            //redirect the user to his profile if he/she is logged in
            if(req.user)
            {
                console.log("signin : user is connected !");
                //res.redirect('/users/' + req.user.email);
                res.json({"user_id":req.user._id,"name":req.user.email});
            }
            else {
                console.log("signin : user is not connected !");
                res.json({"user_id":null});

                //authStatus = req.flash('auth');
                //
                // //Context data to render the view
                // var context = { signinAttemptError : false, signinStatus:"", email:"" };
                //
                // // In case of a sign in/up attempt failure, add related data to the context
                // if (authStatus && authStatus.length) {
                //     context.signinAttemptError = authStatus[0].signinAttemptError;
                //     context.signinStatus = authStatus[0].info;
                //     context.email = authStatus[0].email;
                // }
                //
                // context.show = {signin : true};
                //
                // res.render('index', { title: 'Chat-io | Sign in' , context : context });
            }

        });


        router.route('/signup')
            .post( passport.authenticate( 'local-signup',
                { failureRedirect : '/auth/signup' ,
                  failureFlash: true
              } ),                  //failure
              function (req, res) { //success
                  console.log("Singup succeeded");

                  console.log("[received credentials] : ( " + req.body.email + " | " + req.body.password + " )" );
                  //res.redirect('/users/'+req.body.username);
                    if(req.user){

                        res.json({"user_id":req.user._id});
                    }
                    else {
                        res.json({"user_id":null});
                    }
              })

            .get( function (req, res) {
                console.log("Singup failed");

                //redirect the user to his profile if he/she is logged in
                if(req.user)
                {
                    console.log("User is connected");
                    res.json({"user_id":req.user._id});
                }
                else {
                    console.log("User is not connected");

                    //Context data to render the view
                    var context = { signupAttemptError : false, signinStatus:"", email:"" };
                    context.signupAttemptError = req.flash('signupMessage');
                    context.show = {signup : true};
                    res.render('index', { title: 'Chat-io | Sign up' , context : context });
                }

            });

    return router;
};

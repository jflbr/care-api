/*
 *  user data implementation
 *      -
 */

var UserType  = require('./Constants').UserType;
var db        = require('../models/db').db;


/*
 * User model
 */
var User = function(username,email, password) {
    this._id = null;
    this.username = username;
    this.name = "-";
    this.email = email;
    this.password = password;
    this.keyCar   = null; //carKey

    this.isValidPassword = function(password)
    {
        return password === this.password;
    }

    this.setPassword = function (pass) {
        //TODO : chiffrer le password avant de le setter
        this.password = pass;
    }
};

/*
 *  UserManager
 *      - manage user data in database
 */

var UserManager = function () {
    /*
     * function saveUser
     *  - persists an user instance in database
        - @param user : the user instance to persist
        - @param cb   : the status callback
     */
    this.saveUser = function (user, cb) {
        sqlRequest = "INSERT INTO users (email, username, password) " +
             "VALUES('" + user.email + "','" + user.username + "', '" + user.password + "')"
        db.run(sqlRequest, function(err) {
            cb(err);
        });
      };

      /*
       * function findUserByEmail
       *  - query user items with a specific email address
          - @param email : the email address
          - @param cb   : the status callback
       */
    this.findUserByEmail = function (email,cb) {
        db.all('SELECT * FROM users WHERE email="' + email + '"', function(err, rows) {

            cb(err,rows);
        });
      };


      /*
       * function findUserById
       *  - query user items with a specific id
       *  - @param _i   : the id
       *  - @param cb   : the status callback
       *  -@rem         : an id is unique. TODO:use a query with single result
       */
    this.findUserById = function (id_,cb) {
        db.all('SELECT * FROM users WHERE _id="' + id_ +'"', function(err, rows) {
            cb(err,rows);
          });
        };


        /*
         * function findUsers
         *  - query all user items within the database
         */
    this.findUsers = function (cb) {

        db.all('SELECT * FROM users ORDER BY email', function(err, rows) {
            cb(err,rows);
          });
    };

    /*
     * function dbDataToUserObject
     *  - convert retrieved data into a user instance
     */
    this.dbDataToUserObject = function (dbData) {
        var user = new User(dbData.username,dbData.email, dbData.password);
        user._id = dbData._id;
        user.keyCar = dbData.keyCar;
        return user;
    };

};


// Export User model and UserManager service

exports.user = User;
exports.userManager = UserManager;

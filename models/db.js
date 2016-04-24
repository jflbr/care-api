/*
 *  database object and initialization operations
 *      - create database and initializes its tables if database doesn't exist
        - create a default admin user (TODO)
 *      -
 */


var sqlite3   = require('sqlite3').verbose();
var User      = require('./User');
var UserType  = require('./Constants').UserType;
var fs        = require("fs");
var dbFile    = "careDev.db";
var dbExists  = fs.existsSync(dbFile);

var db        = new sqlite3.Database(dbFile);

// TODO: default admin parameters if there's no admin inside of the database
var defaultAdmin = require('../config').default.admin;

/*
 * function initDB - Database initialization
 *  - Create the database if it does not exist
    -
 */
var initDB = function () {

    //serialized queries (step by step execution)
    db.serialize(function() {

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks'",
        function(err, rows) {
            if(err !== null) {
                console.log(err);
            }
            else if(rows === undefined) {
                var query = 'CREATE TABLE "users" ' +
                   '("_id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                   '"email" TEXT, ' +
                   '"username" TEXT, ' +
                   '"password" TEXT)'
                db.run(query, function(err) {

                    if(err !== null) {
                        console.log("[INIT DB] Cannot create table 'Users' - Table may exists");
                        //console.log(err);
                    }
                    else {
                        console.log("[INIT DB] SQL Table 'users' initialized.");
                    }
                });
            }
            else {
                console.log("[INIT DB] SQL Table 'users' already initialized.");
            }
        });
        });

};

//Database client object and initialization function exports
exports.initialize = initDB;
exports.db = db;

/*
 *  station data implementation
 *      -
 */

var passportLocalMongoose = require('passport-local-mongoose');
var collectionsConfig     = require('../config').db.collections;
var modelsConfig          = require('../config').db.models;

var UserType  = require('./Constants').UserType;
var db        = require('../models/db').db;


/*
 * User model
 */
var Station_ = function(id,type,lat,long,name) {
    this.id = id;
    this.type = type;
    this.lat = lat;
    this.long = long;
    this.name = name;
};

/*
 *  UserManager
 *      - manage user data in database
 */

var StationManager = function () {

      /*
       * function findUserById
       *  - query user items with a specific id
       *  - @param _i   : the id
       *  - @param cb   : the status callback
       *  -@rem         : an id is unique. TODO:use a query with single result
       */
    this.findStationByType = function (type,cb) {
      //SELECT Stations.lat, Stations.lngtude, DataValues.value from DataValues join Stations on DataValues.keyStation = Stations.idStation where Stations.dataType = "Pollution";
      db.all('SELECT Stations.lat, Stations.lngtude, DataValues.value, Stations.dataType from DataValues join Stations on DataValues.keyStation = Stations.idStation where Stations.dataType = "'+type+'"', function(err, rows) {
        cb(err,rows);
      });
    };
};


// Export User model and UserManager service

exports.station = Station_;
exports.stationManager = StationManager;

/*
 *  station data implementation
 *      -
 */

var db = require('../models/db').db;


/*
 * Station model
 */
var Station = function(id,type,lat,long,name) {
    this.id   = id;
    this.type = type;
    this.lat  = lat;
    this.long = long;
    this.name = name;
};

/*
 *  StationManager
 *      - manage station data in database
 */

var StationManager = function () {

      /*
       * function findStationById
       *  - query station items with a specific id
       *  - @param _i   : the id
       *  - @param cb   : the status callback
       *  - @rem        : an id is unique. TODO:use a query with single result
       */
    this.findStationByType = function (type,cb) {
      //SELECT Stations.lat, Stations.lngtude, DataValues.value from DataValues join Stations on DataValues.keyStation = Stations.idStation where Stations.dataType = "Pollution";
      db.all('SELECT Stations.lat, Stations.lngtude, DataValues.value, Stations.dataType from DataValues join Stations on DataValues.keyStation = Stations.idStation where Stations.dataType = "'+type+'"', function(err, rows) {
        cb(err,rows);
      });
    };
};


// Export Station model and StationManager service

exports.station = Station;
exports.stationManager = StationManager;

/*
 *  travel data implementation
 *      -
 */

 var db        = require('../models/db').db;


/*
 * Travel model
 */
var Travel = function(lat1,lon1,lat2,lon2) {
    this.idTravel = null;
    this.lat1 = lat1;
    this.lon1 = lon1;
    this.lat2 = lat2;
    this.lon2 = lon2;
    this.travelDate = null;
    this.travelMode = null;
    this.keyUser = null; //userKey
};

/*
 *  TravelManager
 *      - manage travel data in database
 */

var TravelManager = function () {
    /*
     * function saveTravel
     *  - persists a travel instance in database
        - @param travel : the travel instance to persist
        - @param cb   : the status callback
     */
    this.saveTravel = function (travel, cb) {
        sqlRequest = "INSERT INTO travels (lat1,lngtude1,lat2,lngtude2,travelDate) " +
             "VALUES('" + travel.lat1 + "','" + travel.lon1 + "', '" + travel.lat2 + "', '" + travel.lon2 + "',current_timestamp)"
        db.run(sqlRequest, function(err) {
            if(err){
                cb(err);
            }else {
                travel.idTravel = this.lastID;
                cb(err);
            }
        });
      };

      /*
       * function findTravelByEmail
       *  - query travel items with a specific email address
          - @param email : the email address
          - @param cb   : the status callback
       */
    this.findUserTravels = function (userEmail,cb) {
        query = "select * from Travels where (Travels.keyUser = '" + userEmail + "')";
        db.all(query, function(err, rows) {
            cb(err,rows);
        });
      };

      /*
       *    Update keyTravel field of a travel row in database
       */
      this.updateUserTravel = function (travelId,userEmail,cb) {
          query ="update travels set keyUser='"+  userEmail + "' where idTravel='" + travelId +"'";

          this.findTravelById(travelId,function (err,travels) {

              if(err){ return cb( {"cause":err, "message":"Unable to retrieve travel of id " + travelId } ); }
              else {
                  if(travels.length == 0)
                  {
                      return cb( {"cause":"Travel id " + travelId + " does not exist"} );
                  }
                  db.all(query, function(err) {
                      cb(err);
                  });
              }
          });


      };

      /*
       *    Update travelMode field of a travel row in database
       */
      this.updateTravelMode = function (travelId,mode,cb) {
          query ="update travels set travelMode='"+  mode + "' where idTravel='" + travelId +"'";
          db.all(query, function(err) {
              cb(err);
          });
      };

      /*
       * function findTravelById
       *  - query travel items with a specific id
       *  - @param _i   : the id
       *  - @param cb   : the status callback
       *  -@rem         : an id is unique. TODO:use a query with single result
       */
    this.findTravelById = function (tid,cb) {
        db.all('SELECT * FROM travels WHERE idTravel="' + tid +'"', function(err, rows) {
            cb(err,rows);
          });
        };


        /*
         * function findTravels
         *  - query all travel items within the database
         */
    this.findTravels = function (cb) {

        db.all('SELECT * FROM travels', function(err, travels) {
            cb(err,travels);
          });
    };
};


// Export Travel model and TravelManager service

exports.travel = Travel;
exports.travelManager = TravelManager;

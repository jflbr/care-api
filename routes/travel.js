
var express = require('express');
var router  = express.Router();
var rest    = require('restler');

var Station          = require('../models/Station').station;
var StationManager_  = require('../models/Station').stationManager;
var StationManager   = new StationManager_();
var Travel           = require('../models/Travel').travel;
var TravelManager_   = require('../models/Travel').travelManager;
var TravelManager    = new TravelManager_();





/* GET environment data related to a specific travel(origin,destination)*/
router.get('/find/:origin/:destination', function(req, res, next) {
	var stationsOut = {};
    var output = {};
    var request = {
		origin: req.params.origin,
        destination: req.params.destination,
        region: "FR",
      	key: 'AIzaSyD9oIF0dHrUWcjFf44uzqjC5F5KbM2fNUc'
    };
    var output = {};
    /*
        var mapsAddr = "https://maps.googleapis.com/maps/api/directions/json?";
        mapsAddr    += "origin=" + request.origin;
        mapsAddr    += "&destination="+request.destination;
        mapsAddr    += "&region="+request.region;
        mapsAddr    += "&key="+request.key;
        rest.get(mapsAddr).on('complete', function(data) {
     */
    rest.get("https://maps.googleapis.com/maps/api/directions/json?origin="+request.origin+"&destination="+request.destination+"&region="+request.region+"&key="+request.key).on('complete', function(data) {
        output = data;
        StationManager.findStationByType("Pollution",function(err,stations){
	    		stationsOut.pollution = stations;
	    		StationManager.findStationByType("Pollen",function(err,stations){
	    			stationsOut.pollen = stations;
	    			StationManager.findStationByType("Humidity",function(err,stations){
				    		stationsOut.humidity = stations;
				    		StationManager.findStationByType("Temperature",function(err,stations){
						    		stationsOut.temperature = stations;
						    		console.log(stationsOut);
	    							res.json(stationsOut);
						    });
				    });
	    		});
	    });
    });//on complete
});//travel/find


/* Link a travel to a specific user */
router.get('/record/user/:user_email/travel/:travel_id', function(req, res, next) {
    var user_email= req.params.user_email,
        travel_id = req.params.travel_id;
        res.updated_travel = null;

    console.log("[TRAVEL RECORD] Linking travel of id " + travel_id + " with user of email " + user_email +"...");

     TravelManager.updateUserTravel(travel_id, user_email,function (err) {
         if(err){
             console.log("[TRAVEL RECORD] Travel update failed");
             res.json({"travel":null,"message":"Travel update failed", error:err});
         }
         else {
             console.log("[TRAVEL RECORD] Update travel succeeded");
             //Return back the updated travel
             TravelManager.findTravelById(travel_id,function (err,travels) {
                 if(err){ return res.json( {"travel":null,"error":"Error while retrieving the updated travel"} ); }

                 res.updated_travel = travels[0];
                 res.json({"travel":res.updated_travel});
             });
         }
     });
});


/*  Create a dummy travel for "testing" purpose */
router.get('/create/dummy', function(req, res, next) {

  console.log("Test ajout travel");
  var traveldemerde = new Travel("lat1","lon1","lat2","lon2");
  TravelManager.saveTravel(traveldemerde,function (err) {
      if (err) {
          console.log(err);
      }
      else {
          console.log("Travel saved!");
      }
  });
});

module.exports = router;

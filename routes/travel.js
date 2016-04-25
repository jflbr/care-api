var express = require('express');
var router = express.Router();
var rest = require('restler');
var Station          = require('../models/Station').station;
var StationManager_  = require('../models/Station').stationManager;
var StationManager   = new StationManager_();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({"travel":[]});
});

/* GET specific user travel */
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
        //res.json(data);
        //console.log(stations);
    });

    //res.json(data.concat(stations[0]));
});

module.exports = router;

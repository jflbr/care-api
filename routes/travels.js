var express = require('express');
var rest = require('restler');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var travel = {};

	var request = {
		origin: "45.764043,4.835659",
        destination: "45.772459,4.844595",
        region: "FR",
      	key: 'AIzaSyD9oIF0dHrUWcjFf44uzqjC5F5KbM2fNUc'
    };
    var output = {};
    rest.get("https://maps.googleapis.com/maps/api/directions/json?origin="+request.origin+"&destination="+request.destination+"&region="+request.region+"&key="+request.key).on('complete', function(data) {
        output = data;
        res.json(data);
     }); 

    

});

module.exports = router;

var express = require('express');
var router = express.Router();


var googleService = require('../services/google-maps-api').google;

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log("++++++++ users/ ++++++++");
    googleService.initialize();
    googleService.direction({});
  res.json({"users":"jomllhzdio"});
});

module.exports = router;

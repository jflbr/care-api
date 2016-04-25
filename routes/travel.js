var express = require('express');
var router = express.Router();
var Travel          = require('../models/Travel').travel;
var TravelManager_  = require('../models/Travel').travelManager;
var TravelManager   = new TravelManager_();

var User          = require('../models/User').user;
var UserManager_  = require('../models/User').userManager;
var UserManager   = new UserManager_();


/* GET users listing. */
router.get('/addDummyTravel', function(req, res, next) {

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

/* GET specific user travel */
router.get('/find/:lat1/_id/travel/:travel_id', function(req, res, next) {
    var user_id   = req.params.user_id,
        travel_id = req.params.travel_id;

    console.log("travel " + travel_id + " of user " + user_id);
    /*
     * TODO fetch a specific (travel_id) travel of a specific user(user_id)
     *
     */
    res.json({"travel":{}});
});


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

module.exports = router;

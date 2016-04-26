/*
 * user endpoint
 * services
 *  - list of related user travels
 *  - details of a specific user travel
 */

var express = require('express');
var router  = express.Router();

/* GET user travels listing. */
router.get('/travels?user_id:user_id', function(req, res, next) {
    var user_id = req.params.user_id;
    console.log("travels of " + user_id);
    /*
     * TODO fetch travels related to user with _id = user_id
     *
     */
    res.json({"travels":[1,2,4]});
});

/* GET specific user travel */
//user/travel?id_user=jyuytf&id_travel=uytguytv
router.get('/:user_id/travel/:travel_id', function(req, res, next) {
    var user_id   = req.params.user_id,
        travel_id = req.params.travel_id;

    console.log("travel " + travel_id + " of user " + user_id);
    /*
     * TODO fetch a specific (travel_id) travel of a specific user(user_id)
     *
     */
    res.json({"travel":{"data":"empty"}});
});



module.exports = router;

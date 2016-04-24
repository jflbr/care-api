var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({"travel":[]});
});

/* GET specific user travel */
router.get('/travels/:user_id/travel/:travel_id', function(req, res, next) {
    var user_id   = req.params.user_id,
        travel_id = req.params.travel_id;

    console.log("travel " + travel_id + " of user " + user_id);
    /*
     * TODO fetch a specific (travel_id) travel of a specific user(user_id)
     *
     */
    res.json({"travel":{}});
});

module.exports = router;

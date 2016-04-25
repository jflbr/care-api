var GoogleMapsAPI = require('googlemaps');

exports.google = function () {
    var publicConfig = {
      key: 'AIzaSyCKWU0243b7kLwzfkHnkilozy3bRcEvPas',
      stagger_time:       1000, // for elevationPath
      encode_polylines:   false,
      secure:             true, // use https
      //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
    };


    var initialize = function () {
        var gmAPI  = new GoogleMapsAPI(publicConfig);
    };


    var direction = function (request) {

console.log();
        request = {
          origin: new gmAPI.maps.LatLng(45.764043, 4.835659),
          destination: new gmAPI.maps.LatLng(45.772459, 4.844595),
          region: "FR"
        };

        var directionService = new  gmAPI.DirectionsService();
        directionService.route(request,function (result,status) {
            if (status == GoogleMapsAPI.maps.DirectionsStatus.OK) {
                console.log(result);
              }
        });
    }

};

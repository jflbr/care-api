var config = {};
var UserType    = require('./models/Constants').UserType;

config.db = {
    uri          : "mongodb://localhost/test",
    username     : "",
    password     : "",

    collections  : {
        users    : "USERS"
    },

    models       : {
        user     : "User"
    }
};

config.default = {
    admin : {
            email        : "jflbr@somewhere.io",
            password     : "admin",
            name         : 'Jeyfel',
            description  : 'Kittttttteeeen loveeeeeer' ,
            userType     :  UserType.ADMIN
     }
}
module.exports = config;

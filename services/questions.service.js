var config = require('config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};


service.get = get;
service.create = create;
service.delete = _delete;

//tornando visível o service
module.exports = service;


function get() {
    var deferred = Q.defer();

    db.questions.find({}).toArray(function (err, items) {
        if (err) {
            console.log(err);
            deferred.reject(err.name + ': ' + err.message);
        }
        console.log(items);
            // user not found
            deferred.resolve(items);
        
    });

    return deferred.promise;
}

function create(quest) {
    console.log(quest);
    var deferred = Q.defer();

    db.questions.insert(
        quest,
        function (err) {
            if (err) {
                console.log(err);
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });
    return deferred.promise;
}


function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err)  {
            console.log(err);
            deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });

    return deferred.promise;
}
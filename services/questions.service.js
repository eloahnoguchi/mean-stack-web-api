var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};


service.get = get;
service.create = create;
service.delete = _delete;

module.exports = service;


function get() {
    var deferred = Q.defer();

    db.questions.find(_id, function (err, quest) {
        if (err) deferred.reject(err.name + ': ' + err.message);

            // user not found
            deferred.resolve();
        
    });

    return deferred.promise;
}

function create(quest) {
    var deferred = Q.defer();

    db.questions.insert(
        quest,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    return deferred.promise;
}


function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
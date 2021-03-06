var config = require('config.json');
var express = require('express');
var router = express.Router();
var questService = require('services/questions.service');

// routes
router.post('/register', registerQuest);
router.get('/', getAllQuest);
router.delete('/:_id', deleteQuest);


module.exports = router;

function registerQuest(req, res) {
    questService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllQuest(req, res) {
    questService.get()
        .then(function (quest) {
            console.log(quest.lenght);
            if (quest.lenght > 0) {
                res.send(JSON.stringify(quest));
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteQuest(req, res) {
    questService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
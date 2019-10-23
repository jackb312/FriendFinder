var friends = require("../data/friends");
var express = require("express");
var bodyparser = require("body-parser");
var apirouter = express.Router();
apirouter.get("/api/friends", function(req, res){
    res.json(friends);
})
apirouter.post("/api/friends", function(req, res){
    console.log("posting: ");
    var newFriend = req.body;
    console.log(newFriend);
    var newScore = function(array){
        var newScore = [];
        for(var i = 0; i < array.length; i++){
            newScore.push(parseInt(array[i]));
        }
        return newScore;
    }
    var totalDiff = function(arrA, arrB){
        delta = 0;
        for(var i = 0; i < arrA.length; i++){
            delta += Math.abs(arrA[i] - arrB[i]);
        }
        return delta;
    }
    function indexOfMin(array){
        if(array.length === 0){
            return -1;
        }
        var min = array[0];
        var minIndex = 0;
        for(var i = 1; i < array.length; i++){
            if(array[i] < min){
                minIndex = i;
                min = array[i];
            }
        }
        return minIndex;
    }
    var newFriendScore = newScore(newFriend["scores[]"]);
    var currentFriendScores = [];
    var differences = [];
    for(var i = 0; i < friends.length; i++){
        currentFriendScores.push(newScore(friends[i]["scores[]"]));
    }
    for(var i = 0; i < currentFriendScores.length; i++){
        differences.push(totalDiff(newFriendScore, currentFriendScores[i]));
    }
    console.log("calculating...");
    console.log(newFriendScore);
    console.log(currentFriendScores);
    console.log(differences);
    var minFriend = indexOfMin(differences);
    var matchFriend = friends[minFriend];
    console.log("matching...");
    console.log(matchFriend);
    friends.push(newFriend);
    res.json(matchFriend);
})
module.exports = apirouter;
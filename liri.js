require("dotenv").config();


var fs = require('fs');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require('inquirer');
var command = process.argv[2];
var query = process.argv[3];


function getSpotify(songName){
var spotify = new Spotify (keys.spotify);
if (songName === undefined) {
    songName = "The Sign Ace of Base";
}
spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    } else {
        output =
        "\n" +   "Song: " + "'" + songName +
        "\n" +    "Album: " + data.tracks.items[0].album.name +
        "\n" +    "Artist: " + data.tracks.items[0].album.artists[0].name +
        "\n" +    "Song Preview: " + data.tracks.items[0].album.external_urls.spotify;
        console.log(output);
        }
    });
}   

function getMovie(movieName){
    var omdbapi = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    if (movieName === undefined) {
        movieName = "Mr Nobody"
    }
    request(omdbapi, function(err, res, body) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            var jsonData = JSON.parse(body);
           output= 
           "\n" + 'Title: ' + jsonData.Title +
           "\n" + 'Year: ' + jsonData.Year +
           "\n" + 'Rated: ' + jsonData.Rated +
           "\n" + 'IMDB Rating: ' + jsonData.imdbRating +
           "\n" + 'Country: ' + jsonData.Country +
           "\n" + 'Language: ' + jsonData.Language +
           "\n" + 'Plot: ' + jsonData.Plot +
           "\n" + 'Actors: ' + jsonData.Actors +
           "\n" + 'IMDb Rating: ' + jsonData.imdbRating + "\n";

            console.log(output);
        }
    });
};


function getConcert(artist){
    var bandsApi = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    if (artist === undefined) {
        artist = "Death Grips"
    }
    request(bandsApi, function (err, res, body){
        if (err){
            console.log('error occured: ' + err);
            return;
        } else {
            var jsonData =JSON.parse(body);
            output = 
            "\n" + "Venue: " + jsonData.VenueData.name +
            "\n" + "Venue location " + jsonData.VenueData.city +
            "\n" + "Date and time: " + jsonData.EventData;
            console.log(output);
        }
    })
};

    
if(command === "spotify-this-song"){
    getSpotify(query);
} else if(command === "movie-this"){
    getMovie(query);
} else if (command === "concert-this"){
    getConcert(query);
}


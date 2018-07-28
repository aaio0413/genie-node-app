//npm install ------ request, dotenv, twitter, and spotify
//depenencies

const request = require('request');
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const fs = require("fs");
const inquirer = require("inquirer");


const spotify = new Spotify(keys.s);
const client = new Twitter(keys.t);

var commando = process.argv[2];
// var parameter = process.arg[3];
var userInput = process.argv;


// var spotify = new Spotify({
//     id: keys.s.id,
//     secret: keys.s.secret
// });

// var client = new Twitter({
//     consumer_key: keys.t.consumer_key,
//     consumer_secret: keys.t.consumer_secret,
//     access_token_key: keys.t.access_token_key,
//     access_token_secret: keys.t.access_token_secret
// });

// console.log(keys.s);
// console.log(spotify+ ', ' + client);

// console.log('The private information for spotify: ' + spotify.id + '. \n The private information for twitter: ' + client.consumer_key);
// console.log(spotify.id + ', ' + client.consumer_key);


// * `my-tweets`

var myTweets = function() {
    var params = {screen_name: '@Tagenie3', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var arrayNum = tweets.length;
            var tweetsArray = [arrayNum];
            var element;
            for (i=0; i < tweets.length; i++) {
                element = tweets[i].text + ', created at: ' + tweets[i].created_at + '.' + '\n';
                tweetsArray.push(element);
            };
            console.log(tweetsArray.join(""));
        } else {
            console.log(error);
        }
    });


// var params = {
//     q: '@Tagenie3',
//     // page: "https://twitter.com/Tagenie3/with_replies",
//     count: 20
// }

// var TWID;

// client.get('users/search', {q: '@Tagenie3'}, function(error, tweets, response) {
//     console.log(tweets[0].id);
//     TWID = tweets[0].id;
// });

// client.stream('users/search', {user: TWID},  function(stream) {
//     stream.on('data', function(tweet) {
//       console.log(tweet.text);
//     });
  
//     stream.on('error', function(error) {
//       console.log(error);
//     });
// });
}

// myTweets();



// * `spotify-this-song`
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

var songSearch = function(searchParamter) {
    spotify.search({ type: 'track', query: searchParamter , limit: 5}).then(function(response) {
        // if (err) {
        // return console.log('Error occurred: ' + err);
        // }
        var r = response;
        // console.log(r); 
        console.log(r.tracks.items[0].name);//the song hit by search
        console.log(r.tracks.items[0].album.name);//album name
        console.log(r.tracks.items[0].album.artists[0].name);//artist
        var theUrl = r.tracks.items[0].preview_url;
        if (theUrl === null) {
            console.log('There is no preview link provided apparently..');
        } else {
            console.log(r.tracks.items[0].preview_url);//preview
        }
    });
}



var spotify_this_song = function(userInput) {
    var searchTrack = '';
    var length = userInput.length;
    
    // var defo = 'the sign ace of base';

    if(length < 4) {
        searchTrack = 'ace of base'
    } else if (length === 4) {
        searchTrack = process.argv[3];
    } else if (length > 4) {
        console.log("please use quotations around your query parameter")
        return;
    }
    console.log("you are searching for", searchTrack);
    songSearch(searchTrack);

        // spotify.search({ type: 'track', query: searchTrack, limit: 5}).then(function(response) {
        //     // if (err) {
        //     // return console.log('Error occurred: ' + err);
        //     // }
        //     var r = response;
        //     // console.log(r); 
        //     console.log(r.tracks.items[0].name);//the song hit by search
        //     console.log(r.tracks.items[0].album.name);//album name
        //     console.log(r.tracks.items[0].album.artists[0].name);//artist
        //     var theUrl = r.tracks.items[0].preview_url;
        //     if (theUrl === null) {
        //         console.log('There is no preview link provided apparently..');
        //     } else {
        //         console.log(r.tracks.items[0].preview_url);//preview
            // }

    // inquirer.prompt([
    //     {
    //         name: 'track',
    //         message: 'What song are you looking for?',
    //         default: 'The%20Sign'
    //     }, {
    //         name: 'artist',
    //         message: 'Artist\'s name?',
    //         default: 'Ace%20of%20Base'
    //     }
    // ]).then(function(answers) {
       
    //     console.log(searchTrack);

    //     spotify.search({ type: 'track', query: searchTrack, limit: 5}).then(function(response) {
    //         // if (err) {
    //         // return console.log('Error occurred: ' + err);
    //         // }
    //         var r = response;
    //         // console.log(r); 
    //         console.log(r.tracks.items[0].name);//the song hit by search
    //         console.log(r.tracks.items[0].album.name);//album name
    //         console.log(r.tracks.items[0].album.artists[0].name);//artist
    //         console.log(r.tracks.items[0].preview_url);//preview

    //         // for (i = 0; i < 5; i++) {
    //         //     var newEl = '';
    //         //     newEl += r.tracks.items[i].name + r.tracks.items[i].album.name + r.tracks.items[i].album.artists[i].name
    //         //             +  r.tracks.items[i].preview_url;
    //         //     searchTrack.push(newEl);    
    //         // }
    //         // console.log(searchTrack.join(""));
    //     });
    // });
}

// spotify_this_song();

// var paramS = {
//     track: 'A Whole New World',
//     artist: 'Aladdin'
// }
// spotify.search({ type: 'track', query: paramS, limit: 5}).then(function(response) {
//     // if (err) {
//     // return console.log('Error occurred: ' + err);
//     // }
//     var r = response;
//     // console.log(r); 
//     // console.log(data.artists.href + ', ' + data.artists.href.items); 
//     console.log(r.tracks.items[0]);
//     console.log(r.tracks.items[0].name);//the song hit by search
//     console.log(r.tracks.items[0].album.name);//album name
//     console.log(r.tracks.items[0].album.artists[0].name);//artist
//     console.log(r.tracks.items[0].preview_url);//preview

// });






// * `movie-this`
var movie_this = function(userInput) {
    var movieTitle = '';
    if(userInput.length < 4) {
        movieTitle = 'mr+nobody';
    } else {
        for (i=3; i < userInput.length; i++) {
            movieTitle += '+' + process.argv[i];
        }
    }
    console.log(movieTitle);
   

    var requestUrl = 'http://www.omdbapi.com/?t=' + movieTitle +'&y=&plot=short&apikey=trilogy';
    request(requestUrl, function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
       

        console.log('Title: ' + JSON.parse(body).Title);
        console.log('The movie was released at: ' + JSON.parse(body).Released);
        console.log('The IMDB rating of the movie: ' + JSON.parse(body).imdbRating);
        // console.log(JSON.parse(body).Ratings[1].Value);
        // var str =JSON.stringify(JSON.parse(body).Ratings[1]);
        // str = str.substring(str.indexOf(","));
        // console.log('The Rotten Tomatoes\'s rating is: '+ str)
        // console.log('the length of Ratings array is: ' + JSON.parse(body).Ratings.length);
        
        var ratingsLength = JSON.parse(body).Ratings.length;
        if (ratingsLength > 1) {
            console.log('The Rotten Tomatoes\'s rating is: ' + JSON.parse(body).Ratings[1].Value);
        } 
        console.log('The country where this movie was produced: ' + JSON.parse(body).Country);
        console.log('Language of the movie: ' + JSON.parse(body).Language);
        console.log('This movie\'s plot: ' +JSON.parse(body).Plot);
        console.log('The main actors/actresses: ' +JSON.parse(body).Actors);

    } else {
        console.log(error);
    }
    });
}

// movie_this();


// * `do-what-it-says`
var do_wath_it_says = function() {
    var arrayForFile = fs.readFileSync('random.txt').toString().split("\n");
    var randomVar = Math.floor(Math.random()*arrayForFile.length);
    // console.log(arrayForFile[randomVar]);

    var str = arrayForFile[randomVar];
    var remaining = arrayForFile[randomVar];
    var start = remaining.indexOf(',') + 2;
    var last = remaining.length - 1;
    remaining = remaining.substring(start, last);
    // console.log(remaining);

    str = str.substring(0, str.indexOf(','));
    var remaining = str.substring(0, str.indexOf(','))
    // console.log(str);

    console.log(remaining);
    playGenie(str);
    

}

// function readLines(file) {
//     var remaining = '';
  
//     file.on('data', function(data) {
//       remaining += data;
//       var index = remaining.indexOf('\n');
//       var last  = 0;
//       while (index > -1) {
//         var line = remaining.substring(last, index);
//         last = index + 1;
//         arrayForFile.push(line);
//         index = remaining.indexOf('\n', last);
//       }
  
//       remaining = remaining.substring(last);
//     });
  
//     file.on('end', function() {
//       if (remaining.length > 0) {
//         console.log('The remaining is: ' + remaining);
//       }
//     });
// }

// do_wath_it_says();


const playGenie = () => {
    switch(commando) {
        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            spotify_this_song(userInput);
            break;
        
        case 'movie-this':
            movie_this(userInput);
            break;
        
        case 'do-what-it-says':
            do_wath_it_says();
            break;
    }
}
playGenie();
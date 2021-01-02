#!/usr/bin/env node

'use strict';

const args = require('yargs').argv;
var request = 'http://0.0.0.0:4444/'

/**
 * Find Screen: link argument will be sent to backend and song data will be logged to console
*/
if(args.screen === 'find'){
  request = request.concat('query/')
  request = request.concat(args.link)
  const axios = require('axios');
  axios.get(request)
  .then(response => {
    var jsonApi = response.data
    if(jsonApi.status === "success"){
        console.log("\nGood news! We found your song")
        console.log("------------------------------------")
        console.log("Song: " + (jsonApi.result.spotify.name))
        console.log("Artist: " + (jsonApi.result.artist))
        console.log("Album: " + (jsonApi.result.album))
        console.log("Release Date: " + (jsonApi.result.album))
        console.log("\n")

    }
    else if(jsonApi.status === "fail"){
      console.log("\nSorry! We could not find your song. This is what we know:")
      console.log("------------------------------------")
      console.log("Song: " + (jsonApi.title))
      console.log("Artist: " + (jsonApi.artist))
      console.log("Album: " + (jsonApi.album))
      console.log("\n")
    }
  })
  .catch(error => {
    console.log(error);
  });
}

/**
 * Saved Screen: Saved song data will be logged to console
*/
else if(args.screen === 'saved'){
  request = request.concat('getsaved')
  const axios = require('axios');
  axios.get(request)
  .then(response => {
    var jsonApi = response.data
    console.log("\nSaved songs")
    console.log("------------------------------------")
    var i
    for (i in jsonApi) {
      console.log("Song: " + (jsonApi[i]["Song Name"]))
      console.log("Artist: " + (jsonApi[i]["Artist"]))
      console.log("Album: " + (jsonApi[i]["Album"]))
      console.log("\n")
    }
  })
  .catch(error => {
    console.log(error);
  });
}

/**
 * Trending Screen: Success message will be logged to console upon successful add of trending audios to Spotify
*/
else if(args.screen === 'trending'){
  request = request.concat('addtrending')
  const axios = require('axios');
  axios.get(request)
  .then(response => {
    var jsonApi = response.data
    if(jsonApi === 'success'){
      console.log("Successfully added trending audios to your Spotify playlist")
    }
  })
  .catch(error => {
    console.log(error);
  });
}


/**
 * Recommended Screen: Success message will be logged to console upon successful add of recommended audios to Spotify
*/
else if(args.screen === 'recommended'){
  request = request.concat('addrecommended')
  const axios = require('axios');
  axios.get(request)
  .then(response => {
    var jsonApi = response.data
    if(jsonApi === 'success'){
      console.log("Successfully added recommended audios to your Spotify playlist")
    }
  })
  .catch(error => {
    console.log(error);
  });
}

/**
 * Handling invalid argument(s) here
*/
else{
  console.log("Invalid screen argument!")
}

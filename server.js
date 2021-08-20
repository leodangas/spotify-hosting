const express = require('express');
const cors = require('cors');

const app = express();

let SpotifyWebApi = require("spotify-web-api-node");
  const spotifyApi = new SpotifyWebApi({
    clientId: "b47acdb7d08d4934992db2db40b1de1e",
    clientSecret: "b8cb5b5c4aeb4c4a8871964250f2f5c0",
  });

  // Retrieve an access token using my credentials
  const newToken = () => {
    spotifyApi.clientCredentialsGrant().then(function (result) {
      spotifyApi.setAccessToken(result.body.access_token)
    })
    .catch(function (err) {
      console.log(
        "If this is printed, it probably means that you used invalid " +
          "clientId and clientSecret values. Please check!"
      );
      console.log("Hint: ");
      console.log(err);
    });
  }
  newToken();

  //Refresh an access token every hour
  tokenRefreshInterval = setInterval(newToken, 1000 * 60 * 59);
 
  //Get playlists for category
  app.get("/api/categories", (req, res) => {
    const { id } = req.query;
    spotifyApi.getPlaylistsForCategory(id, {
      limit : 50,
      country: 'US'
    })
  .then(function(data) {
    res.json(data.body);
  }, function(err) {
    console.log("Something went wrong!", err);
  });
  })
  
  //Get playlist's info and songs
  app.get("/api/playlist", (req, res) => {
    const { id } = req.query;
    spotifyApi.getPlaylist(id)
    .then(function(data) {
      res.json(data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  })

  //Get categories
  app.get("/api/playlists", (req, res) => {
    spotifyApi.getCategories({limit: 50, country: 'US'})
    .then(function(data) {
      res.json(data.body.categories);
    }, function(err) {
      console.log("Something went wrong!", err);
    });
  })

  //Get tracks from search
  app.get("/api/searchtracks", (req, res) => {
    const { id } = req.query;
    spotifyApi.searchTracks(id)
    .then(function(data) {
      res.json(data.body);
    }, function(err) {
      console.error(err);
    });
  })

  //Get playlists from search
  app.get("/api/searchplaylists", (req, res) => {
    const { id } = req.query;
    spotifyApi.searchPlaylists(id)
    .then(function(data) {
      res.json(data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  })
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
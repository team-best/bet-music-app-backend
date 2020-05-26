'use strict';

var express = require('express');
var router = express.Router();


var SpotifyWebApi = require('spotify-web-api-node');
var scopes = [];

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req,res) => {
  console.log('here');
  var getPage = spotifyApi.createAuthorizeURL(scopes);
  console.log(getPage);
  res.send(getPage);
  // +'&show_dialog=true';
});

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code);
  try {
    var data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:3001/home');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

module.exports = router;

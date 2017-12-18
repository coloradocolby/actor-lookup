const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

require('dotenv').config()

const PORT = process.env.PORT || 8000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const app = express();


// Parsers for POST data
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(express.static(path.resolve(__dirname, 'build')));

app.post('/api/people', (req, res) => {
  const query = req.body.query;
  axios.get(`https://api.tmdb.org/3/search/person?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(resp => res.send(resp.data));
});

app.post('/api/person/id', (req, res) => {
  const id = req.body.id;
  axios.get(`https://api.tmdb.org/3/person/${id}?api_key=${TMDB_API_KEY}`)
    .then(resp => res.send(resp.data));
});

app.post('/api/person/name', (req, res) => {
  const name = req.body.name;
  axios.get(`https://api.tmdb.org/3/search/person?api_key=${TMDB_API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`)
    .then(resp => res.send(resp.data));
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

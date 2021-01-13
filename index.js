require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const jobs = require('./routes/jobs');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = 'mongodb://127.0.0.1:27017/';
const dbName = 'job-listing-app';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Job Listing API')
});

app.use('/api/jobs', jobs);

app.use('/api/jobs', users);

mongoose.connect(dbConfig + dbName, {
  useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(result => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err))
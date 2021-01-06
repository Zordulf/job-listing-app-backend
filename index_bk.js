require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const jobs = [
  {
    id: 1,
    position: 'Software Engineer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 2,
    position: 'Quality Assurance Engineer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }  
];

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// VIEW ALL LISTING
app.get('/api/listing', (req, res) => {
  res.send(jobs)
});

// VIEW SPECIFIC LISTING
app.get('/api/listing/:id', (req, res) => {
  const job = jobs.find(job => job.id === parseInt(req.params.id));

  if (!job) {
    res.status(404).send('The job with the given ID cannot be found.');
  }
  res.send(job);
});

app.use(express.json());

// CREATE LISTING
app.post('/api/listing', (req, res) => {

  if(!req.body.position || !req.body.description) {
    return res.status(400).send('Position and description are required!')
  }

  const job = {
    id: jobs.length + 1,
    position: req.body.position,
    description: req.body.description,
  };

  jobs.push(job);
  res.send(job);
});

// UPDATE LISTING
app.put('/api/listing/:id', (req, res) => {

  const job = jobs.find(job => job.id === parseInt(req.params.id));

  if (!job) {
    res.status(404).send('The job with the given ID cannot be found.');
  } 
  
  else if (!req.body.position || !req.body.description) {
    return res.status(400).send('Position and description are required!')
  }

  job.position = req.body.position;
  job.description = req.body.description;

  res.send(job);
});

// DELETE LISTING
app.delete('/api/listing/:id', (req, res) => {
  const job = jobs.find(job => job.id === parseInt(req.params.id));

  if (!job) {
    res.status(404).send('The job with the given ID cannot be found.');
  }

  const index = jobs.indexOf(job);
  jobs.splice(index, 1);

  res.send(job);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
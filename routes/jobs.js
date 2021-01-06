const express = require('express');
const { check, validationResult } = require('express-validator');
const Job = require('../models/Job');
const router = express.Router();
const validate = [
  check('position')
    .isLength({min: 3, max: 50})
    .withMessage('Title should be between 3 to 50 characters!'),
  check('description')
    .isLength({min: 10, max: 200})
    .withMessage('Title should be between 10 to 200 characters!'),
  check('location')
    .isLength({min: 10, max: 100})
    .withMessage('Title should be between 10 to 100 characters!'),
  check('salary').isNumeric().withMessage('Price should be a number')
];

// CREATE JOB LISTING
router.post('/', validate, (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).send({errors: errors.array()});
  }

  const job = new Job({
    position: req.body.position,
    description: req.body.description,
    location: req.body.location,
    skills: req.body.skills,
    salary: req.body.salary,
    image: req.body.image
  });

  job.save()
    .then(result => {
      res.send({
        message: 'Job data created successfully',
        data: result
      })
    })
    .catch(err => console.log(err))
});

// VIEW JOB LISTINGS
router.get('/', (req, res) => {
  Job.find()
    .then(jobs => {
      res.send(jobs)
    })
    .catch(err => console.log(err))
});

// VIEW SINGLE JOB LISTING
router.get('/:id', (req, res) => {
  const jobId = req.params.id;

  Job.count({_id: jobId}, function (err, count){ 
    if(!count>0){
      res.status(404).send('The job with the given ID cannot be found.');
    }
  });

  Job.findById(jobId)
    .then(job => {
      res.send(job);
    })
    .catch(err => console.log(err))
});

// UPDATE JOB LISTING
router.put('/:id', validate, (req, res) => {
  const jobId = req.params.id;
  const errors = validationResult(req);

  Job.count({_id: jobId}, function (err, count){ 
    if(!count>0){
      res.status(404).send('The job with the given ID cannot be found.');
    }
  });
  
  if(!errors.isEmpty()){
    return res.status(422).send({errors: errors.array()});
  }

  Job.findById(jobId)
    .then(job => {
      job.position = req.body.position;
      job.description = req.body.description;
      job.location = req.body.location;
      job.skills = req.body.skills;
      job.salary = req.body.salary;
      job.image = req.body.image;

      return job.save();
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err))
})

// DELETE JOB LISTING
router.delete('/:id', (req, res) => {
  const jobId = req.params.id;

  Job.count({_id: jobId}, function (err, count){ 
    if(!count>0){
      res.status(404).send('The job with the given ID cannot be found.');
    }
  }); 

  Job.findByIdAndRemove(jobId)
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err))

});

module.exports = router;
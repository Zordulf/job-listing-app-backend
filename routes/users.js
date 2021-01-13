const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validate = [
  check('fullName')
    .isLength({min: 6, max: 50})
    .withMessage('full name should be between 6 to 50 characters!'),
  check('email')
    .isLength({min: 6, max: 50})
    .withMessage('email should be between 6 to 50 characters!'),
  // check('passwordHash')
  check('password')
    .isLength({min: 6, max: 50})
    .withMessage('password should be between 6 to 50 characters!')
];

// REGISTER USER
router.post('/register/', validate, async (req, res) => {

  const exist = await User.findOne({email: req.body.email});
  const errors = validationResult(req);

  if(!exist) {
    if(!errors.isEmpty()){
      return res.status(422).send({errors: errors.array()});
    }
  
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password
      // passwordHash: bcrypt.hashSync(req.body.password, 10)
    });
  
    const data = await user.save()
      .then(result => {
        res.send({
          message: 'User registered successfully',
          data: result
        })
      })
      .catch(err => console.log(err))
      
    if(!data) {
      return res.status(404).send('The user cannot be created. Please try again.');
    }
  
    return data;

  } else {

    return res.status(400).send('User already exists!');

  }

});

// LOGIN USER
router.post('/login/', async (req, res) => {

  // check if email is existing
  const user = await User.findOne({email: req.body.email});
  // const secret = process.env.secret;

  if(!user) {

    return res.status(400).json({message: "User doesn't exist!"});

  } else {
    // check if email and password is correct
    if( user && req.body.password == user.password ) {
      // const token = jwt.sign(
      //   { 
      //     userId: user._id
      //   }, 
      //   secret, //secret parameter
      //   {
      //     expiresIn: '1d' //1 day //1w - 1 week 1m - 1 month
      //   } 
      // )

      // return res.status(200).send({user: user.email, token:token});
      
      return res.status(200).json({user: user.email});

    } else {

      return res.status(400).json({message: 'Password is incorrect!'});

    }
  }
});

module.exports = router;
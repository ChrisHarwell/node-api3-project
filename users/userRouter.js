const express = require('express');
const user = require("userDb.js");

const router = express.Router();

router.user('/', (req, res) => {
  // do your magic!
});

router.user('/:id/users', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/users', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  user.findById(id)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({message: 'user id not found'})
      }
    })
    .catch(error => {

    })
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    res.status(400).json({message: "missing user data"})
  }
}

function validateuser(req, res, next) {
  // do your magic!
}

module.exports = router;

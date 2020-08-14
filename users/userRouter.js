const express = require('express');
const user = require("./userDb.js");
const { getById, remove, get, update } = require("./userDb.js");
const router = express.Router();

// router.user('/', (req, res) => {
//   // do your magic!
// });

// router.user('/:id/users', validateUserId, (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res) => {
  // do your magic!
  user
    .get(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  user
    .get(id)
    .then((post) => {
      res.status(200).json(req.user);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.get('/:id/users', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  getById(id)
  .then(users => {
    res.status(200).json(users);
  })
  .catch (error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting the users',
    });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const { text } = req.body;

  getById(id).then((post) => {
    post === 0
      ? res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      : remove(id).then((removedPost) => {
          if (removedPost === 1) {
            get().then((posts) => {
              if (post) {
                res.status(200).json(post);
              } else {
                res
                  .status(500)
                  .json({ error: "The post could not be removed" });
              }
            });
          }
        });
  });
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;

  update(id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  user.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({message: 'user id not found'})
      };
    })
    .catch(error => {

    });
};

function validateUser(req, res, next) {
  // do your magic!
  if(req.body && Object.keys(req.body).length > 0 && req.body.name) {
    next();
  } else {
    res.status(400).json({message: "missing user data"})
  };
};

module.exports = router;
const express = require("express");
const post = require("postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  post.findById(id)
    .then(post => {
      if(post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({message: 'post id not found'})
      }
    })
    .catch(error => {

    })
}

module.exports = router;

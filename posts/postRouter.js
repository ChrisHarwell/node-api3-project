const express = require("express");
const data = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  data
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

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  data
    .get(id)
    .then((post) => {
      res.status(200).json(req.post);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
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

  data
    .getById(id)
    .then((data) => {
      if (data) {
        req.post = data;
        next();
      } else {
        res.status(404).json({ message: "post id not found" });
      }
    })
    .catch((error) => {});
}

function validatePost(req, res, next) {
  const requestBody = req.body;
  try {
    if (requestBody.length() <= 0) {
      res.status(400).json({ message: "missing user data" });
    } else if (requestBody.text.length() < 0) {
      res.status(400).json({ message: "missing required text field" });
    }
    {
    }
  } catch (error) {}
}

module.exports = router;

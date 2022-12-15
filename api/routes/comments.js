const router = require("express").Router();

const Comment = require("../models/Comment");
const User =require("../models/User")

//CREATE  comment
// @status: public
// @method: POST, save()
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
// @status:private
// @method: PUT,findById()
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.username === req.body.username) {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
// @status: private
// @method: DELETE,findById(),delete()
router.delete("/:id", async (req, res) => {
  try {
    const user= await User.findById(req.params.id);
    if (user.username === req.body.username) {
      try {
        await Comment.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
// @status: private
// @method:GET,findById()
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
      res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
// @method: GET,find()
router.get("/", async (req, res) => {
  
  try {
   comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

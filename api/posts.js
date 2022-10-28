const express = require("express");
const postsRouter = express.Router();
const { getAllPosts } = require("../db");
const { requireUser } = require("./utils");

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const postData = {};
  if (tagArr.length) {
    postData.tags = tagArr;
  }
  try {
    const postData = { authorId: req.user.id, title, content };
    const post = await createPost(postData);
    if (post) {
      res.send(post);
    } else {
      next({ name: "error", message: "this is an error" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.send({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = postsRouter;

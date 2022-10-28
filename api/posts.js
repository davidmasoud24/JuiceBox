const express = require("express");
const postsRouter = express.Router();
const { getAllPosts } = require("../db");

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

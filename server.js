//import modules needed
import pkg from "pg";
const { Pool } = pkg;

import express from "express";

import dotenv from "dotenv";

import cors from "cors";
import { create } from "domain";
dotenv.config();

//select column name from table 1

// const dbString = process.env.DATABASE_URL;

// const port = process.env.PORT;

// const pool = new Pool({
//   connectionString: dbString,
// });

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "blog_app_7fno01",
  user: "Yasmin Aguilar",
  password: "123",
});

pool.connect(() => {
  console.log("Connected to the database");
});

const app = express();

//middleware

app.use(express.json());
app.use(cors({ origin: "*" }));

//routes
//purpose: get all blog posts
app.get("/blog_posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blog_posts");
    // if (result.rowCount === 0) {
    //   res.status(404).send("Not Found");
    // } else {
    res.status(200).json(result.rows);
    //}
  } catch (err) {
    console.error("Unable to grab posts for you!", err);
    res.status(500).send("Internal Server Error: Blog Posts");
  }
});

//purpose: get a users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    if (result.rowCount === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error("Unable to grab users for you!", err);
    res.status(500).send("Internal Server Error: Users");
  }
});

//purpose: to get specific user's comments
app.get("/users/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM comments WHERE user_id = ${id}`
    );
    console.log(result);

    if (result.rowCount === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error("Unable to grab posts for you!", err);
    res.status(500).send("Internal Server Error: Users");
  }
});

//purpose: to get all comments from specific blog
app.get("/blog_posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [id]
    );
    console.log(result.rows);

    if (result.rowCount === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error("Unable to grab post comments for you!", err);
    res.status(500).send("Internal Server Error: Comments");
  }
});

//search functionality
app.get("/blog_posts/search", async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE post_title LIKE $1",
      [`%${searchTerm}%`]
    );
    if (result.rowCount === 0) {
      res.status(404).send("No Post Found: Search");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error("Error while searching blog posts!", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//purpose: get specific blog
app.get("/blog_posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM blog_posts WHERE post_id = $1`,
      [id]
    );
    console.log(result.rows);

    if (result.rowCount === 0) {
      res.status(404).send("Not Found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Unable to grab the post!", err);
    res.status(500).send("Internal Server Error: Blog Post");
  }
});

//purpose: to create a new blog post (only i should be able to make blog post.. btw)
app.post("/blog_posts", async (req, res) => {
  const { post_title, blog_post, creator, created_at } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO blog_posts (post_title, blog_post, creator, created_at) VALUES ($1, $2, $3, $4)`,
      [post_title, blog_post, creator, created_at]
    );
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(result.rows[0]);
  } catch (err) {
    console.error("Unable to create new post!", err);
    res.status(500).send("Internal Server Error: Create Post");
  }
});

// purpose: create a comment
app.post("/comments", async (req, res) => {
  const { comment_body, post_id, user_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO comments (comment_body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [comment_body, post_id, user_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Unable to create a new comment!", err);
    res.status(500).send("Internal Server Error: Create Comment");
  }
});

//purpose: update a comment, for users.
app.put("/blog_posts/:id/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { comment_body } = req.body;

  try {
    const result = await pool.query(
      `UPDATE comments SET comment_body = $1 WHERE comment_id = $2 AND post_id = $3 RETURNING *`,
      [comment_body, id, id]
    );
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(result.rows);
  } catch (err) {
    console.error("Unable to update comment!");
    res.status(500).send("Internal Server Error: Update Comment");
  }
});

//purpose: update a blog post
app.put("/blog_posts/:id", async (req, res) => {
  const { id } = req.params;
  const { blog_post, post_title, creator, created_at } = req.body;

  try {
    const result = await pool.query(
      `UPDATE blog_posts SET (post_title = $1, blog_post = $2, creator = $3, created_at = $4)  WHERE post_id = $5 RETURNING *`,
      [blog_post, id, post_title, creator, created_at]
    );
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(result.rows);
  } catch (err) {
    console.error("Unable to update blog post!");
    res.status(500).send("Internal Server Error: Update Comment");
  }
});

//purpose: delete a specific blog post (for me)
app.delete("/blog_posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM blog_posts WHERE post_id = $1",
      [id]
    );
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(result.rows[0]);
  } catch (err) {
    console.error("Unable to delete post!", err);
    res.status(500).send("Internal Server Error: Delete Post");
  }
});

//purpose: delete a specific comment (for users) they can only delete their own. figure out authenification for app
app.delete("/blog_posts/:id/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM comments WHERE post_id = $1 AND comment_id = $2",
      [id, id]
    );
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(result.rows[0]);
  } catch (err) {
    console.error("Unable to delete comment!", err);
    res.status(500).send("Internal Server Error: Delete Comment");
  }
});

//listener
// app.listen(port, () => {
//   console.log(`I am listening on port: ${port}`);
// });
app.listen(4000, () => {
  console.log(`I am listening on port: 4000`);
});

// app.listen(port, () => {
//   console.log(`I am listening on port: ${port}`);
// });

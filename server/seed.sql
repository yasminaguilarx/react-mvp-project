-- db name is react-mvp-app
--migrate with \i ./seed.sql


DROP TABLE IF EXISTS blog_posts CASCADE;
-- DROP TABLE IF EXISTS comments CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- blog posts table
CREATE TABLE blog_posts (
  post_id SERIAL,
  post_title VARCHAR(255) NOT NULL,
  blog_post TEXT,
  creator VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"blog_posts"', 'post_id')), (SELECT (MAX("post_id") + 1) FROM "blog_posts"), FALSE);

-- user table
-- CREATE TABLE users (
-- user_id SERIAL PRIMARY KEY,
-- user_name VARCHAR(50),
-- user_email TEXT
-- );

-- CREATE TABLE comments (
--   comment_id SERIAL PRIMARY KEY,
--   comment_body VARCHAR(150),
--   user_id INT,
--   post_id INT,
--   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
--   FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE
-- );

--seed data into blog posts
INSERT INTO blog_posts (post_id, post_title, blog_post, created_at, creator)
VALUES
  (1, 'Introduction', 'Get to know me', CURRENT_TIMESTAMP, 'example1'),
  (2, 'Intro part 2', 'Get to know me part 2', CURRENT_TIMESTAMP, 'example2'),
  (3, 'Day in the Life', 'As you may know, I am getting out of the Army, and soon will be looking for a job, crazy huh?', CURRENT_TIMESTAMP, 'example3');

--seed data into user table
-- INSERT INTO users (user_id, user_name, user_email)
-- VALUES
--   (1, 'example-name', 'example@gmail.com'),
--   (2, 'example-yasmin', 'example-yasmin@gmail.com');

-- --seed data into comments
-- INSERT INTO comments (comment_id, comment_body, post_id, user_id)
-- VALUES
--   (1, 'Simple introduction for me as a software engineer', 1, 1),
--   (2, 'Sounds like a boring life', 3, 2);


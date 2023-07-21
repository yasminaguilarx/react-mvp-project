import React, { useState } from "react";

function Update({ post, setPosts, setUpdatePost, id, handleHomeClick }) {
  const [updatedPost, setUpdatedPost] = useState({
    post_title: post?.post_title || "",
    blog_post: post?.blog_post || "",
    creator: post?.creator || "",
    created_at: post?.created_at || "",
  });
  console.log(id);

  const handleTitleChange = (e) => {
    setUpdatedPost({ ...updatedPost, post_title: e.target.value });
  };

  const handleBodyChange = (e) => {
    setUpdatedPost({ ...updatedPost, blog_post: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/blog_posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      console.log(updatedPost);

      if (!response.ok) {
        console.error("Failed to update blog post.");
      } else {
        setUpdatePost(null);
        setPosts((prevPosts) =>
          prevPosts.filter((prevPost) =>
            prevPost.post_id === id ? { ...prevPost, ...updatedPost } : prevPost
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='updateBlog'>
      <form onSubmit={handleUpdate}>
        <input
          type='text'
          name='post_title'
          value={updatedPost.post_title}
          onChange={handleTitleChange}
        />
        <textarea
          name='blog_post'
          value={updatedPost.blog_post}
          onChange={handleBodyChange}
        />
        <button type='submit'>Update Post</button>
        <button onClick={() => setUpdatePost(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default Update;

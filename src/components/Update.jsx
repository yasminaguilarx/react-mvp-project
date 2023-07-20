import React, { useState } from "react";

function Update({ post, setPosts, setUpdatePost, id }) {
  const [updatedPost, setUpdatedPost] = useState({
    post_title: post?.post_title || "",
    blog_post: post?.blog_post || "",
    creator: post?.creator || "",
    created_at: post?.created_at || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
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

      if (!response.ok) {
        console.error("Failed to update blog post.");
      } else {
        // Refresh the post list after successful update
        setUpdatePost(null);
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
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
          onChange={handleChange}
        />
        <textarea
          name='blog_post'
          value={updatedPost.blog_post}
          onChange={handleChange}
        />
        <button type='submit'>Update Post</button>
        <button onClick={() => setUpdatePost(null)}>Cancel</button>
      </form>
    </div>
  );
}

export default Update;

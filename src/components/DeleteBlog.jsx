function DeleteBlog({ id, setPosts }) {
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/blog_posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete blog post.");
      } else {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.post_id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => handleDeletePost(id)}
      style={{ borderRadius: "15px", width: "100px", height: "50px" }}
    >
      Delete
    </button>
  );
}

export default DeleteBlog;

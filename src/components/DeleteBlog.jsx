function DeleteBlog({ id, setPosts }) {
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/blog_posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete blog post.");
      } else {
        setPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={() => handleDeletePost(id)}>Delete Post</button>;
}

export default DeleteBlog;

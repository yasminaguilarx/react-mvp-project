import { useState } from "react";
import Update from "./Update";
import DeleteBlog from "./DeleteBlog";

function Posts({
  posts,
  setPosts,
  setUpdatePost,
  setShowAllBlogPosts,
  handleCreateNewPost,
  showAllBlogPosts,
}) {
  const [updatingPostId, setUpdatingPostId] = useState(null);

  const handleUpdateClick = (id) => {
    setUpdatingPostId(id);
    handleCreateNewPost();
  };

  return (
    <div>
      {showAllBlogPosts
        ? posts.map((post, index) => (
            <div className='displayBlog' key={index}>
              <h1>{post.post_title}</h1>
              <span>{post.created_at}</span>
              <p>{post.blog_post}</p>
              <button
                onClick={() => handleUpdateClick(post.post_id)}
                style={{
                  borderRadius: "15px",
                  width: "100px",
                  height: "50px",
                }}
              >
                Update
              </button>
              <DeleteBlog id={post.post_id} setPosts={setPosts} />
            </div>
          ))
        : updatingPostId && (
            <Update
              post={posts.find((post) => post.post_id === updatingPostId)}
              setUpdatePost={setUpdatePost}
              setPosts={setPosts}
              id={updatingPostId}
            />
          )}
    </div>
  );
}

export default Posts;

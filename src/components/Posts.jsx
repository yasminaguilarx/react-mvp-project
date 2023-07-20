import { useState } from "react";
import CreateBlog from "./CreateBlog";
import DeleteBlog from "./DeleteBlog";
import Update from "./Update";
function Posts({ posts, handleNewPostClick, setPosts, setUpdatePost }) {
  const [updatingPostId, setUpdatingPostId] = useState(null);

  const handleClick = (postId) => {
    if (updatingPostId === postId) {
      setUpdatingPostId(null);
    } else {
      setUpdatingPostId(postId);
    }
  };

  return (
    <>
      {posts.map((post, index) => (
        <div className='displayBlog' key={index}>
          <h1>{post.post_title}</h1>
          <span>{post.created_at}</span>
          <p>{post.blog_post}</p>
          {updatingPostId === post.post_id ? (
            <Update post={post} setUpdatingPostId={setUpdatingPostId} />
          ) : (
            <>
              <p>{post.blog_post}</p>
              <button onClick={() => handleClick(post.post_id)}>Update</button>
              <DeleteBlog
                id={post.post_id}
                setPosts={setPosts}
                post={post}
              />{" "}
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default Posts;

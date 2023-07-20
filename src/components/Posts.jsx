import { useState } from "react";
import Update from "./Update";
import DeleteBlog from "./DeleteBlog";

function Posts({
  posts,
  setPosts,
  setUpdatePost,
  setShowAllBlogPosts,
  showAllBlogPosts,
}) {
  const [updatingPostId, setUpdatingPostId] = useState(null);

  const handleUpdateClick = (postId) => {
    setUpdatePost(postId);
  };

  return (
    <div>
      {showAllBlogPosts ? (
        posts.map((post) => (
          <div className='displayBlog' key={post.post_id}>
            <h1>{post.post_title}</h1>
            <span>{post.created_at}</span>
            <p>{post.blog_post}</p>
            <button onClick={() => handleUpdateClick(post.post_id)}>
              Update
            </button>
            <DeleteBlog id={post.post_id} setPosts={setPosts} />
          </div>
        ))
      ) : (
        <Update
          post={posts.find((post) => post.post_id === updatingPostId)}
          setUpdatePost={setUpdatePost}
          setPosts={setPosts}
        />
      )}
    </div>
  );
}

export default Posts;

// import { useState } from "react";
// import CreateBlog from "./CreateBlog";
// import DeleteBlog from "./DeleteBlog";
// import Update from "./Update";
// function Posts({
//   posts,
//   handleNewPostClick,
//   setPosts,
//   setUpdatePost,
//   showAllBlogPosts,
//   updatePost,
// }) {
//   const [updatingPostId, setUpdatingPostId] = useState(null);

//   const handleUpdateClick = (postId) => {
//     setUpdatePost(postId);
//   };

//   return (
//     <div>
//       {showAllBlogPosts ? (
//         posts.map((post) => (
//           <div className='displayBlog' key={post.post_id}>
//             <h1>{post.post_title}</h1>
//             <span>{post.created_at}</span>
//             <p>{post.blog_post}</p>
//             <DeleteBlog />
//           </div>
//         ))
//       ) : (
//         <Update
//           post={posts.find((post) => post.post_id === updatingPostId)}
//           setUpdatePost={setUpdatePost}
//           setPosts={setPosts}
//         />
//       )}
//     </div>
//   );
// }

// export default Posts;

// import React from "react";
// import UpdateBlog from "./UpdateBlog";

// function Posts({ posts, showAllBlogPosts, setUpdatingPostId, updatingPostId, setPosts }) {

//   return (
//     <div>
//       {showAllBlogPosts ? (
//         posts.map((post) => (
//           <div className="displayBlog" key={post.post_id}>
//             <h1>{post.post_title}</h1>
//             <span>{post.created_at}</span>
//             <p>{post.blog_post}</p>
//             <button onClick={() => handleUpdateClick(post.post_id)}>Update</button>
//             <button onClick={() => handleDeletePost(post.post_id)}>Delete</button>
//           </div>
//         ))
//       ) : (
//         <Update
//           post={posts.find((post) => post.post_id === updatingPostId)}
//           setUpdatingPostId={setUpdatingPostId}
//           setPosts={setPosts}
//         />
//       )}
//     </div>
//   );
// }

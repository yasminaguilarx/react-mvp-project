// import { useState } from "react";
// import App from "../App";
// import DeleteBlog from "./DeleteBlog";

// function CreateBlog({ handleCreateNewPost, showForm, setShowForm, setPosts }) {
//   const [newPost, setNewPost] = useState({
//     creator: "",
//     post_title: "",
//     blog_posts: "",
//     created_at: "",
//   });

//   let inputHandler = (e) => {
//     const { name, value } = e.target;
//     setNewPost((prevPosts) => ({
//       ...prevPosts,
//       [name]: value,
//     }));
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/blog_posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newPost),
//       });

//       if (!response.ok) {
//         console.error("Failed to create blog post.");
//       } else {
//         const createdNewPost = await response.json();
//         setPosts((prevPosts) => [createdNewPost, ...prevPosts]);
//         handleCreateNewPost();
//         setShowForm(false);
//         setNewPost({
//           creator: "",
//           post_title: "",
//           blog_posts: "",
//           created_at: "",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       {showForm && (
//         <div id='createBlogCont'>
//           <form
//             action='/blog_posts'
//             method='post'
//             onSubmit={handlePostSubmit}
//             className='newPostForm'
//           >
//             <input
//               className='newPost'
//               type='text'
//               placeholder='Post Title'
//               name='post_title'
//               onChange={inputHandler}
//               value={posts.post_title}
//             />
//             <br />
//             <input
//               className='newPost'
//               type='text'
//               placeholder='Blog Content'
//               name='blog_content'
//               onChange={inputHandler}
//               value={posts.blog_content}
//             />
//             <br />
//             <input
//               className='newPost'
//               type='text'
//               placeholder='Creator'
//               name='creator'
//               onChange={inputHandler}
//               value={posts.creator}
//             />
//           </form>
//           <button type='submit' className='newPost'>
//             Submit Post
//           </button>
//           <DeleteBlog />
//         </div>
//       )}
//     </>
//   );
// }

// export default CreateBlog;

import React, { useState } from "react";

function CreateBlog({
  handleCreateNewPost,
  setShowForm,
  addNewPost,
  setPosts,
}) {
  const [newPost, setNewPost] = useState({
    post_title: "",
    blog_post: "",
    creator: "",
    created_at: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewPost((prevNewPost) => ({
      ...prevNewPost,
      [name]: value,
      created_at: new Date().toISOString(),
    }));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/blog_posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.status === 201) {
        const createdNewPost = await response.json();
        addNewPost(createdNewPost);
      } else {
        console.error("Failed to create blog post.");
      }

      // if (response.status === 201) {
      //   const createdNewPost = await response.json();
      //   setPosts((prevPosts) => [createdNewPost, ...prevPosts]);
      //   handleCreateNewPost();
      //   setNewPost({
      //     post_title: "",
      //     blog_post: "",
      //     creator: "",
      //     created_at: "",
      //   });
      // } else {
      //   console.error("Failed to create blog post.");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='createBlogCont'>
      <form
        action='/blog_posts'
        method='post'
        onSubmit={handlePostSubmit}
        className='newPostForm'
      >
        <input
          className='newPost'
          type='text'
          placeholder='Post Title'
          name='post_title'
          onChange={inputHandler}
          value={newPost.post_title}
        />
        <br />
        <input
          className='newPost'
          type='text'
          placeholder='Blog Post'
          name='blog_post'
          onChange={inputHandler}
          value={newPost.blog_post}
        />
        <br />
        <input
          className='newPost'
          type='text'
          placeholder='Creator'
          name='creator'
          onChange={inputHandler}
          value={newPost.creator}
        />
        <br />
        <button type='submit' className='newPost'>
          Submit Post
        </button>
        <button onClick={() => setShowForm(false)} className='newPost'>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
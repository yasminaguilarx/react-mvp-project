import React, { useState } from "react";

function CreateBlog({
  handleCreateNewPost,
  addNewPost,
  setPosts,
  setShowAllBlogPosts,
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
        handleCreateNewPost(createdNewPost); // Set creatingNewPost to false and show all blog posts
        setNewPost({
          post_title: "",
          blog_post: "",
          creator: "",
          created_at: "",
        });
      } else {
        console.error("Failed to create blog post.");
      }
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
        <button onClick={() => setShowAllBlogPosts(true)} className='newPost'>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;

// import React, { useState } from "react";

// function CreateBlog({
//   handleCreateNewPost,
//   addNewPost,
//   setPosts,
//   setShowAllBlogPosts,
// }) {
//   const [newPost, setNewPost] = useState({
//     post_title: "",
//     blog_post: "",
//     creator: "",
//     created_at: "",
//   });

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setNewPost((prevNewPost) => ({
//       ...prevNewPost,
//       [name]: value,
//       created_at: new Date().toISOString(),
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

//       if (response.status === 201) {
//         const createdNewPost = await response.json();
//         addNewPost(createdNewPost);
//       } else {
//         console.error("Failed to create blog post.");
//       }

//       // if (response.status === 201) {
//       //   const createdNewPost = await response.json();
//       //   setPosts((prevPosts) => [createdNewPost, ...prevPosts]);
//       //   handleCreateNewPost();
//       //   setNewPost({
//       //     post_title: "",
//       //     blog_post: "",
//       //     creator: "",
//       //     created_at: "",
//       //   });
//       // } else {
//       //   console.error("Failed to create blog post.");
//       // }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div id='createBlogCont'>
//       <form
//         action='/blog_posts'
//         method='post'
//         onSubmit={handlePostSubmit}
//         className='newPostForm'
//       >
//         <input
//           className='newPost'
//           type='text'
//           placeholder='Post Title'
//           name='post_title'
//           onChange={inputHandler}
//           value={newPost.post_title}
//         />
//         <br />
//         <input
//           className='newPost'
//           type='text'
//           placeholder='Blog Post'
//           name='blog_post'
//           onChange={inputHandler}
//           value={newPost.blog_post}
//         />
//         <br />
//         <input
//           className='newPost'
//           type='text'
//           placeholder='Creator'
//           name='creator'
//           onChange={inputHandler}
//           value={newPost.creator}
//         />
//         <br />
//         <button type='submit' className='newPost'>
//           Submit Post
//         </button>
//         <button onClick={() => setShowAllBlogPosts(false)} className='newPost'>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateBlog;

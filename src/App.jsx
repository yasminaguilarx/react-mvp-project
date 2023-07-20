import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Posts from "./components/Posts.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import "./index.css";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(true);
  const [creatingNewPost, setCreatingNewPost] = useState(false);
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePost, setUpdatePost] = useState(null);

  const handleCreateNewPost = () => {
    setCreatingNewPost(true);
    setShowAllBlogPosts(false);
  };

  //return home page
  const handleHomeClick = () => {
    setShowAllBlogPosts(true);
    setCreatingNewPost(false);
    setUpdatePost(null); // Reset updatingPostId when returning to home page
  };

  //fetching data from blog_posts
  const getPosts = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:4000/blog_posts");
      const data = await res.json();
      setPosts(data);
      setIsLoading(false);
      console.log(data);
    } catch (err) {
      console.error("Unable to grab posts!", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='app'>
      <Navbar
        handleHomeClick={handleHomeClick}
        handleCreateNewPost={handleCreateNewPost}
        search={search}
      />
      {creatingNewPost ? (
        <CreateBlog
          handleCreateNewPost={() => setCreatingNewPost(false)}
          setPosts={setPosts}
          posts={posts}
          setShowAllBlogPosts={setShowAllBlogPosts}
        />
      ) : (
        <Posts
          posts={posts}
          setPosts={setPosts}
          setUpdatePost={setUpdatePost}
          setShowAllBlogPosts={setShowAllBlogPosts}
          showAllBlogPosts={showAllBlogPosts}
          handleNewPostClick={() => setCreatingNewPost(true)}
        />
      )}
    </div>
  );
}

export default App;

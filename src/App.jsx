import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Posts from "./components/Posts.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import "./index.css";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(false);
  const [creatingNewPost, setCreatingNewPost] = useState(false);
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState([]);
  const [updatePost, setUpdatePost] = useState(null);

  const searchedPost = (searchInput) => {
    const filtered = posts.filter((post) => {
      post.post_title?.includes(searchInput);
      post.blog_posts?.includes(searchInput);
    });
    setPosts(filtered);
    setShowAllBlogPosts(false);
    setSearch([]);
  };

  const handleUpdate = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.post_id === updatePost.post_id ? updatedPost : post
    );
    setPosts(updatedPosts);
    setUpdatePost(null); // Clear the updatePost state after update
  };

  const handleCreateNewPost = (newPost) => {
    setCreatingNewPost(false);
    setShowAllBlogPosts(true); // Show all blog posts after creating a new post
  };

  //wrapper funct for clicked new post
  function handleNewPostClick() {
    setCreatingNewPost(true);
    setShowForm(true);
    setShowAllBlogPosts(false);
  }

  //return home page
  const handleHomeClick = () => {
    setHome(true);
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
  }, [setPosts]);

  return (
    <div className='app'>
      <Navbar
        handleNewPostClick={handleNewPostClick}
        handleHomeClick={handleHomeClick}
        searchedPost={searchedPost}
        search={search}
        setNewPost={setNewPost}
      />
      {creatingNewPost ? (
        <CreateBlog
          handleNewPostClick={() => setCreatingNewPost(false)}
          handleCreateNewPost={handleCreateNewPost}
          setPosts={setPosts}
          showForm={true}
          handleHomeClick={handleHomeClick}
          posts={posts}
          // showForm={showForm}
        />
      ) : updatePost ? (
        <Update post={updatePost} onUpdate={handleUpdate} />
      ) : (
        <>
          {isLoading ? (
            <div className='loading'>Loading...</div>
          ) : (
            <>
              {showAllBlogPosts ? (
                <Posts
                  posts={posts}
                  handleNewPostClick={() => setCreatingNewPost(true)}
                  setPosts={setPosts}
                  setUpdatePost={setUpdatePost}
                />
              ) : (
                posts.length > 0 && <Posts posts={posts} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

import HomeBtn from "./HomeBtn";
import SearchBar from "./SearchBar";

function Navbar({
  handleNewPostClick,
  handleHomeClick,
  searchedPost,
  setNewPost,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    handleNewPostClick();
  };

  return (
    <div className='navbar'>
      <HomeBtn handleHomeClick={handleHomeClick} />
      <SearchBar searchedPost={searchedPost} setNewPost={setNewPost} />

      <button
        className='createPostBtn'
        onClick={handleClick}
        style={{ borderRadius: "15px" }}
      >
        Create Post
      </button>
    </div>
  );
}

export default Navbar;

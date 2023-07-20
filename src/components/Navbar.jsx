import HomeBtn from "./HomeBtn";
import SearchBar from "./SearchBar";

function Navbar({ handleHomeClick, searchedPost, handleCreateNewPost }) {
  return (
    <div className='navbar'>
      <HomeBtn handleHomeClick={handleHomeClick} />
      <SearchBar searchedPost={searchedPost} />

      <button
        className='createPostBtn'
        onClick={handleCreateNewPost}
        style={{ borderRadius: "15px" }}
      >
        Create Post
      </button>
    </div>
  );
}

export default Navbar;

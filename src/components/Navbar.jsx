import HomeBtn from "./HomeBtn";
import SearchBar from "./SearchBar";

function Navbar({ handleHomeClick, handleCreateNewPost, search }) {
  return (
    <div className='navbar'>
      <HomeBtn handleHomeClick={handleHomeClick} />
      <SearchBar search={search} />

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

import { useState } from "react";
import "../App.css";

function SearchBar({ searchedPost }) {
  const [searchInput, setSearchInput] = useState("");

  let inputHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleSearch = () => {
    searchedPost(searchInput.toLowerCase());
  };

  return (
    <div className='searchBar'>
      <input
        style={{ borderRadius: "15px" }}
        key='search-bar'
        value={searchInput}
        placeholder={"Search Blogs..."}
        onChange={inputHandler}
      />
      <button onClick={handleSearch} style={{ borderRadius: "15px" }}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

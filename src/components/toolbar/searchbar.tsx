import { useState } from "react";
import "../../assets/scss/searchbar.scss";
export const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="search-bar">
        <input 
            autoComplete="off"
            placeholder="Search track, albums, artists ..."
            className="search-input"
            type="search"
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
        />
        <button className="search-button" title="Search">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-xds="IconSearch" width="24" height="24"><path d="M12 2a9 9 0 016.568 15.154l3.089 3.089-1.414 1.414-3.201-3.2A9 9 0 1112 2zm0 2a7 7 0 100 14 7 7 0 000-14z" fill="currentColor"></path></svg>
        </button>
    </div>
  );
};

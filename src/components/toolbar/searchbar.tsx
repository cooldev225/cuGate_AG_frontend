import { useState } from "react";
import "../../assets/scss/searchbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../types/models/store";

export const SearchBar: React.FC = () => {
  //const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { keyword } = useSelector((state:StoreState) => state.auth);
  const [_keyword, setKeyword] = useState(keyword);

  return (
    <div className="search-bar">
        <input 
            autoComplete="off"
            placeholder="Search track, albums, artists ..."
            className="search-input"
            type="search"
            value={_keyword}
            onChange={(e)=>
                setKeyword(e.target.value)
            }
            onKeyUp={(e)=>{
              if(e.keyCode===13){
                dispatch({
                  type: "SET_KEYWORD",
                  payload: _keyword,
                })
              }
            }}
        />
        <button className="search-button" title="Search">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-xds="IconSearch" width="24" height="24"><path d="M12 2a9 9 0 016.568 15.154l3.089 3.089-1.414 1.414-3.201-3.2A9 9 0 1112 2zm0 2a7 7 0 100 14 7 7 0 000-14z" fill="currentColor"></path></svg>
        </button>
    </div>
  );
};

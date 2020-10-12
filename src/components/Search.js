import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Search({ hideButtons = false, term }) {
  const [{}, dispatch] = useStateValue("");
  const [input, setInput] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (term) {
      setInput(term);
    }
  }, []);

  const search = (e) => {
    e.preventDefault();
    history.push("/search");

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });
  };

  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input
          placeholder=""
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <MicIcon />
      </div>

      {!hideButtons ? (
        <div className="search__buttons">
          <Button type="submit" onClick={search} variant="outlined">
            Google Search
          </Button>
          <Button variant="outlined">I'm feeling lucky</Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            type="submit"
            onClick={search}
            variant="outlined"
            className="search__buttonsHidden"
          >
            Google Search
          </Button>
          <Button variant="outlined" className="search__buttonsHidden">
            I'm feeling lucky
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;

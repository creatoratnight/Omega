import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import Response from "../response";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  const { data } = useGoogleSearch(term); // REAL API CALL
  //const data = Response; // FAKE API CALL (response.je)

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img className="searchPage__logo" src="logo.png" alt="" />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons term={term} />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionIcon />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOfferIcon />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <RoomIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight"></div>
            <div className="searchPage__option">
              <Link to="/settings">Settings</Link>
            </div>
            <div className="searchPage__option">
              <Link to="/tools">Tools</Link>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime}) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__resultContainer">
              <div className="searchPage__resultImage">
                {item.pagemap?.cse_image?.length > 0 &&
                item.pagemap?.cse_image[0]?.src ? (
                  <a href={item.link} target="_new">
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                    />
                  </a>
                ) : (
                  <a href={item.link} target="_new">
                    <img
                      className="searchPage__resultImage"
                      src="noimage.png"
                      alt=""
                    />
                  </a>
                )}
              </div>
              <div className="searchPage__result">
                <div className="searchPage__resultLink">
                  <a href={item.link} target="_new">
                    {item.displayLink}
                  </a>
                </div>
                <a
                  href={item.link}
                  target="_new"
                  className="searchPage__resultTitle"
                >
                  <h2>{item.title}</h2>
                </a>
                <p className="searchPage__resultSnippet">{item.snippet}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

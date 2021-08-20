import React, { useEffect, useState, useRef, useContext } from "react";
import "./styles/Navbar.css";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import { HistoryContext } from "../HistoryProvider";

const Navbar = () => {

  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const [search, setSearch] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef();
  const {userHistory, fromNav, tracking, leftNavigation, rightNavigation} = useContext(HistoryContext);
  const [activeLeftNav,] = leftNavigation
  const [activeRightNav,] = rightNavigation
  const [usersHistory,] = userHistory;
  const [, setNavigation] = fromNav;
  const [tracker, setTracker] = tracking;
  //Displaying search box if the user is in /search page
  useEffect(()=> {
    if(location.pathname.startsWith('/search')) setSearch(true);
    if(location.pathname.startsWith('/search/')) {
      setSearchInput(params.searchId)
      setClearSearch(true)
    };

  }, [location, params.searchId])

  //Set search input value when value changes, and show clear search button
  const searchInputChange = (event) => {
    setSearchInput(event.target.value);
    if(event.target.value.length >= 1) {
      setClearSearch(true)
      history.push(`/search/${event.target.value}`)
    };
    if(event.target.value.length === 0) {
      setClearSearch(false)
      history.push('/search')
    };
  }

  //Clear the search and focus it
  const clearSearchInput = () => {
    setSearchInput("");
    setClearSearch(false);
    history.push('/search')
    searchBox.current.focus();
  }

  //When clicked on the search loupe icon, focus the search
  const redirectToSearch = () => {
      searchBox.current.focus();
  }

  const navigateHistoryBack = () => {
    if(tracker <= usersHistory.length){
      setNavigation({id: usersHistory[usersHistory.length-tracker].id, location: usersHistory[usersHistory.length-tracker].location})
      history.push(`${usersHistory[usersHistory.length-tracker].location}`)
      setTracker(tracker+1)
    }
  }

  const navigateHistoryForward = () => {
    if(tracker >= 3) {
      setNavigation({id: usersHistory[usersHistory.length-tracker+2].id, location: usersHistory[usersHistory.length-tracker+2].location})
      history.push(`${usersHistory[usersHistory.length-tracker+2].location}`)
      setTracker(tracker-1)
    }
  }

  return (
    <div className="navbar-container">
      <div className="navbar-navigation">
        <div className="navigation-left" onClick={navigateHistoryBack}>
          <img
            src="https://icons-for-free.com/iconfiles/png/512/arrow+left+chevron+chevronleft+left+left+icon+icon-1320185731545502691.png"
            alt="navigation left"
            className={activeLeftNav}
          ></img>
        </div>
        <div className="navigation-right" onClick={navigateHistoryForward}>
          <img src="https://icons-for-free.com/iconfiles/png/512/arrow+right+chevron+chevronright+right+right+icon+icon-1320185732203239715.png" alt="navigation right" className={activeRightNav}></img>
        </div>
      </div>
      {search ? 
       <div className="navbar-search">
        <img onClick={redirectToSearch} src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" alt="search loupe icon" />
        <input type="search" autoFocus maxLength="30" placeholder="Artists, songs, or podcasts" value={searchInput} onChange={searchInputChange} ref={searchBox}></input>
        {clearSearch ? <span onClick={clearSearchInput}>╳</span> : ''}
       </div> : ''}
      <div className="navbar-login">
          <button>LOG IN</button>
      </div>
    </div>
  );
};
export default Navbar;

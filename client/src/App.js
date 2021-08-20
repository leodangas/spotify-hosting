import Sidebar from "./components/Sidebar/Sidebar";
import HomeMain from "./components/page_Home/HomeMain";
import SearchMain from "./components/page_Search/SearchMain";
import Playlists from "./components/page_Playlists/Playlists";
import Playlist from "./components/page_Playlist/Playlist";
import SearchResults from "./components/page_Search/SearchResults";
import PlaylistsSearch from "./components/page_Search/SeeAll/PlaylistsSearch";
import "./components/CSS/styles.css";
import { Switch, Route, Redirect } from "react-router";
import SongsSearch from "./components/page_Search/SeeAll/SongsSearch";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HistoryContext } from "./components/HistoryProvider";
function App() {
  const location = useLocation();
  const {userHistory, fromNav, tracking, historyTracking, leftNavigation, rightNavigation} = useContext(HistoryContext);
  const [usersHistory, setUsersHistory] = userHistory;
  const [navigation,] = fromNav;
  const [, setActiveLeftNav] = leftNavigation
  const [, setActiveRightNav] = rightNavigation
  const [tracker, setTracker] = tracking;
  const [historyId, setHistoryId] = historyTracking
  useEffect(() => {
    if(navigation.location !== location.pathname) {
      setUsersHistory([...usersHistory, {id: historyId, location: location.pathname}])
      setHistoryId(historyId+1);
      if(tracker !== 2) {
        let newArray = usersHistory.splice(0, usersHistory.length-tracker+2);
        newArray.push({id: historyId, location: location.pathname})
        setUsersHistory(newArray);
        setTracker(2);
      }
    }
    if(usersHistory.length > 0) {
      setActiveLeftNav("active-navigation")
      if(usersHistory.length - tracker === -1) setActiveLeftNav("");
      if(tracker !== 2) {
        setActiveRightNav("active-navigation");
        if(navigation.location !== location.pathname && tracker !== 2) setActiveRightNav("")
      }
      if(tracker === 2) setActiveRightNav("")
    }
  }, [location])
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Sidebar />
          <HomeMain />
        </Route>
        <Route path="/search" exact>
          <Sidebar />
          <SearchMain />
        </Route>
        <Route path="/search/:searchId" exact>
          <Sidebar />
          <SearchResults />
        </Route>
        <Route path="/search/:searchId/playlist">
          <Sidebar />
          <PlaylistsSearch />
        </Route>
        <Route path="/search/:searchId/songs">
          <Sidebar />
          <SongsSearch />
        </Route>
        <Route path="/playlists/:playlistGenre">
          <Sidebar />
          <Playlists />
        </Route>
        <Route path="/playlist/:playlistId">
          <Sidebar />
          <Playlist />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SearchResultsPlaylists from "./SearchResultsPlaylists";
import SearchResultsSong from "./SearchResultsSong";
import Modal from "../Modal/Modal";
import { artists, songLength } from "../page_Playlist/PlaylistFunctions";
import "./styles/SearchResults.css";
import { useHistory, useParams } from "react-router-dom";

const SearchResults = () => {
  const [modal, setModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [topSong, setTopSong] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [foundSongs, setFoundSongs] = useState(false);
  const [foundPlaylists, setFoundPlaylists] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchSearch = () => {
      const fetchSongs = fetch(`/api/searchtracks/?id=${params.searchId}`);
      const fetchPlaylists = fetch(
        `/api/searchplaylists/?id=${params.searchId}`
      );

      Promise.all([fetchSongs, fetchPlaylists])
        .then((values) => {
          return Promise.all(values.map((res) => res.json()));
        })
        .then(([songs, playlists]) => {
          if (songs.tracks.items.length === 0 && playlists.playlists.items.length === 0) {
             setShowNoResults(true);
             setShowResults(false);
          }
          else {
            setShowNoResults(false);
            if (songs.tracks.items.length > 0) {
              let songResults = songs.tracks.items.map((item) => {
                return {
                  image: item.album.images[0].url,
                  name: item.name,
                  artists: artists(item.artists),
                  duration: songLength(item.duration_ms),
                  id: item.id
                }
              })
              setSongs(songResults);
              setTopSong(songResults[0]);
              setFoundSongs(true);
            }
            if (playlists.playlists.items.length > 0) {

              let playlistResults = playlists.playlists.items.filter((item) => {
                if(item.images.length !== 0) return item
                else {
                  return false
                }
              })

              playlistResults = playlistResults.map((item) => {
                return {
                  image: item.images[0].url,
                  name: item.name,
                  description: item.description,
                  id: item.id
                }
              })
              setPlaylists(playlistResults);
              setFoundPlaylists(true);
            }
            setShowResults(true);
          }
          
          })
    };

    const timeOutId = setTimeout(() => fetchSearch(), 1000);
    return () => clearTimeout(timeOutId);
  }, [params.searchId]);

  return (
    <>
      <Navbar />
      <div className="search-results-main-container">
      {showResults ? (
          <div className="search-results-container">
            {foundSongs ? (
              <div className="search-results-wrapper">
                <div className="search-results-top-container">
                  <h1>Top Result</h1>
                  <div className="search-results-top">
                    <img src={topSong.image} alt="song" />
                    <h1>{topSong.name}</h1>
                    <div className="artists">
                      <h2>{topSong.artists}</h2>
                      <h1>SONG</h1>
                    </div>
                  </div>
                </div>
                <div className="search-results-songs-container">
                  <div className="songs-container-header">
                    <h1>Songs</h1>
                    <h2 onClick={()=> {history.push(`/search/${params.searchId}/songs`)}}>SEE ALL</h2>
                  </div>
                  <div className="songs-container">
                    {songs.slice(0, 4).map((item) => {
                      return (
                        <SearchResultsSong
                          setModal={setModal}
                          image={item.image}
                          name={item.name}
                          artists={item.artists}
                          duration={item.duration}
                          key={item.id}
                          id={item.id}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {foundPlaylists ? (
              <div className="search-results-playlists-container">
                <div className="playlists-header">
                  <h1>Playlists</h1>
                  <h2 onClick={()=> {history.push(`/search/${params.searchId}/playlist`)}}>SEE ALL</h2>
                </div>
                <div className="search-results-playlists">
                  {playlists.slice(0, 6).map((item) => {
                    return (
                      <SearchResultsPlaylists
                        setModal={setModal}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        key={item.id}
                        id={item.id}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
      ) : ''}
      {showNoResults ? 
        <div className="no-results-container">
         <h1>No results found for "{params.searchId}"</h1>
         <h2>Please make sure your words are spelled correctly or use less or different keywords.</h2>
        </div>
      : ""}
      </div>
      {modal ? <Modal show={modal} setModal={setModal} /> : ""}
    </>
  );
};

export default SearchResults;


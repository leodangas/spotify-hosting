import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Modal from "../../Modal/Modal";
import { artists, songLength } from "../../page_Playlist/PlaylistFunctions";
import "./styles/SongsSearch.css";
const SongsSearch = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [showSongs, setShowSongs] = useState(false);
  useEffect(() => {
    const fetchSongs = () => {
      fetch(`/api/searchtracks/?id=${params.searchId}`)
        .then((res) => res.json())
        .then((res) => {
          let songResults = res.tracks.items.map((item) => {
            return {
              image: item.album.images[0].url,
              name: item.name,
              artists: artists(item.artists),
              duration: songLength(item.duration_ms),
              id: item.id,
              album: item.album.name
            };
          });
          setSongs(songResults);
          setShowSongs(true);
        });
    };
    fetchSongs();
  }, [params.searchId]);
  return (
    <>
      <Navbar />
      <div className="songs-search-container">
        {showSongs ? (
          <>
            <h1>All songs for "{params.searchId}"</h1>
            <div className="playlist-songs-category">
              <h1>#</h1>
              <h1>TITLE</h1>
              <h1>ALBUM</h1>
              <div className="category-length">
                <img
                  src="https://img.icons8.com/pastel-glyph/2x/clock--v2.png"
                  alt="clock icon"
                />
              </div>
            </div>
            {songs.map((item, index) => {
              return (
                <div
                  className="playlist-song"
                  onDoubleClick={() => setModal(true)}
                  key={item.id}
                >
                  <div className="song-order">
                    <img
                      src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png"
                      alt="play"
                      onClick={() => {
                        setModal(true);
                      }}
                    />
                    <h1>{index+1}</h1>
                  </div>
                  <div className="song-artist-photo">
                    <img src={item.image} alt="song" />
                    <div className="artist">
                      <h1>{item.name}</h1>
                      <h2>{item.artists}</h2>
                    </div>
                  </div>
                  <div className="song-album">
                    <h1>{item.album}</h1>
                  </div>
                  <div className="song-length">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/spotify-line-ui-kit/100/save-to-your-liked-songs-512.png"
                      alt="liked"
                      onClick={() => {
                        setModal(true);
                      }}
                    />
                    <h1>{item.duration}</h1>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
      {modal ? <Modal show={modal} setModal={setModal} /> : ""}
    </>
  );
};

export default SongsSearch;

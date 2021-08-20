import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Modal from "../../Modal/Modal";
import "./styles/PlaylistsSearch.css";
const PlaylistsSearch = (props) => {
  const params = useParams();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  useEffect(() => {
    const fetchPlaylists = () => {
      fetch(`/api/searchplaylists/?id=${params.searchId}`)
        .then((res) => res.json())
        .then((res) => {
          let playlistResults = res.playlists.items.filter((item) => {
            if (item.images.length !== 0) return item;
            else {
              return false;
            }
          });

          playlistResults = playlistResults.map((item) => {
              return {
                image: item.images[0].url,
                name: item.name,
                description: item.description,
                id: item.id,
              };
          });
          setPlaylists(playlistResults);
          setShowPlaylists(true);
        });
    };
    fetchPlaylists();
  }, [params.searchId]);
  return (
    <>
      <Navbar />
      <div className="playlist-search-container">
        {showPlaylists ? (
          <>
            <h1>All playlists for "{params.searchId}"</h1>
            <div className="playlists-container">
              {playlists.map((item) => {
                return (
                  <div className="playlist" onClick={() => {history.push(`/playlist/${item.id}`)}} key={item.id}>
                    <div className="playlist-image">
                      <div className="play-icon-button" onClick={() => {setModal(true)}}>
                        <img id="play" src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png" alt="play"/>
                      </div>
                      <img src={item.image} alt="modal" />
                    </div>
                    <h1>{item.name}</h1>
                    <h2>{item.description}</h2>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {modal ? <Modal show={modal} setModal={setModal} /> : ""}
    </>
  );
};

export default PlaylistsSearch;

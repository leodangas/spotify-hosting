import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistItem from "./PlaylistItem";
import Modal from "../Modal/Modal";
import { songLength, artists, totalPlaylistLength, songAdded } from "./PlaylistFunctions";
import "./styles/Playlist.css";
import { useParams } from "react-router-dom";
const Playlist = () => {
  const [modal, setModal] = useState(false);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [playlistSongs, setPlaylistSongs] = useState([])
  const [showPlaylist, setShowPlaylist] = useState(false);
  const params = useParams();

  useEffect(() => {

    const fetchPlaylist = (playlistId) => {
      fetch(`/api/playlist?id=${playlistId}`)
        .then((res) => res.json())
        .then((res) => {

          let songs = res.tracks.items.filter((item) => {
            if(item.track !== null) return item
            else {
              return false
            }
          })

          songs = songs.filter((item) => {
            if(item.track.album.images.length !== 0) return item
            else {
              return false
            }
          })

          songs = songs.map((item) => {
              return {
              image: item.track.album.images[0].url,
              name: item.track.name,
              artists: artists(item.track.artists),
              albumName: item.track.album.name,
              duration: songLength(item.track.duration_ms),
              durationMs: item.track.duration_ms,
              songAdded: songAdded(item.added_at)
            }
          })
          setPlaylistSongs(songs);

          let totalDuration = songs.reduce((currentTotal, item) => {
            return currentTotal + item.durationMs;
          }, 0);

          setPlaylistInfo(
            {name: res.name, 
            image: res.images[0].url, 
            description: res.description, 
            likes: res.followers.total.toLocaleString(), 
            songs: songs.length, 
            duration: totalPlaylistLength(totalDuration)})

          setShowPlaylist(true);
          window.scrollTo(0, 0); 
        })
    }
    fetchPlaylist(params.playlistId)
  }, [params.playlistId])
  return (
    <>
      <Navbar />
      {showPlaylist ? <div className="playlist-main-container">
        <div className="playlist-header-container">
          <PlaylistHeader playlistInfo={playlistInfo}/>
        </div>
        <div className="playlist-songs-container">
          <div className="playlist-buttons">
            <div className="playlist-play-icon" onClick={() => setModal(true)}>
              <img
                src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png"
                alt="play icon"
              ></img>
            </div>
            <div
              className="playlist-heart-icon "
              onClick={() => setModal(true)}
            >
              <img
                src="https://cdn0.iconfinder.com/data/icons/spotify-line-ui-kit/100/save-to-your-liked-songs-512.png"
                alt="heart icon"
              />
            </div>
          </div>
          <div className="playlist-songs-category">
            <h1>#</h1>
            <h1>TITLE</h1>
            <h1>ALBUM</h1>
            <h1>DATE ADDED</h1>
            <div className="category-length">
              <img
                src="https://img.icons8.com/pastel-glyph/2x/clock--v2.png"
                alt="clock icon"
              />
            </div>
          </div>
          {playlistSongs.map((item, index) => {
            return <PlaylistItem setModal={setModal} order={index+1} name={item.name} artists={item.artists} image={item.image} albumName={item.albumName} duration={item.duration} added={item.songAdded} key={item.id} />
          })}
        </div>
      </div> : <div className="playlist-main-container"></div>}
      
      {modal ? <Modal show={modal} setModal={setModal} /> : ""}
    </>
  );
};

export default Playlist;

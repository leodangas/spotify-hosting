import React from "react";
import { useHistory } from "react-router";
const HomePlaylist = (props) => {
  const history = useHistory();
  //Redirect to playlist, if the playlist was clicked and NOT the green play icon
  const redirectToPlaylist = (e) => {
    if (e.target.id !== "dontRedirect") history.push(`/playlist/${props.id}`)
  }
  return (
    <div className="home-playlist" onClick={redirectToPlaylist}>
      <div className="playlist-image">
        <div id="dontRedirect" className="playlist-play-icon" onClick={()=> {props.setModal(true)}}>
          <img
            id="dontRedirect"
            className="play-icon"
            src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png"
            alt="play-icon for listening to playlist"
          ></img>
        </div>
        <img
          src={props.image}
          alt="spotify logo"
        />
      </div>
      <h1>{props.name}</h1>
      <h2>{props.description}</h2>
    </div>
  );
};

export default HomePlaylist;

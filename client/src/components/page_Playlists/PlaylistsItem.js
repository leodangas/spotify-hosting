import React from "react";
import { useHistory } from "react-router";
const Playlists_Item = (props) => {
    const history = useHistory();

    //Redirect to playlist, if the playlist was clicked and NOT the green play icon
    const redirectToPlaylist = (e) => {
        if (e.target.id !== "dontRedirect") history.push(`/playlist/${props.id}`)
    }
  return (
    <div className="playlists-item" onClick={redirectToPlaylist}>
      <div className="playlist-image">
        <div className="playlist-play-icon" onClick={()=> {props.setModal(true)}} id="dontRedirect">
          <img
            id="dontRedirect"
            className="play-icon"
            src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png"
            alt="play-icon for listening to playlist"
          ></img>
        </div>
        <img
          src={props.image}
          alt="playlist"
        />
      </div>
      <h1>{props.name}</h1>
      <h2>{props.description}</h2>
    </div>
  );
};

export default Playlists_Item;

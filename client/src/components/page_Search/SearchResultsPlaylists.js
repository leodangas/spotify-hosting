import React from "react";
import { useHistory } from "react-router-dom";

const SearchResultsPlaylists = (props) => {
  const redirectToPlaylist = (event) => {
    if (event.target.id !== "play") history.push(`/playlist/${props.id}`)
  }
  const history = useHistory();
  return (
    <div className="playlist" onClick={redirectToPlaylist}>
      <div className="playlist-image">
        <div className="play-icon-button" id="play" onClick={()=> {props.setModal(true)}}>
          <img id="play" src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png" alt="play"
          />
        </div>
        <img src={props.image} alt="playlist"/>
      </div>
      <h1>{props.name}</h1>
      <h2>{props.description}</h2>
    </div>
  );
};

export default SearchResultsPlaylists;

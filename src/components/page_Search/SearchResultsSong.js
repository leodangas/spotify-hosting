import React from "react";

const SearchResultsSong = (props) => {
  return (
    <div className="song" onDoubleClick={() => {props.setModal(true)}}>
        <div className="song-photo">
        <img className="play-icon" src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png" onClick={() => {props.setModal(true)}} alt="play" />
        <img src={props.image} alt="song"/>
        </div>
      <div className="song-artists">
        <h1>{props.name}</h1>
        <h2>{props.artists}</h2>
        <img src="https://cdn0.iconfinder.com/data/icons/spotify-line-ui-kit/100/save-to-your-liked-songs-512.png" onClick={() => {props.setModal(true)}} alt="liked" />
      </div>
      <div className="song-length">
        <h1>{props.duration}</h1>
      </div>
    </div>
  );
};

export default SearchResultsSong;

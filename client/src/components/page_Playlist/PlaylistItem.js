import React from "react";

const PlaylistItem = (props) => {
  return (
    <div className="playlist-song" onDoubleClick={() => props.setModal(true)}>
        <div className="song-order">
            <img src="https://icons-for-free.com/iconfiles/png/512/music+play+triangle+icon-1320166340670857612.png" alt="play" onClick={()=>props.setModal(true)}/>
        <h1>{props.order}</h1>
        </div>
      <div className="song-artist-photo">
        <img src={props.image} alt="song" />
        <div className="artist">
          <h1>{props.name}</h1>
          <h2>{props.artists}</h2>
        </div>
      </div>
      <div className="song-album">
          <h1>{props.albumName}</h1>
      </div>
      <div className="song-added">
          <img src="https://cdn0.iconfinder.com/data/icons/spotify-line-ui-kit/100/save-to-your-liked-songs-512.png" alt="liked" onClick={()=> {props.setModal(true)}}/>
          <h1>{props.added}</h1>
      </div>
      <div className="song-length">
          <h1>{props.duration}</h1>
      </div>
    </div>
  );
};
export default PlaylistItem;

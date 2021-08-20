import React from "react";
import "./styles/HomeGenrePlaylists.css";
import HomePlaylist from "./HomePlaylist";
import { useHistory } from "react-router";
const HomeGenrePlaylists = (props) => {
  const history = useHistory();

  const redirectToPlaylists = () => {
    history.push(`/playlists/${props.genre}`)
  }
  return (
    <div className="specific-genre-container">
      <div className="header">
        <h1>{props.type}</h1>
      </div>
      <div className="under-header">
        <h1>{props.info}</h1>
        <h2 onClick={redirectToPlaylists}>SEE ALL</h2>
      </div>
      <div className="playlist-container">
        {props.homePlaylists.slice(0, 6).map((item) => {
          return <HomePlaylist setModal={props.setModal} name={item.name} description={item.description} image={item.image} key={item.id} id={item.id}/>})}
      </div>
    </div>
  );
};

export default HomeGenrePlaylists;

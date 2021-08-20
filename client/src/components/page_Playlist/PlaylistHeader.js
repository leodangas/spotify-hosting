import React from 'react'

const PlaylistHeader = (props) => {

    return (
        <div className="playlist-header">
            <img src={props.playlistInfo.image} alt="playlist"/>
            <div className="playlist-info">
                <h3>PLAYLIST</h3>
                <h1>{props.playlistInfo.name}</h1>
                <h2>{props.playlistInfo.description}</h2>
                <ul>
                    <li>Spotify</li>
                    <li>{props.playlistInfo.likes} likes</li>
                    <li>{props.playlistInfo.songs} songs, {props.playlistInfo.duration}</li>
                </ul>
            </div>
        </div>
    )
}

export default PlaylistHeader
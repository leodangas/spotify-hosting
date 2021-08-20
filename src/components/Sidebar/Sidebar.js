import React, {useState, useRef, useEffect} from 'react'
import { NavLink, Link} from "react-router-dom";
import './styles/Sidebar.css'
import SidebarPrompt from './SidebarPrompt'
const Sidebar = () => {
    const [prompt, setPrompt] = useState(false);
    const [whichPrompt, setWhichPrompt] = useState({});
    let promptRef = useRef();

    //Setting the state's value according to a button that was pressed
    const showPrompt = (item) => {
        if(item === "library") setWhichPrompt({headline: "Enjoy Your Library", text: "Log in to see saved songs, podcasts, artists, and playlists in Your Library.", class:"library"})
        if(item === "playlists") setWhichPrompt({headline: "Create a playlist", text: "Log in to create and share playlists.", class:"playlists"})
        if(item === "liked") setWhichPrompt({headline: "Enjoy your Liked Songs", text: "Log in to see all the songs you've liked in one easy playlist.", class:"liked"})
        setPrompt(true);
    }

    //Closing the prompts, when clicked outside the prompt
    useEffect(() => {
        let handler = document.addEventListener("mousedown", (event) => {
            if (promptRef.current && !promptRef.current.contains(event.target)) {
                setPrompt(false);
            }
        })
        return (
            document.removeEventListener("mousedown", handler)
        )
    })

    return (
        <div className="sidebar-container">
            <Link to='/home'><img className="spotify-logo" src="https://logos-download.com/wp-content/uploads/2016/08/Spotify_logo_black.png" alt="spotify-logo" /></Link>
            <div className="sidebar-nav-links">
             <NavLink to ="/home" activeClassName="active-sidebar-link" className="sidebar-home">
              <img src="https://pic.onlinewebfonts.com/svg/img_353964.png" alt="home icon" />
              <h1>Home</h1>
             </NavLink>
             <NavLink to ="/search" activeClassName="active-sidebar-link" className="sidebar-search">
              <img src="https://www.iconpacks.net/icons/2/free-search-icon-2903-thumb.png" alt="search loupe icon" />
              <h1>Search</h1>
             </NavLink>
             <div className="sidebar-library " onClick={() => showPrompt("library")}>
             <img src="https://static.thenounproject.com/png/3318548-200.png" alt="library icon" />
             <h1>Your Library</h1>
             </div>
             {prompt ? <SidebarPrompt innerRef={promptRef} prompt={whichPrompt}
            show={prompt}
            hide={setPrompt}
            /> : ''}
             <div className="sidebar-playlist" onClick={() => showPrompt("playlists")}>
                 <div className="sidebar-playlist-plus-icon">
                 <img src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png" alt="plus icon"/>
                 </div>
                 <h1>Create Playlist</h1>
            </div>
            <div className="sidebar-liked" onClick={() => showPrompt("liked")}>
                <div className="sidebar-liked-love-icon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/OOjs_UI_icon_heart.svg/1200px-OOjs_UI_icon_heart.svg.png" alt="heart icon" />
                </div>
                <h1>Liked Songs</h1>
            </div>
            </div>
        </div>
    )
}

export default Sidebar
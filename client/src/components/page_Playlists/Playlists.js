import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar'
import PlaylistsItem from './PlaylistsItem'
import Modal from '../Modal/Modal'
import setHeader from './PlaylistsHeader'
import './styles/Playlists.css'
import { useParams } from 'react-router-dom'
const Playlists = () => {
    const [modal, setModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [showPlaylists, setShowPlaylists] = useState(false);
    const params = useParams();
  
    //Fetching playlists based on the url
    useEffect(() => {
      const fetchPlaylists = (genre) => {
        fetch(`/api/categories?id=${genre}`)
          .then((res) => res.json())
          .then((res) => {
            let playlists = res.playlists.items.map((item) => {
              return {
                name: item.name,
                description: item.description,
                image: item.images[0].url,
                id: item.id
              }
            })
            setPlaylists(playlists);
            setShowPlaylists(true);
            window.scrollTo(0, 0);
          })
      }
      fetchPlaylists(params.playlistGenre)
    }, [params.playlistGenre])
    return (
        <>
        <Navbar />
        {showPlaylists ? 
        <div className="playlists-main-container">
          <h1>{setHeader(params.playlistGenre)}</h1>
          <div className="playlists-container">
            {playlists.map((item) => { return <PlaylistsItem image={item.image} name = {item.name} description = { item.description} 
            key = {item.id} id ={item.id} setModal={setModal}/>})}
          </div>
        </div>
        : <div className="playlist-main-container"></div> }
        {modal ? <Modal show={modal} setModal={setModal}/> : ''}
        </>
    )
}

export default Playlists
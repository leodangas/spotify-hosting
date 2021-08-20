import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar.js'
import HomeGenrePlaylists from './HomeGenrePlaylists.js'
import Modal from '../Modal/Modal.js'
import "./styles/HomeMain.css"
const HomeMain = () => {
    const [modal, setModal] = useState();
    const [homePlaylists, setHomePlaylists] = useState([]);
    const [showHomePlaylists, setShowHomePlaylists] = useState(false);

    //Fetching home sections playlists
    useEffect(() => {
        const fetchCategory = (playlistId, index) => {
            fetch(`/api/categories?id=${playlistId}`)
                .then((res) => res.json())
                .then((res) => {
                    let playlist = res.playlists.items.slice(0, 6).map((item) => {
                        return {
                            name: item.name,
                            description: item.description,
                            image: item.images[0].url,
                            id: item.id
                        }
                    }
                    )
                    playlist = [...playlist, index];
                    setHomePlaylists((oldArray) => [...oldArray, playlist]);

                })
        }
        fetchCategory("toplists", 0);
        fetchCategory("focus", 1);
        fetchCategory("mood", 2);
        fetchCategory("summer", 3);
        fetchCategory("party", 4);
        fetchCategory("rock", 5);
    }, [])

    //Sorting home sections playlists, so they appear in the same order all the time
    useEffect(() => {
        if(homePlaylists.length === 6) {
            homePlaylists.sort((obj1, obj2) => {
                return obj1[obj1.length - 1] - obj2[obj2.length - 1];
              });
            setShowHomePlaylists(true);
        }
    }, [homePlaylists])
    return (
        <>
         <Navbar/>
         {showHomePlaylists ? 
         <div className="home-container">
            <HomeGenrePlaylists genre="toplists" type="Spotify Playlists" setModal={setModal} homePlaylists={homePlaylists[0]} key={0}/> 
            <HomeGenrePlaylists genre="focus" type="Focus" info="Music to help you concentrate." setModal={setModal} homePlaylists={homePlaylists[1]}key={1} /> 
            <HomeGenrePlaylists genre="mood" type="Mood" info="Playlists to match your mood." setModal={setModal} homePlaylists={homePlaylists[2]} key={2} /> 
            <HomeGenrePlaylists genre="summer" type="Summer hits" setModal={setModal} homePlaylists={homePlaylists[3]} key={3}/> 
            <HomeGenrePlaylists genre="party" type="Get ready to party!"setModal={setModal} homePlaylists={homePlaylists[4]} key={4} /> 
            <HomeGenrePlaylists genre="rock" type="Rock'em" setModal={setModal} homePlaylists={homePlaylists[5]} key={5} /> 
         </div> : <div className="loading-section"></div>}
         {modal ? <Modal setModal={setModal} show={modal}/> : ''}
        </>
    )
}

export default HomeMain
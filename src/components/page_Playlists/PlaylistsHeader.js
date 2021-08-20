

export default function setHeader(genre) {
    if(genre === "toplists") return "Spotify Playlists"
    if(genre === "summer") return "Summer Hits"
    if(genre === "party") return "Party Music"
    if(genre === "rnb") return "R&B"
    if(genre === "edm_dance") return "Dance/Electronic"
    if(genre === "fresh_finds") return "Fresh Finds"
    if(genre === "indie_alt") return "Indie"
    if(genre === "regional_mexican") return "Mexican Music"
    if(genre === "kids_family") return "Kids & Family"
    if(genre === "roots") return "Folk & Accoustic"
    if(genre === "kpop") return "K - Pop"
    if(genre === "in_the_car") return "In The Car"
    if(genre === "at_home") return "At Home"
    if(genre === "dinner") return "Cooking & Dinner"
    if(genre === "popculture") return "Pop Culture"
    if(genre === "radar") return "RADAR"
    if(genre === "equal") return "EQUAL"
    else return genre.charAt(0).toUpperCase() + genre.slice(1);
}
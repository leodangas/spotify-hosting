
export function songLength(duration_ms) {
    let minutes = Math.floor(duration_ms / 60000);
    let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    let duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return duration
}

export function artists(artists) {
    let artist = artists.map((item) => {
        return item.name
    })
    artist = artist.join(", ")
    return artist
}

export function totalPlaylistLength(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let totalDuration = hours + " hr " + minutes + " min";
    return totalDuration;
}

export function songAdded(time) {
    let today = new Date();
    let added = new Date(time);
    let msInDay = 24 * 60 * 60 * 1000;
    added.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    let diff = (+today - +added) / msInDay;
    if (diff <= 30) diff = diff + " days ago";
    if (diff > 30) {
      let month = added.toLocaleString("default", { month: "long" });
      let day = added.getUTCDate();
      let year = added.getUTCFullYear();
      diff = month + " " + day + ", " + year;
    }
    return diff;  
}
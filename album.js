const params = new URLSearchParams(location.search);
const albumId = params.get("id")

function timeStampFromDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`;
}

// async/await pattern

// una funzione marcata come async RESTITUISCE UNA PROMESSA
// questa sintassi ci consente di scrivere codice asincrono
// in ordine cronologico di esecuzione, come se fosse sincrono
// MA comunque resta asincrono con tutte le peculiarità del caso

async function loadAlbumData() {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
    const data = await response.json()

    return data
}

const albumTitleRef = document.querySelector('#album-title');
const sectionCoverRef = document.querySelector('section#cover');
const sectionTracklistRef = document.querySelector('section#tracklist');

window.onload = async function () {
    const data = await loadAlbumData()

    albumTitleRef.innerHTML = data.title

    sectionCoverRef.innerHTML = /*html*/`
        <img class="img-fluid" src=${data.cover_big} alt=${data.title}>
    `

    sectionTracklistRef.innerHTML = /*html*/`
        <ul>
        ${data.tracks.data.map(song => /*html*/`
                <li class="text-white">${song.title} ${timeStampFromDuration(song.duration)}</li>
            `)
        }
        </ul>
    `


}
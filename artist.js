const params = new URLSearchParams(window.location.search);
const id = params.get("id")

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
    .then(r => r.json())
    .then(displayArtist)


const artistName = document.querySelector("#artistName")

function displayArtist(data) {

    console.log(data.name)

    artistName.innerHTML = data.name


}

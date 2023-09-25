const searchField = document.querySelector("#searchField")
const resultsContainer = document.querySelector("#searchResults > div")

function timeStampFromDuration(duration) {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

function search(query) {
    const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`

    resultsContainer.innerHTML = /*html*/`
        <div id="loader" class="d-flex w-100" style="max-width:unset; flex:1">
            <div class="cube-folding">
                <span class="leaf1"></span>
                <span class="leaf2"></span>
                <span class="leaf3"></span>
                <span class="leaf4"></span>
            </div>
        </div>
    `

    fetch(url)
        .then(r => r.json())
        .then(body => {
            resultsContainer.innerHTML = body.data.map(result => /*html*/`
        <div class="px-2">
            <img class="w-100" src="${result.album.cover}" alt="" />
            <div>
                <h6 class="mt-2 mb-0">${result.title} <span class="text-muted">${timeStampFromDuration(result.duration)}</span></h6>
                <p class="m-0 text-white-50">
                    <a href="artist.html?id=${result.artist.id}">
                        ${result.artist.name}
                    </a>
                </p>
            </div>
        </div>
            `
            ).join("")
        })
        .finally(() => {
            resultsContainer.querySelector("#loader").remove()
        })

}


search("muse")
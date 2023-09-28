const searchField = document.querySelector("#searchField");
const resultsContainer = document.querySelector("#searchResults > div");

function timeStampFromDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function search(query) {

  // LocalStorage per salvare dati dentro la memoria permanente del browser
  // .getItem("chiave")
  // .setItem("chiave", "valore")

  // LocalStorage salva e legge soltanto delle stringhe, pertanto potremmo
  // avere necessità di utilizzare JSON.stringify/JSON.parse per scrivere/leggere
  // oggetti JSON più complessi.

  // LocalStorage può anche rimuovere i valori
  // .removeItem("chiave") // rimuove l'elemento alla tale chiave
  // .clear() // rimuove tutti gli elementi

  if (localStorage.getItem("recentSearches") === null) {
    localStorage.setItem("recentSearches", JSON.stringify([]))
  }

  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));

  recentSearches.push(query);

  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

  displayRecentSearches()

  const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

  resultsContainer.innerHTML = /*html*/ `
        <div id="loader" class="d-flex w-100" style="max-width:unset; flex:1">
            <div class="cube-folding">
                <span class="leaf1"></span>
                <span class="leaf2"></span>
                <span class="leaf3"></span>
                <span class="leaf4"></span>
            </div>
        </div>
    `;

  fetch(url)
    .then((r) => r.json())
    .then((body) => {
      resultsContainer.innerHTML = body.data
        .map(
          (result) => /*html*/ `
        <div class="px-2">
            <a href="album.html?id=${result.album.id}">
              <img class="w-100" src="${result.album.cover}" alt="" />
            </a>
            <div>
                <h6 class="mt-2 mb-0">${result.title
            } <span class="text-muted">${timeStampFromDuration(
              result.duration
            )}</span></h6>
                <p class="m-0 text-white-50">
                    <a href="artist.html?id=${result.artist.id}">
                        ${result.artist.name}
                    </a>
                </p>
            </div>
        </div>
            `
        )
        .join("");
    })
    .finally(() => {
      resultsContainer.querySelector("#loader").remove();
    });
}

function displayRecentSearches() {

  const recentSearchesContainer = document.querySelector("#recent-searches")

  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"))

  recentSearchesContainer.innerHTML = recentSearches.map(
    query => /*html*/`
      <li class="text-white" >${query}</li>
    `
  ).join("")


}

// search("muse");
displayRecentSearches()
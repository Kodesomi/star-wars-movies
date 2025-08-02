const apiKey = "ef8c72f4";
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=star wars`;

const moviesGrid = document.getElementById("movies-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

function fetchMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        moviesGrid.innerHTML = `<p style="color:#fff;">${data.Error}</p>`;
      }
    })
    .catch(error => {
      moviesGrid.innerHTML = `<p style="color:#fff;">Error loading movies.</p>`;
      console.error(error);
    });
}

function displayMovies(movies) {
  moviesGrid.innerHTML = "";
  movies.forEach(movie => {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      .then(res => res.json())
      .then(details => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
          <img class="movie-poster" src="${details.Poster !== "N/A" ? details.Poster : "https://via.placeholder.com/400x600?text=No+Image"}" alt="${details.Title}" />
          <div class="movie-details">
            <div class="movie-title">${details.Title}</div>
            <div class="movie-date">Released: ${details.Released}</div>
            <div class="movie-plot">${details.Plot}</div>
            <a href="#" class="more-info">More info</a>
          </div>
        `;
        moviesGrid.appendChild(card);
      });
  });
}

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`);
  }
});

// Initial load
fetchMovies(apiUrl);




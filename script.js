function searchMovies() {
  const movieName = document.getElementById("searchInput").value;
  const apiKey = "ef8c72f4";
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("movieContainer");
      if (data.Response === "True") {
        container.innerHTML = data.Search.map(movie => `
          <div class="movie-card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${movie.Title}" />
            <div class="movie-info">
              <div class="movie-title">${movie.Title}</div>
              <div class="movie-year">${movie.Year}</div>
            </div>
          </div>
        `).join('');
      } else {
        container.innerHTML = `<p>No movies found. Try another search.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
      document.getElementById("movieContainer").innerHTML = "<p>Failed to fetch movie data.</p>";
    });
}








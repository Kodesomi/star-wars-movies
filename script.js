
const apiUrl = 'https://swapi.dev/api/films/';
const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const loader = document.getElementById('loader');
const toggleThemeButton = document.getElementById('toggle-theme');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
const itemsPerPage = 3;
let allMovies = [];

// Show loader
function showLoader() {
  loader.style.display = 'block';
}

// Hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Fetch movies from API
async function fetchMovies() {
  showLoader();
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    allMovies = data.results;
    renderMovies(allMovies, currentPage);
    setupPagination(allMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    hideLoader();
  }
}

// Render movie list
function renderMovies(movies, page) {
  movieList.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedMovies = movies.slice(start, end);

  paginatedMovies.forEach((movie, index) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="https://via.placeholder.com/150x200?text=Star+Wars" alt="Movie Poster">
      <div class="movie-title">${movie.title}</div>
      <div class="movie-details">
        <strong>Episode:</strong> ${movie.episode_id}<br>
        <strong>Director:</strong> ${movie.director}<br>
        <strong>Release:</strong> ${movie.release_date}
      </div>
    `;
    movieList.appendChild(card);
  });
}

// Setup pagination buttons
function setupPagination(movies) {
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(movies.length / itemsPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.classList.add('page-btn');
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderMovies(allMovies, currentPage);
      setupPagination(allMovies);
    });
    paginationContainer.appendChild(btn);
  }
}

// Search functionality
searchButton.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(query));
  currentPage = 1;
  renderMovies(filtered, currentPage);
  setupPagination(filtered);
});

// Dark/light theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  toggleThemeButton.textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';
}

toggleThemeButton.addEventListener('click', toggleTheme);

// Initial fetch
fetchMovies();








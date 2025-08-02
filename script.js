const movieContainer = document.getElementById('movieContainer');
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');
const pageNumber = document.getElementById('pageNumber');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const themeToggle = document.getElementById('theme-toggle');

let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const itemsPerPage = 3;

// Dark Mode Toggle
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Show loader
function showLoader() {
  loader.classList.remove('hidden');
}

// Hide loader
function hideLoader() {
  loader.classList.add('hidden');
}

function renderMovies(movies) {
  movieContainer.innerHTML = '';
  if (movies.length === 0) {
    movieContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = movies.slice(start, start + itemsPerPage);

  paginatedMovies.forEach((movie, index) => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <img src="https://via.placeholder.com/300x200?text=${encodeURIComponent(movie.title)}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Release:</strong> ${movie.release_date}</p>
      <p><strong>Episode:</strong> ${movie.episode_id}</p>
    `;
    movieContainer.appendChild(movieCard);
  });

  pageNumber.textContent = `Page ${currentPage}`;
}

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchValue)
  );
  currentPage = 1;
  renderMovies(filteredMovies);
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderMovies(filteredMovies);
  }
});

nextBtn.addEventListener('click', () => {
  const maxPage = Math.ceil(filteredMovies.length / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderMovies(filteredMovies);
  }
});

async function fetchMovies() {
  try {
    showLoader();
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    allMovies = data.results.sort((a, b) => a.episode_id - b.episode_id);
    filteredMovies = allMovies;
    renderMovies(filteredMovies);
  } catch (error) {
    movieContainer.innerHTML = '<p>Failed to load movies. Try again later.</p>';
  } finally {
    hideLoader();
  }
}

fetchMovies();







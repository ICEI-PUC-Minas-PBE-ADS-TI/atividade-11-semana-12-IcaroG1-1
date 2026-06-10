const API_KEY = "1bb3dc15e3543058b410ff066abaab53";

const movieList = document.getElementById("movie-list");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

async function fetchMovies(query = "") {

    let url;

    if(query){
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`;
    } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
    }

    try{

        showMessage("Carregando...");

        const response = await fetch(url);
        const data = await response.json();

        renderMovies(data.results);

    }catch(error){

        showMessage("Erro ao carregar filmes.");

    }
}

function createMovieCard(movie){

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p><strong>Ano:</strong> ${movie.release_date?.split("-")[0] || "N/A"}</p>
        <p><strong>Nota:</strong> ${movie.vote_average}</p>
        <p>
${
    movie.overview
        ? movie.overview.substring(0,120) + "..."
        : "Sinopse não disponível."
}
</p>
    `;

    return card;
}

function showMessage(text){
    message.textContent = text;
}

btnSearch.addEventListener("click", () => {

    const query = searchInput.value.trim();

    fetchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){
        fetchMovies(searchInput.value.trim());
    }
});

function init(){
    fetchMovies();
}

init();

function renderMovies(movies){

    movieList.innerHTML = "";

    if(!movies || movies.length === 0){
        showMessage("Nenhum filme encontrado.");
        return;
    }

    message.textContent = "";

    movies.forEach(movie => {
        movieList.appendChild(createMovieCard(movie));
    });
}
  
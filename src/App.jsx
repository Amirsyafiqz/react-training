import { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-dark-900 text-white px-4 pb-10">
      <div className="pattern" />
      <div className="wrapper max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="text-center py-10">
          <img
            src="/hero.png"
            alt="Hero Banner"
            className="mx-auto w-20 mb-6"
          />
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>

        {/* Search Input */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Movie Section */}
        <section className="all-movies mt-12">
          <h2 className="text-white text-2xl font-semibold mb-4">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movieList
                .filter((movie) =>
                  movie.title
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;








          
       




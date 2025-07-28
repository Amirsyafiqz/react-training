// src/App.jsx
import { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { client, updateSearchCount, getTrendingMovies } from "./appwriteConfig";

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  useEffect(() => {
    console.log("✅ Appwrite client initialized:", client);

    const fetchTrending = async () => {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");

      const isSearching = debouncedSearchTerm.trim() !== "";
      const endpoint = isSearching
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(debouncedSearchTerm)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      try {
        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();
        console.log(data)

        if (!data.results || data.results.length === 0) {
          setErrorMessage("No movies found.");
          setMovieList([]);
          return;
        }

        setMovieList(data.results);

        if (isSearching) {
          await updateSearchCount(debouncedSearchTerm, data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setErrorMessage("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <main className="bg-red-900 text-white px-4 pb-10">
      <div className="wrapper max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="text-center py-10">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
        </header>

        {/* Search Input */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Trending Section */}
        {trendingMovies.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">🔥 Trending Movies</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trendingMovies.map((movie) => (
                <li key={movie.$id} className="bg-zinc-800 rounded-xl overflow-hidden">
                  <img src={movie.poster_url} alt={movie.title} className="w-full h-auto" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{movie.title || movie.searchTerm}</h3>
                    <p className="text-sm text-gray-400">Searched {movie.count}x</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Movie Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movieList.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;












          
       




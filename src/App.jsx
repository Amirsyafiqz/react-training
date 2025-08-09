import { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies, client } from "./appwriteConfig";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Delay typing search input
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  // Debug Appwrite connection & trending fetch (optional)
  useEffect(() => {
    console.log("Appwrite client initialized:", client);
    getTrendingMovies()
      .then((trending) => {
        console.log("Trending movies:", trending);
      })
      .catch((err) => console.error("Error fetching trending movies:", err));
  }, []);

  // Fetch movies (search / popular)
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

        if (!data.results?.length) {
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
    <main className="bg-[#0f0f1b] text-white min-h-screen px-4 pb-10">
      <div className="wrapper max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="text-center py-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Find{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Movies
            </span>{" "}
            You'll Enjoy Without the Hassle
          </h1>
        </header>

        {/* Search Input */}
        <div className="max-w-xl mx-auto">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search through thousands of movies"
          />
        </div>

        {/* All Movies */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movieList.map((movie) => (
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















          
       




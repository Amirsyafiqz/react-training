import React from "react";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const {
    poster_path,
    title = "Untitled",
    vote_average,
    original_language = "N/A",
    release_date,
    overview = "No overview available",
  } = movie;

  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder.png";

  return (
    <li
      className="bg-zinc-800 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-200 flex flex-col items-center text-center"
      aria-label={`Movie card for ${title}`}
    >
      {/* Poster */}
      <img
        src={poster}
        alt={`${title} Poster`}
        className="w-full h-[300px] object-cover rounded-lg mb-3"
        loading="lazy"
      />

      {/* Title */}
      <h3 className="text-white font-semibold text-lg truncate w-full">
        {title}
      </h3>

      {/* Overview (shortened) */}
      <p className="text-gray-300 text-sm line-clamp-3 mt-1">
        {overview}
      </p>

      {/* Extra Info */}
      <div className="flex flex-wrap justify-center items-center gap-2 text-gray-400 text-sm mt-3">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span>{vote_average?.toFixed(1) || "N/A"}</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <span className="uppercase">{original_language}</span>
        <span className="hidden sm:inline">•</span>
        <span>{release_date?.slice(0, 4) || "N/A"}</span>
      </div>
    </li>
  );
};

export default MovieCard;






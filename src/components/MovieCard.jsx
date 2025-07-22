import React from "react";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const { poster_path, title, vote_average, original_language, release_date } = movie;

  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder.png"; 

  return (
    <li className="bg-dark-700 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-200">
      <img
        src={poster}
        alt={title || "Movie Poster"}
        className="w-full h-[300px] object-cover rounded-lg"
      />

      <h3 className="text-white font-semibold mt-3 truncate">
        {title || "Untitled"}
      </h3>

      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span>{vote_average?.toFixed(1) || "N/A"}</span>
        </div>
        <span>•</span>
        <span className="uppercase">{original_language || "N/A"}</span>
        <span>•</span>
        <span>{release_date?.slice(0, 4) || "N/A"}</span>
      </div>
    </li>
  );
};

export default MovieCard;




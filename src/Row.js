import React, { useState, useEffect } from "react";
import axiox from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTreailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axiox.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);
  var opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTreailerUrl("");
    } else {
       movieTrailer(movie?.title ||movie?.name || "")
       .then((url) => {
        const urlParms =new URLSearchParams( new URL(url).search);
        setTreailerUrl(urlParms.get('v'));
      })
       .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
export default Row;

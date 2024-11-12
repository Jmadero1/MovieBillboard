import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommends = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchTerms = ["batman", "superman", "spiderman", "avengers", "star wars"];
        const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=e9ee67e4&s=${randomTerm}&type=movie`
        );
        const data = await response.json();

        if (data.Search) {
          const mappedMovies = data.Search.map((movie) => ({
            id: movie.imdbID,
            cardImg: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300",
            title: movie.Title,
          }));
          setMovies(mappedMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Container>
      <h4>Recommended for you</h4>
      <Carousel {...settings}>
        {movies &&
          movies.map((movie, key) => (
            <Wrap key={key}>
              <Link to={`/detail/${movie.id}`}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;

const Carousel = styled(Slider)`
  .slick-list {
    overflow: visible;
  }

  .slick-dots li button:before {
    font-size: 10px;
    color: white;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Recommends;

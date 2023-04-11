import { getMovies, IGetMoviesResult, IMovie } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { makeImagePath } from "./utils";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import SliderComponent from "./Components/SliderComponent";
const Wrapper = styled.div`
  overflow-x: hidden;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

function Home() {
  const [clickedMovie, setClickedMovie] = useState<IMovie | null>(null);
  //There is 4 types of movie: now_playing, popular, top_rated, upcoming
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "now_playing"],
    () => getMovies("now_playing")
  );
  const { data: popular } = useQuery<IGetMoviesResult>(["movies", "popular"], () =>
    getMovies("popular")
  );
  const { data: topRated } = useQuery<IGetMoviesResult>(["movies", "top_rated"], () =>
    getMovies("top_rated")
  );
  const { data: upcoming } = useQuery<IGetMoviesResult>(["movies", "upcoming"], () =>
    getMovies("upcoming")
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}>
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          {typeof popular != "undefined" && (
            <SliderComponent
              title="Popular"
              titleIndex="2"
              data={popular}
              clickedMovie={clickedMovie}
              setClickedMovie={setClickedMovie}
            />
          )}
          {typeof nowPlaying != "undefined" && (
            <SliderComponent
              title="Now Playing"
              titleIndex="1"
              data={nowPlaying}
              clickedMovie={clickedMovie}
              setClickedMovie={setClickedMovie}
            />
          )}
          {typeof topRated != "undefined" && (
            <SliderComponent
              title="Top Rated"
              titleIndex="3"
              data={topRated}
              clickedMovie={clickedMovie}
              setClickedMovie={setClickedMovie}
            />
          )}
          {typeof upcoming != "undefined" && (
            <SliderComponent
              title="Upcoming"
              titleIndex="4"
              data={upcoming}
              clickedMovie={clickedMovie}
              setClickedMovie={setClickedMovie}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Home;

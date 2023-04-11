import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, IMovie } from "../../api";
import { makeImagePath } from "../utils";
import ModalContent from "./ModalContent";

const Slider = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  top: -100px;
  margin-bottom: 200px;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.1,
      duaration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duaration: 0.2,
      type: "tween",
    },
  },
};

const SliderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 26px;
    font-weight: 600;
    padding: 15px;
  }
  div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    width: 70px;
  }
`;

const offset = 6;

interface SliderComponentProps {
  data: IGetMoviesResult;
  titleIndex: string;
  title: string;
  clickedMovie: IMovie | null;
  setClickedMovie: React.Dispatch<React.SetStateAction<IMovie | null>>;
}

function SliderComponent({
  data,
  title,
  titleIndex,
  clickedMovie,
  setClickedMovie,
}: SliderComponentProps) {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const idMatch = useMatch("/movies/:movieId");

  console.log(clickedMovie);

  const onOverlayClick = () => {
    navigate("/");
  };
  const boxClick = (movieId: number, titleIndex: string) => {
    navigate(`/movies/${movieId}` + titleIndex);
    const movie = data?.results.find((movie) => movie.id === movieId);
    if (typeof movie === "undefined") return;
    setClickedMovie(movie);
  };

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <>
      <Slider>
        <SliderNav>
          <h1>{title}</h1>
          <div>
            <button onClick={decreaseIndex}>◀</button>
            <button onClick={increaseIndex}>▶</button>
          </div>
        </SliderNav>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={isBack}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isBack}
            transition={{ duration: 1, type: "tween" }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ duration: 0.2, type: "tween" }}
                  key={movie.id + titleIndex + ""}
                  layoutId={movie.id + titleIndex + ""}
                  onClick={() => boxClick(movie.id, titleIndex)}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {idMatch ? (
          <>
            <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <MovieModal style={{ top: scrollY.get() + 100 }} layoutId={idMatch.params.movieId}>
              <ModalContent
                backdrop_path={clickedMovie?.backdrop_path + ""}
                title={clickedMovie?.title + ""}
                overview={clickedMovie?.overview + ""}
              />
            </MovieModal>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default SliderComponent;

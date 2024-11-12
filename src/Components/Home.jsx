import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers"; 
import { db, onSnapshot, collection } from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(selectUserName); // Desestructuración

  // Efecto para cargar las películas desde Firestore
  useEffect(() => {
    const moviesCollection = collection(db, "movies"); // Nombre de la colección

    const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {
      const categorizedMovies = {
        recommend: [],
        newDisney: [],
        original: [],
        trending: [],
      };

      snapshot.docs.forEach((doc) => {
        const movieData = { id: doc.id, ...doc.data() };

        // Clasificando las películas según el tipo
        switch (doc.data().type) {
          case "recommend":
            categorizedMovies.recommend.push(movieData);
            break;
          case "new":
            categorizedMovies.newDisney.push(movieData);
            break;
          case "original":
            categorizedMovies.original.push(movieData);
            break;
          case "trending":
            categorizedMovies.trending.push(movieData);
            break;
          default:
            break;
        }
      });

      // Dispatch a Redux action para actualizar el estado con las películas
      dispatch(setMovies(categorizedMovies));
    });

    return () => unsubscribe(); // Limpiar suscripción al desmontar el componente
  }, [dispatch, userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

// Estilos
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;

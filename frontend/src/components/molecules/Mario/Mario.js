import "./Mario.css";
import MarioCharacter from "../../../assets/img/gif/mario-run.gif";
import { useEffect, useRef, useCallback, useMemo } from "react";
import jumpAudio from "../../../assets/audio/mario-jump.mp3";
import backgroundMusic from "../../../assets/audio/running-about.mp3";
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  marioJumping,
  marioHeight,
  marioLeft,
  marioTop,
  marioWidth,
} from "../../../config/redux/marioSlice";
import { setReady, setDie, setScore } from "../../../config/redux/engineSlice";

// die
import dieAudio from "../../../assets/audio/mario-died.mp3";

const Mario = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const marioRef = useRef();
  const dispatch = useDispatch();
  const die = useSelector((state) => state.engine.die);
  const loadingScreen = useSelector((state) => state.engine.loadingScreen);
  const userId = useSelector((state) => state.auth.UserId);
  const finalScore = useSelector((state) => state.engine.score); 


  const isPlay = useSelector((state) => state.engine.play);
  // Mario positions & jump
  const mario_jump = useSelector((state) => state.mario.jumping);
  const mario_height = useSelector((state) => state.mario.height);
  const mario_left = useSelector((state) => state.mario.left);
  const mario_top = useSelector((state) => state.mario.top);
  const mario_width = useSelector((state) => state.mario.width);
  // Obstacle1 positions
  const obs1_height = useSelector((state) => state.obstacle.obs1Height);
  const obs1_left = useSelector((state) => state.obstacle.obs1Left);
  const obs1_top = useSelector((state) => state.obstacle.obs1Top);
  const obs1_width = useSelector((state) => state.obstacle.obs1Width);
  // Obstacle2 positions
  const obs2_height = useSelector((state) => state.obstacle.obs2Height);
  const obs2_left = useSelector((state) => state.obstacle.obs2Left);
  const obs2_top = useSelector((state) => state.obstacle.obs2Top);
  const obs2_width = useSelector((state) => state.obstacle.obs2Width);
  // Obstacle2 positions
  const obs3_height = useSelector((state) => state.obstacle.obs3Height);
  const obs3_left = useSelector((state) => state.obstacle.obs3Left);
  const obs3_top = useSelector((state) => state.obstacle.obs3Top);
  const obs3_width = useSelector((state) => state.obstacle.obs3Width);

  // Jump audio
  const jump = useMemo(() => {
    return new Audio(jumpAudio);
  }, []);

  // Die
  const marioDie = useMemo(() => {
    return new Audio(dieAudio);
  }, []);

  const bgMusic = useMemo(() => {
    return new Audio(backgroundMusic);
  }, []);

  // Handling key press event.
  const handleKey = useCallback(
    (e) => {
      if (e.code === "Enter" && !isPlay && !die && !loadingScreen) {
        dispatch(setReady(true));
      }
      if (mario_jump === false && e.code === "Space" && isPlay && !die && !loadingScreen) {
        dispatch(marioJumping(true));
        jump.play();
        setTimeout(() => {
          dispatch(marioJumping(false));
          jump.pause();
          jump.currentTime = 0;
        }, 400);
      }
    },
    [mario_jump, jump, dispatch, isPlay, die, loadingScreen]
  );

  useEffect(() => {
    if ((
      mario_left < obs1_left + obs1_width &&
      mario_left + mario_width > obs1_left &&
      mario_top < obs1_top + obs1_height &&
      mario_top + mario_height > obs1_top)
      ||
      (mario_left < obs2_left + obs2_width &&
      mario_left + mario_width > obs2_left &&
      mario_top < obs2_top + obs2_height &&
      mario_top + mario_height > obs2_top)
      ||
      ( mario_left < obs3_left + obs3_width &&
        mario_left + mario_width > obs3_left &&
        mario_top < obs3_top + obs3_height &&
        mario_top + mario_height > obs3_top)
    ) {
      dispatch(setDie(true));
      axios.post(apiUrl+"/api/scores", {
        id_user: userId, 
        score: finalScore 
      })
      .catch((error) => {
        console.error("Errore durante l'inserimento dello score:", error);
      });
      marioDie.play();
      dispatch(setReady(false));
      setTimeout(() => {
        dispatch(setDie(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setScore(0));
      }, 100);
    }

  }, [
    mario_left,
    mario_width,
    mario_height,
    mario_top,
    marioDie,

    dispatch,

    obs1_left,
    obs1_width,
    obs1_top,
    obs1_height,
    
    obs2_left,
    obs2_width,
    obs2_top,
    obs2_height,

    obs3_left,
    obs3_width,
    obs3_top,
    obs3_height,
  ]);

  // Monitor key press.
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    dispatch(marioHeight(marioRef.current.getBoundingClientRect().height));
    dispatch(marioLeft(marioRef.current.getBoundingClientRect().left));
    dispatch(marioTop(marioRef.current.getBoundingClientRect().top));
    dispatch(marioWidth(marioRef.current.getBoundingClientRect().width));

    if (isPlay) {
      bgMusic.play();
    } else {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, [handleKey, dispatch, bgMusic, isPlay]);

  return (
    <div className="mario-container">
      {!die && (
        <img
          src={MarioCharacter}
          alt=""
          className={`mario ${mario_jump ? "jump" : ""}`}
          ref={marioRef}
        />
      )}
      {die && (
        <img
          src={MarioCharacter}
          alt=""
          className={`mario ${die ? "die" : ""}`}
          ref={marioRef}
        />
      )}
    </div>
  );
};
export default Mario;

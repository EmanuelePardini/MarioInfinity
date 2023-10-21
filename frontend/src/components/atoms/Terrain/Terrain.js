import { useEffect, useState } from "react";
import "./Terrain.css";

const Terrain = () => {
  const [isReady, setIsReady] = useState(false);

  // Check if document is loaded before animating clouds
  useEffect(() => {
    const setLoad = () => setIsReady(true);

    if(document.readyState === "complete") {
      setLoad();
    } else {
      window.addEventListener("load", setLoad);

      // return cleanup function
      return () => window.removeEventListener("load", setLoad);
    }
  },[]);
  return (
    <div className="Terrain-container">
        <div className={isReady ? "Terrain Terrain-animate" : "Terrain"}/>
    </div>
  )
}
export default Terrain
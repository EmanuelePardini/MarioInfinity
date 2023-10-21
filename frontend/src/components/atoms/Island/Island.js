import { useEffect, useState } from "react";
import "./Island.css";

const Island = () => {
  const [isReady, setIsReady] = useState(false);

  // Check if document is loaded before animating Island
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
    <div className="island-container">
        <div className={isReady ? "island island-animate" : "island"}></div>
    </div>
  )
}
export default Island
import { useEffect, useState } from "react";
import "./Bowser.css";

const Bowser = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setLoad = () => setIsReady(true);

    if(document.readyState === 'complete') {
      setLoad();
    } else {
      window.addEventListener("load", setLoad);

      // return cleanup function
      return () => window.removeEventListener("load", setLoad);
    }
   },[]);

  return (
    <div className="bowser-container">
        <div className={isReady ? "bowser bowser-animate" : "bowser "}></div>
    </div>
  )
}
export default Bowser;
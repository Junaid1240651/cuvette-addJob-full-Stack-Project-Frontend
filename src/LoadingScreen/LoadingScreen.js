import React from "react";
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
import "./LoadingScreen.css";
const LoadingScreen = () => {
  return (
    <div className="App">
      <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
    </div>
  );
};

export default LoadingScreen;

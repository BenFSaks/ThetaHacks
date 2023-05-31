function Crop() {

    return (
        <div id='crop-container'></div>
    );
  }
  export default Crop;


//PAGE RENDER
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import "./styles/Crop.css"; 

ReactDOM.createRoot(document.getElementById("crop-route") as HTMLElement).render(
  <React.StrictMode>
    <Crop />
  </React.StrictMode>
);
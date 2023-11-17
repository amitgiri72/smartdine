import React from "react";
import Particles from "react-tsparticles";
import { loadModels } from "./helpers/faceApi";
import { createFaLibrary } from "./helpers/icons";
import Camera from "./components/Camera/Camera";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import { loadFull } from "tsparticles";
import particles from "./utils.js/particles";
import TableSad from "./pages/Chart/Table";
import { Toaster } from "react-hot-toast";

createFaLibrary();
loadModels();
function App() {
  const location = useLocation();
  // console.log(location);

  const handleInit = async (main) => {
    await loadFull(main);
  };

  const renderParticleJsInHomePage = location.pathname === "/";

  return (
    <div className="App">
      {renderParticleJsInHomePage && (
        <Particles id="particles" options={particles} init={handleInit} />
      )}

      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
              fontSize: "2rem",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
              fontSize: "2rem",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/chart" element={<TableSad />} />
      </Routes>
    </div>
  );
}

export default App;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Animate } from "react-simple-animate";
import "./styles.css";


const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToReviewPage = () => {
    navigate("/camera");
  };
  const handleNavigateToChartPage = () => {
    navigate("/chart");
  }

  return (
    <section id="home" className="home">
      <div className="home__text-wrapper">
        <h1 style={{ animation: "typingEffect 1s steps(30,end)" }}>
          SMARTDINE
        </h1>
      </div>
      <Animate
        play
        duration={1.5}
        delay={1}
        start={{
          transform: "translateY(550px)",
        }}
        end={{
          transform: "translatex(0px)",
        }}
      >
        <div className="home__contact-me">
          <button onClick={handleNavigateToReviewPage}>Give Food Review</button>
         
        </div>
        <div className="home__contact-me">
      
          <button onClick={handleNavigateToChartPage}>View Chart</button>
        </div>
        
      </Animate>
    </section>
   
  );
};
export default Home;

import React from "react";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="rightnav">
        <p>
          We travel, some of us forever, to seek other places, other lives,
          other souls.
        </p>
        <p>To get best traveling experience</p>
      </div>
      <div className="description">
        <p>Description of Site.</p>
        Also add Images
      </div>
      <div className="search">
        <input type="text" placeholder="Search for ride" />
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/home.scss";

export const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome!</h1>
      <p>
        This platform is designed to help you stay organized and efficient by
        providing you with a Todo App and a section for adding and editing
        articles.
      </p>
      <div className="clock">
        <span>{currentTime.toLocaleTimeString()}</span>
      </div>
      <div className="home-page-buttons">
        <Link to="/todos">
          <button>Todo App</button>
        </Link>
        <Link to="/articles">
          <button>Articles</button>
        </Link>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Login } from "./components/login";
import { Register } from "./components/register";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col m-0 p-0">
        
        <Navigation />

        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Header data={landingPageData.Header} />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;

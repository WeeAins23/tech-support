import React, { useState, useEffect } from "react";
// Importing global components (Header, Footer, Nav)
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
// Importing page components (Login, Register, FAQs, Privacy Policy, Terms of Use, Dashboard, Modules)
import { Login } from "./components/login";
import { Register } from "./components/register";
import FAQ from "./components/faqs";
import PrivacyPolicy from "./components/privacy";
import Terms from "./components/terms";
import Dashboard from "./components/dashboard";
import MousePractice from "./components/modules/mouse-practice";
import KeyboardBasics from "./components/modules/keyboard-basics";
import Browser from "./components/modules/browser";
import Search from "./components/modules/search";
import Email from "./components/modules/email";
// Importing JSON data for the landing page
import JsonData from "./data/data.json";
// Import SmoothScroll for smooth scrolling behavior when clicking anchor links
import SmoothScroll from "smooth-scroll";
// Importing Routing Tools 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  // A state variable that holds all the text for the homepage
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    // When the app first loads, fill the state with the info from the JSON file
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col m-0 p-0">
        
        {/* Navigation always stays at the top of every page */}
        <Navigation />
        <main className="content-wrapper flex-grow mb-20">
          <Routes>
            {/* path="/": The Homepage. We pass the Header its specific data here */}
            <Route 
              path="/" 
              element={<Header data={landingPageData.Header} />} 
            />
            {/* Path Mapping: Tells the browser which component to show for each URL */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Lesson Modules: The specific learning pages */}
            <Route path="/mouse-practice" element={<MousePractice />} />
            <Route path="/keyboard-basics" element={<KeyboardBasics />} />
            <Route path="/browser" element={<Browser />} />
            <Route path="/search" element={<Search />} />
            <Route path="/email" element={<Email />} />
          </Routes>
        </main>
        
        {/* Footer: Always stays at the bottom of every page */}
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Playground from "./components/Playground";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import './App.css';


function App() {
  const [theme, setTheme] = useState("light");

  // On theme change, update document body class
  useEffect(() => {
    document.body.className = theme;  // add "light" or "dark" class to body
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Header onToggleTheme={toggleTheme} theme={theme} />
      <Playground />
      <Documentation />
      <Footer />
    </>
  );
}

export default App;

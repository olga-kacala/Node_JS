import classes from "./App.module.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className={classes.main}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;

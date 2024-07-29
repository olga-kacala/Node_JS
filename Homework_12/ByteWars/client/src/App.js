import classes from "./App.module.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className={classes.main}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;

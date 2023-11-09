import React from "react";
// import Quiz from "../src/components/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Menu from "./pages/menu";
import Login from "./pages/login";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/quiz" element={<Quiz/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

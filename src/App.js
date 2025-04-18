import {Reset} from "styled-reset";
import React, {useEffect} from "react";
import {BrowserRouter, json, Route, Router, Routes, useLocation} from "react-router-dom";
import './App.css';
import Main from "./component/main/js/Main.js";
import SignIn from "./component/sign/js/SignIn.js";
import SignUp from "./component/sign/js/SignUp.js";

function App() {
  return (
      <BrowserRouter>
        <Reset/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

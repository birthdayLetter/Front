import {Reset} from "styled-reset";
import React, {useEffect} from "react";
import {BrowserRouter, json, Route, Router, Routes, useLocation} from "react-router-dom";
import './App.css';
import Main from "./component/main/js/Main.js";
import SignIn from "./component/sign/js/SignIn.js";
import SignUp from "./component/sign/js/SignUp.js";
import LetterDetail from "./component/subPage/detailPage/js/LetterDetail.js";
import Friend from "./component/subPage/freindPage/js/Friend.js";
import CheckPw from "./component/subPage/myPage/js/CheckPw.js";
import MyPage from "./component/subPage/myPage/js/MyPage.js";
import OauthCallback from "./component/sign/js/OauthCallback";
import SendLetter from "./component/subPage/sendLetter/js/SendLetter.js";

function App() {
  return (
      <BrowserRouter>
        <Reset/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/checkpw" element={<CheckPw/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/send" element={<SendLetter/>}/>
                <Route path="/friend" element={<Friend/>}/>
                <Route path="/oauth/callback" element={<OauthCallback/>}/>
                <Route path="/letter/:year" element={<LetterDetail />} />
            </Routes>
      </BrowserRouter>
  );
}

export default App;

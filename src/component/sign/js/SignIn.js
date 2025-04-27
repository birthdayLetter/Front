import '../scss/SignIn.scss'
import {useEffect} from "react";
import {SiKakaotalk} from "react-icons/si";
import {useNavigate} from "react-router-dom";
import {REDIRECT_URI, REST_API_KEY, SIGN_KAKAO_URL, SIGN_URL} from "../../../config/host-config.js";
import Header from "../../header/js/Header.js";
import { AiTwotoneFrown } from "react-icons/ai";


const SignIn = () => {
    const SIGN_IN_URL = SIGN_URL + "/sign-in";
    const KAKAO_URL = SIGN_KAKAO_URL + "/sign-up"
    const redirection = useNavigate();

    const kakaoLogin = async () => {

        const res = await fetch(KAKAO_URL, {
            method: 'GET',
        })

        // const json = await res.json();
        // console.log(json);
        if (res.ok) {
            const json = await res.json();
            console.log(json);
            redirection('/sign-in'); // 성공 시 리다이렉트
            alert('카카오 로그인 성공!');
        } else {
            console.error('응답 상태 코드:', res.status);
            alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
        }
    }




    const signinHandler = e => {
        e.preventDefault();
        fetchSignInProcess();
    }

    const fetchSignInProcess = async () => {
        const formData = new FormData();
        formData.append('email', document.getElementById('email').value,);
        formData.append('password', document.getElementById('password').value);


        const res = await fetch(SIGN_IN_URL, {
            method: 'POST',
            body: formData
            });

        if (res.status === 400) { // 가입이 안되었거나 비번이 틀린 경우
            // 서버에서 온 텍스트를 추출
            // const text = await res.text();
            // alert(text);
            alert("아이디나 비밀번호가 잘못되었습니다.");
            return;
        } else if (res.status === 500) {
            alert('서버 연결에 오류가 생겼습니다!');
        }
        if (res.status === 200) {
            const {token} = await res.json();
            console.log('로그인 성공~');
            // const responseData = await res.json();
            // 클라이언트에서 로그인을 했다는 사실을 알게 해야함
            // 서버에서 받은 토큰을 브라우저에 저장할것.
            // 1. 로컬 스토리지 - 데이터를 브라우저가 종료되어도 계속 보관
            // 2. 세션 스토리지 - 데이터를 브라우저가 종료되는 순간 삭제함
            // localStorage.setItem('GRANT_TYPE', token.grantType);
            const check = document.getElementById("checkbox").checked
            if (check === true) {
                localStorage.setItem('ACCESS_TOKEN', token);
            } else {
                sessionStorage.setItem('ACCESS_TOKEN', token);
            }

            redirection('/');
        }

    }
    return(
        <>
            <Header />
            <div className="signin-container">
                <div className="signin-box">
                    <div className="signin-title">
                        <p>Login</p>
                    </div>
                    <div className="signin-info-container">
                        <div className="id-box signin-info-box">
                            <div className="signin-info-title">
                                <p>ID</p>
                            </div>
                            <div className="info-input">
                                <input id="email" className="signin-input-box" type="text"/>
                            </div>
                        </div>
                        <div className="pw-box signin-info-box">
                            <div className="signin-info-title">
                                <p>PASSWORD</p>
                            </div>
                            <div className="info-input">
                                <input id="password" className="signin-input-box" type="password"/>
                            </div>
                        </div>
                        <div className="login-check">
                            <input type="checkbox"
                                   id="checkbox"/>
                            <p>로그인정보저장</p>
                        </div>
                    </div>
                    <div className="social-login">
                        <button className="kakao-btn" onClick={() => kakaoLogin()}>
                            <SiKakaotalk className="kakao"/>
                        </button>

                    </div>
                    <div className="signin-btn" onClick={signinHandler}>
                        <p className="signin-btn-style">로그인</p>
                    </div>
                </div>
                <div className="signup-icon-box">
                    <AiTwotoneFrown/>
                </div>
            </div>
        </>
    )
}

export default SignIn;
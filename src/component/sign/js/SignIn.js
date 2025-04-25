import '../scss/SignIn.scss'
import {SiKakaotalk} from "react-icons/si";
import {useNavigate} from "react-router-dom";
import {REDIRECT_URI, REST_API_KEY, SIGN_KAKAO_URL, SIGN_URL} from "../../../config/host-config.js";
import Header from "../../header/js/Header.js";
import { AiTwotoneFrown } from "react-icons/ai";


const SignIn = () => {
    const SIGN_IN_URL = SIGN_URL + "/sign-in";
    const KAKAO_URL = SIGN_KAKAO_URL + "/sign-up"
    const redirection = useNavigate();

    const kakaoLogin= async ()=>{

        window.Kakao.Auth.authorize({
            redirectUri: `${REDIRECT_URI}` // 리다이렉트 URI 입력
        });


    }

    const kakaoLoginToken= async (code)=>{
        const res = await fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
            body:  new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: `${REST_API_KEY}`, // REST API 키
                redirect_uri: 'http://localhost:3000/sign_in', // Redirect URI
                code: code, // 카카오 인증 코드
            }),
        });
        if (res.ok) {
            const data = await res.json();
            const res2=await  fetch('http://localhost:8080/api/user/login/oauth2/code/kakao',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    accessToken: data.access_token,
                    expiresIn:data.expires_in,
                    tokenType:data.token_type,
                    scope:data.scope,
                    refreshToken:data.refresh_token
                })
            });

            if (res2.status === 200) {
                const {token, nickname, profileImg} = await res2.json();
                localStorage.setItem('GRANT_TYPE', token.grantType);
                localStorage.setItem('ACCESS_TOKEN', token.accessToken);
                localStorage.setItem('REFRESH_TOKEN', token.refreshToken);
                localStorage.setItem('NICKNAME', nickname);
                localStorage.setItem('PROFILE_IMG', profileImg);
            }
            redirection('/');
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
            const {token, nickname, profileImg} = await res.json();
            console.log('로그인 성공~');
            // const responseData = await res.json();
            // 클라이언트에서 로그인을 했다는 사실을 알게 해야함
            // 서버에서 받은 토큰을 브라우저에 저장할것.
            // 1. 로컬 스토리지 - 데이터를 브라우저가 종료되어도 계속 보관
            // 2. 세션 스토리지 - 데이터를 브라우저가 종료되는 순간 삭제함
            // localStorage.setItem('GRANT_TYPE', token.grantType);
            // localStorage.setItem('ACCESS_TOKEN', token.accessToken);
            // localStorage.setItem('REFRESH_TOKEN', token.refreshToken);
            // localStorage.setItem('NICKNAME', nickname);
            // localStorage.setItem('PROFILE_IMG', profileImg);

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
                        <div className="social-login">
                            <button className="kakao-btn" onClick={() => kakaoLogin()}>
                                <SiKakaotalk className="kakao"/>
                            </button>

                        </div>
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
import '../scss/SignIn.scss'
import {useNavigate} from "react-router-dom";
import {SIGN_URL} from "../../../config/host-config.js";
import Header from "../../header/js/Header.js";
import { AiTwotoneFrown } from "react-icons/ai";


const SignIn = () => {
    const SIGN_IN_URL = SIGN_URL + "/sign-in";
    const redirection = useNavigate();

    const signinHandler = e => {
        e.preventDefault();
        fetchSignInProcess();
    }

    const fetchSignInProcess = async () => {
        const res = await fetch(SIGN_IN_URL, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                id: document.getElementById('id').value,
                password: document.getElementById('password').value
            })
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
                                <input id="id" className="signin-input-box" type="text"/>
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
                    </div>
                    <div className="signin-btn" onClick={signinHandler}>
                        <p className="signin-btn-style">로그인</p>
                    </div>
                </div>
                <div className="signup-icon-box">
                    <AiTwotoneFrown />
                </div>
            </div>
        </>
    )
}

export default SignIn;
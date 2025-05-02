import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {USER_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import '../scss/CheckPw.scss'

const CheckPw = () => {
    const USER_AUTH_URL = USER_URL + '/auth';
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');

    const redirection = useNavigate();

    const didAlert = useRef(false);

    useEffect(() => {
        if (didAlert.current) return; // 이미 알럿했으면 무시
        didAlert.current = true;       // 알럿했다 표시

        if (localToken === null && sessionToken === null) {
            alert('로그인이 되어있지 않습니다! 로그인하고 들어와주세요');
            redirection('/signin');
        }
    }, []);

    const checkPwHandler = async () => {
        const password = document.getElementById('password')?.value;
        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const tokenToUse = sessionToken || localToken;

        if (!tokenToUse) {
            alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
            redirection('/signin');
            return;
        }

        try {
            const res = await fetch(USER_AUTH_URL, {
                method: 'POST',
                headers: {
                    'X-AUTH-TOKEN': tokenToUse,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            });

            if (!res.ok) {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
                return;
            }

            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const json = await res.json();
                console.log(json);
            } else {
                console.warn("서버에서 JSON이 아닌 응답을 보냈습니다.");
            }

            redirection('/mypage');

        } catch (err) {
            console.error("요청 실패:", err);
            alert("요청 처리 중 오류가 발생했습니다.");
        }
    };

    return(
        <>
            <Header/>
            <div className="checkpw-container">
                <div className="checkpw-box">
                    <div className="checkpw-input-box">
                        <p>PASSWORD</p>
                        <input id="password" type="password"/>
                    </div>
                    <button className="checkpw-btn" onClick={checkPwHandler}>확인</button>
                </div>
            </div>
        </>
    )
}

export default CheckPw;
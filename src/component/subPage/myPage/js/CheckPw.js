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

        if (localToken === null) {
            const res = await fetch(USER_AUTH_URL, {
                method: 'POST',
                headers: {
                    'X-AUTH-TOKEN':`${sessionToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: document.getElementById('password').value
                })

            });
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                redirection('/mypage'); // 성공 시 리다이렉트
            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }
        } else if(sessionToken === null) {
            const res = await fetch(USER_AUTH_URL, {
                method: 'POST',
                headers: {
                    'X-AUTH-TOKEN':`${localToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: document.getElementById('password').value
                })
            });
            if (res.ok) {
                const json = await res.json();
                console.log(json);
                redirection('/mypage'); // 성공 시 리다이렉트
            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }
        }


    }
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
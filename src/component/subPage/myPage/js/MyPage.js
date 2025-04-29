import {useEffect, useRef, useState} from "react";
import {USER_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import '../scss/MyPage.scss'

const MyPage = () => {
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const didAlert = useRef(false);
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        adress: '',
        imagePath: ''
    });

    useEffect(() => {
        if (didAlert.current) return; // 이미 알럿했으면 무시
        didAlert.current = true;       // 알럿했다 표시
        fetchUserInfo();

    }, []);

    const fetchUserInfo = async () => {

        if (localToken === null) {
            const res = await fetch(USER_URL + '/', {
                method: 'GET',
                headers: {
                    'X-AUTH-TOKEN':`${sessionToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            })
            const json = await res.json();
            console.log(json);
            if (res.ok) {
                setUserProfile({
                    ...userProfile,
                    name: json.name,
                    email: json.email,
                    password: json.password,
                    birthDay: json.birthDay,
                    imagePath: json.profileUrl,
                });
            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }

        }else if (sessionToken === null) {
            const res = await fetch(USER_URL + '/', {
                method: 'GET',
                headers: {
                    'X-AUTH-TOKEN':`${localToken}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            })
            const json = await res.json();
            console.log(json);
            if (res.ok) {
                setUserProfile({
                    ...userProfile,
                    name: json.name,
                    email: json.email,
                    password: json.password,
                    birthDay: json.birthDay,
                    imagePath: json.profileUrl,
                });
            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }
        }
    }

    return(
        <>
            <Header/>
            <div className="mypage-container">
                <div className="mypage-box">
                    <div className="myinfo-container">
                        <div className="myprifile-img"></div>
                        <div className="myex-box">
                            <div className="myinfo-box myintro-info">
                                <p>자기소개</p>
                                <div className="myintro">하이하이</div>
                            </div>
                            <div className="myinfo-box myname-info">
                                <p>이름</p>
                                <div className="myname">하이하이</div>
                            </div>
                            <div className="myinfo-box myemail-info">
                                <p>이메일</p>
                                <div className="myemail">하이하이</div>
                            </div>
                            <div className="myinfo-box mypw-info">
                                <p>비밀번호</p>
                                <div className="mypw">********</div>
                            </div>
                            <div className="myinfo-box mybirth-info">
                                <p>생년월일</p>
                                <div className="mybirth">s</div>
                            </div>

                        </div>
                    </div>
                    <button className="modify-box">정보수정</button>
                </div>
            </div>
        </>
    )
}

export default MyPage;
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
        userid: '',
        email: '',
        imagePath: '',
        description: ''
    });
    const [modifyUser, setModifyUser] = useState({
        name: '',
        userid: '',
        email: '',
        password: '',
        imagePath: '',
        description: ''
    });

    const [modifyBtn, setModifyBtn] = useState(false);

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
                if (json.description === null) {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: json.birthDay,
                        imagePath: json.profileUrl,
                        description: '아직 소개글을 작성하지 않았습니다.'
                    });
                } else {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: json.birthDay,
                        imagePath: json.profileUrl,
                        description: json.description
                    });
                }
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
                if (json.description === null) {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: json.birthDay,
                        imagePath: json.profileUrl,
                        description: '아직 소개글을 작성하지 않았습니다.'
                    });

                } else {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: json.birthDay,
                        imagePath: json.profileUrl,
                        description: json.description
                    });
                }
            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }
        }
    }

    // 정보 수정을 눌렀을때
    const modifyHandler = () => {
        setModifyBtn(!modifyBtn);
    }

    return(
        <>
            <Header/>
            <div className="mypage-container">
                <div className="mypage-box">
                    <div className="myinfo-container">
                        <div className="myprifile-img">
                            <img src={userProfile.imagePath} alt=""/>
                        </div>
                        <div className="myex-box">
                            {modifyBtn ? (
                                <>
                                    <div className="myinfo-box myintro-info">
                                        <p>자기소개</p>
                                        <div className="myintro">{userProfile.description}</div>
                                    </div>
                                    <div className="myinfo-box myname-info">
                                        <p>이름</p>
                                        <div className="myname">{userProfile.name}</div>
                                    </div>
                                    <div className="myinfo-box myuserid-info">
                                        <p>유저 ID</p>
                                        <div className="myuserid">{userProfile.userid}</div>
                                    </div>
                                    <div className="myinfo-box myemail-info">
                                        <p>이메일</p>
                                        <div className="myemail">{userProfile.email}</div>
                                    </div>
                                    <div className="myinfo-box mypw-info">
                                        <p>비밀번호</p>
                                        <div className="mypw">********</div>
                                    </div>
                                    <div className="myinfo-box mybirth-info">
                                        <p>생년월일</p>
                                        <div className="mybirth">{userProfile.birthDay}</div>
                                    </div>

                                </>
                            ) : (
                                <>
                                    <div className="myinfo-box myintro-info">
                                        <p>자기소개</p>
                                        <input className="modify-input myintro" placeholder={userProfile.description}/>
                                    </div>
                                    <div className="myinfo-box myname-info">
                                        <p>이름</p>
                                        <input className="modify-input myname" placeholder={userProfile.name}/>
                                    </div>
                                    <div className="myinfo-box myuserid-info">
                                        <p>유저 ID</p>
                                        <input className="modify-input myuserid" placeholder={userProfile.userid}/>
                                    </div>
                                    <div className="myinfo-box myemail-info">
                                        <p>이메일</p>
                                        <input className="modify-input myemail" placeholder={userProfile.email}/>
                                    </div>
                                    <div className="myinfo-box mypw-info">
                                        <p>비밀번호</p>
                                        <input className="modify-input mypw" placeholder={'********'}/>
                                    </div>
                                    <div className="myinfo-box mybirth-info">
                                        <p>생년월일</p>
                                        <input className="modify-input mybirth" placeholder={userProfile.birthDay}/>
                                    </div>

                                </>
                            )}

                        </div>
                    </div>
                    {modifyBtn ? (
                        <>
                            <button className="modifybtn" onClick={modifyHandler}>정보수정</button>
                        </>
                    ) : (
                        <div className="modify-box">
                            <button className="modifybtn" onClick={modifyHandler}>취소</button>
                            <button className="modifybtn">확인</button>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default MyPage;
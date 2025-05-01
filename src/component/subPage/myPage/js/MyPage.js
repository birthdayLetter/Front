import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {USER_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import '../scss/MyPage.scss'

const MyPage = () => {
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const didAlert = useRef(false);
    const redirection = useNavigate();
    const imgRef = useRef();
    const [userProfile, setUserProfile] = useState({
        name: '',
        userid: '',
        email: '',
        password: '',
        imagePath: '',
        description: ''
    });

    const [modifyBtn, setModifyBtn] = useState(true);

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
                const birthArr = json.birthDay; // [2022, 2, 3]
                const formattedBirth = birthArr
                    .map((num) => String(num).padStart(2, '0')) // '02', '03' 등 자릿수 맞춤
                    .join('-'); // '2022-02-03'
                if (json.description === null) {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: formattedBirth,
                        imagePath: json.profileUrl,
                        description: '아직 소개글을 작성하지 않았습니다.'
                    });

                } else {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: formattedBirth,
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
            if (res.ok){
                const birthArr = json.birthDay; // [2022, 2, 3]
                const formattedBirth = birthArr
                    .map((num) => String(num).padStart(2, '0')) // '02', '03' 등 자릿수 맞춤
                    .join('-'); // '2022-02-03'


                if (json.description === null) {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: formattedBirth,
                        imagePath: json.profileUrl,
                        description: '아직 소개글을 작성하지 않았습니다.'
                    });

                } else {
                    setUserProfile({
                        ...userProfile,
                        name: json.name,
                        userid: json.userId,
                        email: json.email,
                        birthDay: formattedBirth,
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
    const modifyBtnHandler = () => {
        setModifyBtn(!modifyBtn);
    }

    // 이미지 업로드 input의 onChange
    const imgChangeHandler = () => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        if (!file) return;

        // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setUserProfile({...userProfile, imagePath: imageDataUrl}); // 미리보기용으로만 사용

            // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);
    };
    const descriptionHandler = (e) => {
        const inputVal = e.target.value;

        setUserProfile({...userProfile, description: inputVal});
    }
    const nameHandler = (e) => {
        const inputVal = e.target.value;

        setUserProfile({...userProfile, name: inputVal});
    }
    const useridHandler = (e) => {
        const inputVal = e.target.value;

        setUserProfile({...userProfile, userid: inputVal});
    }
    const emailHandler = (e) => {
        const inputVal = e.target.value;

        setUserProfile({...userProfile, email: inputVal});
    }
    const passwordHandler = (e) => {
        const inputVal = e.target.value;


        setUserProfile({...userProfile, password: inputVal});
    }
    const birthHandler = (e) => {
        let inputVal = e.target.value.replace(/[^0-9]/g, "").slice(0, 8); // 숫자만 + 최대 8자리
        if (inputVal.length >= 7) {
            inputVal = inputVal.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3");
        } else if (inputVal.length >= 5) {
            inputVal = inputVal.replace(/^(\d{0,4})(\d{0,2})$/g, "$1-$2");
        }

        setUserProfile({...userProfile, birthDay: inputVal});
    }

    const modifyHandler = async () => {
        const formData = new FormData();

        // const file = imgRef.current.files?.[0];
        formData.append('profileUrl', userProfile.imagePath);
        // userValue의 각 필드를 FormData에 추가
        formData.append('name', userProfile.name);
        formData.append('email', userProfile.email);
        formData.append('password', userProfile.password);
        // const cleanBirthDay = userProfile.birthDay.replaceAll('-', '');
        formData.append('birthDay', userProfile.birthDay);
        formData.append('description', userProfile.description);

        const res = await fetch(USER_URL + '/edit',{
            method: 'PUT',
            headers: {
                'X-AUTH-TOKEN':`${sessionToken}`, // 인증 헤더 추가
                'Content-Type': 'application/json',
            },
            body: formData

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
    return(
        <>
            <Header/>
            <div className="mypage-container">
                <div className="mypage-box">
                    <div className="myinfo-container">
                        {modifyBtn ? (
                            <div className="myprifile-img">
                                <img src={userProfile.imagePath} alt=""/>
                            </div>
                        ) : (
                            <>
                            <div className="myprifile-img" onClick={() => imgRef.current.click()}>
                                <img src={userProfile.imagePath} className="mypage-img" alt=""/>
                            </div>
                            <input type="file" className="img-input" accept="image/*"
                            name="imagePath"
                            onChange={imgChangeHandler}
                            ref={imgRef}/>
                            </>
                        )}

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
                                        <input className="modify-input myintro"
                                               onChange={descriptionHandler}
                                               placeholder={userProfile.description}/>
                                    </div>
                                    <div className="myinfo-box myname-info">
                                        <p>이름</p>
                                        <input className="modify-input myname"
                                               onChange={nameHandler}
                                               placeholder={userProfile.name}/>
                                    </div>
                                    <div className="myinfo-box myuserid-info">
                                        <p>유저 ID</p>
                                        <input className="modify-input myuserid"
                                               onChange={useridHandler}
                                               placeholder={userProfile.userid}/>
                                    </div>
                                    <div className="myinfo-box myemail-info">
                                        <p>이메일</p>
                                        <input className="modify-input myemail"
                                               onChange={emailHandler}
                                               placeholder={userProfile.email}/>
                                    </div>
                                    <div className="myinfo-box mypw-info">
                                        <p>비밀번호</p>
                                        <input className="modify-input mypw"
                                               onChange={passwordHandler}
                                               placeholder={'********'}/>
                                    </div>
                                    <div className="myinfo-box mybirth-info">
                                        <p>생년월일</p>
                                        <input className="modify-input mybirth"
                                               onChange={birthHandler}
                                               placeholder={userProfile.birthDay}/>
                                    </div>

                                </>
                            )}

                        </div>
                    </div>
                    {modifyBtn ? (
                        <>
                            <button className="modifybtn" onClick={modifyBtnHandler}>정보수정</button>
                        </>
                    ) : (
                        <div className="modify-box">
                            <button className="modifybtn" onClick={modifyBtnHandler}>취소</button>
                            <button className="modifybtn" onClick={modifyHandler}>확인</button>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default MyPage;
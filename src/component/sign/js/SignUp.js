import '../scss/SignUp.scss'
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {SIGN_URL} from "../../../config/host-config.js";
import Header from "../../header/js/Header.js";


const SignUp = () => {
    // const API_BASE_URL = SIGN_URL;
    const SIGN_UP_URL = SIGN_URL + "/sign-up";
    const redirection = useNavigate();


    // 이미지 URL을 저장할 상태변수
    const defaultImg = process.env.PUBLIC_URL + '/assets/profile_img.jpg';
    const [imgUrl, setImgUrl] = useState(defaultImg);
    const imgRef = useRef();


    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        name: '',
        email: '',
        password: '',
        birthDay: ''
    });
    // 입력값 검증 메시지를 관리할 상태변수
    const [message, setMessage] = useState({
        password: '',
        passwordCheck: '',
        email: '',
        birthDay: ''
    });

    // 검증 완료 체크에 대한 상태변수 관리
    const [correct, setCorrect] = useState({
        password: false,
        passwordCheck: false,
        email: false,
        birthDay: false
    });

    const saveInputState = (flag, msg, inputVal, key) => {

        setCorrect({
            ...correct,
            [key]: flag
        });

        setMessage({
            ...message,
            [key]: msg
        });

        setUserValue({
            ...userValue,
            [key]: inputVal
        });

    };

    // 이미지 업로드 input의 onChange
    const imgUploadHandler = () => {
        const file = imgRef.current.files?.[0]; // 파일을 가져옴
        if (!file) return;

        // 미리보기 위해 Data URL을 생성 (서버 전송과는 별개)
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImgUrl(imageDataUrl); // 미리보기용으로만 사용

            // 파일 객체는 userValue에 저장하지 않음, 나중에 FormData에 직접 추가
        };
        reader.readAsDataURL(file);
    };

    const nameHandler = (e) => {
        const inputVal = e.target.value;
        setUserValue({...userValue, name: inputVal});
    }

    // 이메일 입력값을 검증하고 관리할 함수
    const emailHandler = (e) => {
        const inputVal = e.target.value;

        const emailRegex = /^[a-zA-Z0-9\.\-_]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/;
        // console.log(inputVal);


        let msg, flag;
        if (!inputVal) {
            msg = '이메일은 필수값입니다!';
            flag = false;
        } else if (!emailRegex.test(inputVal)) {
            msg = '이메일 형식이 아닙니다!';
            flag = false;
        } else {
            // 이메일 중복체크
            msg = '일단 통과';
            flag = true;
            // fetchDuplicatedCheck(inputVal);
        }
        saveInputState(flag, msg, inputVal, 'email');
    };

    // 이메일 중복체크
    // const fetchDuplicatedCheck = async (email) => {
    //
    //     let msg = '', flag = false;
    //
    //     const res = await fetch(EMAIL_URL, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({email})
    //     })
    //     const json = await res.json();
    //     console.log(json);
    //     if (!json) {
    //         msg = '사용 가능한 이메일입니다.';
    //         console.log(email);
    //         flag = true;
    //     } else {
    //         msg = '이메일이 중복되었습니다!';
    //         flag = false;
    //     }
    //     setUserValue({...userValue, email: email});
    //     setMessage({...message, email: msg});
    //     setCorrect({...correct, email: flag});
    // };

    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHandler = e => {

        // 패스워드를 입력하면 확인란을 비우기
        document.getElementById('password-check').value = '';
        document.getElementById('check-text').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});


        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        // 검증 시작
        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = '비밀번호는 필수값입니다!';
            flag = false;
        } else if (!pwRegex.test(inputVal)) {
            msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
            flag = false;
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        saveInputState(flag, msg, inputVal, 'password');
    };

    // 패스워드 확인란을 검증할 함수
    const pwCheckHandler = e => {

        const inputVal = e.target.value;

        let msg, flag;
        if (!inputVal) { // 패스워드 안적은거
            msg = '비밀번호 확인란은 필수값입니다!';
            flag = false;
        } else if (userValue.password !== inputVal) {
            msg = '패스워드가 일치하지 않습니다.';
            flag = false;
        } else {
            msg = '패스워드가 일치합니다.';
            flag = true;
        }


        setMessage({...message, passwordCheck: msg});
        setCorrect({...correct, passwordCheck: flag});
    };



    // 생 입력값을 검증하고 관리할 함수
    const birthdayHandler = (e) => {
        let inputVal = e.target.value.replace(/[^0-9]/g, "").slice(0, 8); // 숫자만 + 최대 8자리
        if (inputVal.length >= 7) {
            inputVal = inputVal.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3");
        } else if (inputVal.length >= 5) {
            inputVal = inputVal.replace(/^(\d{0,4})(\d{0,2})$/g, "$1-$2");
        }
        e.target.value = inputVal;

        // 유효성 체크
        const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
        let msg, flag;

        if (!inputVal) {
            msg = '생일은 필수 값입니다.';
            flag = false;
        } else if (!birthRegex.test(inputVal)) {
            msg = '형식에 맞지 않는 생일입니다.';
            flag = false;
        } else {
            msg = '형식에 맞는 생일값입니다.';
            flag = true;
        }
        saveInputState(flag, msg, inputVal, "birthDay");
    }


    // 계정 생성 버튼을 누르면 동작할 내용
    const joinClickHandler = async (e) => {
        e.preventDefault();

        // 이메일과 다른 입력값들이 올바른지 확인
        if (!correct.password || !correct.passwordCheck || !correct.email || !correct.birthDay) {
            alert('입력란을 다시 확인해주세요!');
            return;
        }

        // fetchSignUpPost를 호출하기 전에 userValue가 올바르게 업데이트되었는지 확인
        await new Promise((resolve) => setTimeout(resolve, 100)); // 약간의 지연시간 추가

        // 회원가입 진행
        fetchSignUpPost();
    };



    // 회원가입 비동기요청을 서버로 보내는 함수
    const fetchSignUpPost = async () => {
        const formData = new FormData();

        // console.log(userValue);

        // 이미지 파일이 있는 경우에만 추가
        const file = imgRef.current.files?.[0];

        if (file) {
            formData.append('profileImg', file); // 파일 객체를 직접 추가
        } else {
            const response = await fetch(defaultImg);
            const blob = await response.blob();
            const defaultFile = new File([blob], 'profile_img.jpg', {type: blob.type});
            formData.append('profileImg', defaultFile);
        }
        // userValue의 각 필드를 FormData에 추가
        formData.append('name', userValue.name);
        formData.append('id', '1234567');
        // formData.append('role', 'admin');
        formData.append('password', userValue.password);
        formData.append('birthDay', userValue.birthDay);

        try {
            const res = await fetch(SIGN_UP_URL, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const json = await res.json();
                console.log(json);
                redirection('/signin'); // 성공 시 리다이렉트
                alert('회원가입이 완료되었습니다!');
            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }
        } catch (error) {
            console.error('회원가입 요청 중 오류 발생:', error);
            alert('회원가입 중 문제가 발생했습니다.');
        }
    };
    return(
        <>
            <Header/>
            <form className="signup-box" onSubmit={fetchSignUpPost} encType="multipart/form-data">
                <div className="signup-container">
                    <div className="signup-box">
                        <div className="profile-box" onClick={() => imgRef.current.click()}>
                            {imgUrl && (
                                <img
                                    className="profile-img"
                                    src={imgUrl}
                                    alt="프로필 미리보기"
                                />
                            )}
                        </div>
                        <input type="file" className="profile-input" accept="image/*"
                               name="imagePath"
                               onChange={imgUploadHandler}
                               ref={imgRef}/>
                        <div className="info-container">
                            <div className="name-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>NAME</p>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text" name="name" onChange={nameHandler}/>
                                </div>
                            </div>
                            <div className="email-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>E-MAIL</p>
                                    <span className={'message'} style={
                                        correct.email
                                            ? {color: '#61DBF0'}
                                            : {color: '#F15F5F'}}>{message.email}</span>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text" name="email"
                                           onChange={emailHandler}
                                           placeholder="ex)abcdef@gmail.com"/>
                                </div>
                            </div>
                            <div className="pw-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>PASSWORD</p>
                                    <span className={'message'} style={
                                        correct.password
                                            ? {color: '#61DBF0'}
                                            : {color: '#F15F5F'}}>{message.password}</span>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="password"
                                           name="password"
                                           id="password"
                                           autoComplete="current-password"
                                           onChange={passwordHandler}
                                           placeholder="ex)abcdef!"/>
                                </div>
                            </div>
                            <div className="ck-pw-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>CHECK_PASSWORD</p>
                                    <span id="check-text" className={'message'} style={
                                        correct.passwordCheck
                                            ? {color: '#61DBF0'}
                                            : {color: '#F15F5F'}}>{message.passwordCheck}</span>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="password"
                                           id="password-check"
                                           autoComplete="check-password"
                                           onChange={pwCheckHandler}
                                           placeholder="check password"/>
                                </div>
                            </div>
                            <div className="bd-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>BIRTHDAY</p>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text"
                                           onChange={birthdayHandler}
                                           placeholder="ex)2025-01-01"/>
                                </div>
                            </div>
                            <div className="signup-btn" onClick={joinClickHandler}>
                                <p className="signup-btn-style">회원가입</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUp;
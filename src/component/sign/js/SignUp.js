import '../scss/SignUp.scss'
import {useRef, useState} from "react";
import Header from "../../header/js/Header.js";



const SignUp = () => {
    // 이미지 URL을 저장할 상태변수
    const defaultImg = process.env.PUBLIC_URL + '/assets/profile_img.jpg';
    const [imgUrl, setImgUrl] = useState(defaultImg);
    const imgRef = useRef();
    imgRef.current.files = undefined;

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

    // 회원가입 비동기요청을 서버로 보내는 함수
    const fetchSignUpPost = async () => {
        const formData = new FormData();

        // console.log(userValue);

        // 이미지 파일이 있는 경우에만 추가
        const file = imgRef.current.files?.[0];

        if (file) {
            formData.append('imageFile', file); // 파일 객체를 직접 추가
        } else {
            const response = await fetch(defaultImg);
            const blob = await response.blob();
            const defaultFile = new File([blob], 'profile_img.jpg', {type: blob.type});
            formData.append('imageFile', defaultFile);
        }
        // userValue의 각 필드를 FormData에 추가
        // formData.append('name', userValue.name);
        // formData.append('nickname', userValue.nickname);
        // formData.append('email', userValue.email);
        // formData.append('password', userValue.password);
        // formData.append('adress', userValue.adress);
        // formData.append('phoneNumber', userValue.phoneNumber);

        // try {
        //     const res = await fetch(SIGN_UP_URL, {
        //         method: 'POST',
        //         body: formData
        //     });
        //
        //     if (res.ok) {
        //         const json = await res.json();
        //         console.log(json);
        //         redirection('/sign_in'); // 성공 시 리다이렉트
        //         alert('회원가입이 완료되었습니다!');
        //     } else {
        //         console.error('응답 상태 코드:', res.status);
        //         alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
        //     }
        // } catch (error) {
        //     console.error('회원가입 요청 중 오류 발생:', error);
        //     alert('회원가입 중 문제가 발생했습니다.');
        // }
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
                                    <input className="info-input-box" type="text"/>
                                </div>
                            </div>
                            <div className="email-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>E-MAIL</p>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text"/>
                                </div>
                            </div>
                            <div className="pw-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>PASSWORD</p>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text"/>
                                </div>
                            </div>
                            <div className="ck-pw-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>CHECK_PASSWORD</p>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text"/>
                                </div>
                            </div>
                            <div className="bd-box signup-info-box">
                                <div className="signup-info-title">
                                    <p>BIRTHDAY</p>
                                </div>
                                <div className="info-input">
                                    <input className="info-input-box" type="text"/>
                                </div>
                            </div>
                            <div className="signup-btn">
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
import Header from "../../../header/js/Header.js";
import '../scss/MyPage.scss'

const MyPage = () => {
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
                                <p>ㄴㄴㄴㄴㄴㄴ</p>
                            </div>
                            <div className="myinfo-box myname-info">
                                <p>이름</p>
                                <div className="myname">s</div>
                            </div>
                            <div className="myinfo-box myid-info">
                                <p>유저ID</p>
                                <div className="myid">JSOEX42X</div>
                            </div>
                            <div className="myinfo-box mybirth-info">
                                <p>생년월일</p>
                                <div className="mybirth">s</div>
                            </div>
                            <div className="myinfo-box mypw-info">
                                <p>비밀번호</p>
                                <div className="mypw">********</div>
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
import '../scss/SignUp.scss'
import Header from "../../header/js/Header.js";



const SignUp = () => {
    return(
        <>
            <Header />
            <div className="signup-container">
                <div className="signup-box">
                    <div className="profile-box">

                    </div>
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
        </>
    )
}

export default SignUp;
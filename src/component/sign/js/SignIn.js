import '../scss/SignIn.scss'
import Header from "../../header/js/Header.js";
import { AiTwotoneFrown } from "react-icons/ai";


const SignIn = () => {
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
                                <input className="signin-input-box" type="text"/>
                            </div>
                        </div>
                        <div className="pw-box signin-info-box">
                            <div className="signin-info-title">
                                <p>PASSWORD</p>
                            </div>
                            <div className="info-input">
                                <input className="signin-input-box" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="signin-btn">
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
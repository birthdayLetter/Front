import Header from "../../../header/js/Header.js";
import '../scss/CheckPw.scss'

const CheckPw = () => {
    return(
        <>
            <Header/>
            <div className="checkpw-container">
                <div className="checkpw-box">
                    <p>PASSWORD</p>
                    <input type="password" />
                </div>
            </div>
        </>
    )
}

export default CheckPw;
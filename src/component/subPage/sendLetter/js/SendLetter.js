import {useState} from "react";
import {LETTER_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import '../scss/SendLetter.scss'

const SendLetter = () => {
    const SEND_LETTER_URL = LETTER_URL + '/send';
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const tokenToUse = sessionToken || localToken;
    const [content, setContent] = useState();
    const [userid, setUserid] = useState();

    const useridHandler = (e) => {
        const inputVal = e.target.value;
        setUserid(inputVal);
    }

    const contentHandler = (e) => {
        const inputVal = e.target.value;
        setContent(inputVal);
    }


    const sendletterClick = async () => {

        const res = await fetch(SEND_LETTER_URL, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': tokenToUse,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fromUser:{userid}, // 나 (안됨 애초에 userId가 없음 토큰으로 해야함
                content:{content}
            })
        });
        if (res.ok) {
            const json = await res.json();
            console.log(json);
            // redirection('/friend');
        } else {
            console.error('응답 상태 코드:', res.status);
            alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
        }
    }

    return(
        <>
            <Header/>
            <div className="sendletter-container">
                <div className="sendletter-box">
                    <input type="text" placeholder="친구 아이디" className="recive-user" onChange={useridHandler}/>
                    <input type="text" className="send-input" onChange={contentHandler}/>
                    <button className="send-letter-button" onClick={sendletterClick}>보내기</button>
                </div>
            </div>
        </>
    )
}

export default SendLetter;
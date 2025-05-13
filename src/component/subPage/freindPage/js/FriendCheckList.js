import '../scss/FriendCheckList.scss'
import {useEffect, useRef} from "react";
import {redirect, useNavigate} from "react-router-dom";
import {FRIEND_URL, USER_URL} from "../../../../config/host-config.js";

const FriendCheckList =  () => {
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const tokenToUse = sessionToken || localToken;
    const FRIEND_APPLY_URL = FRIEND_URL + '/apply';
    const didAlert = useRef(false);
    const redirection = useNavigate();


    // useEffect(() => {
    //     if (didAlert.current) return; // 이미 알럿했으면 무시
    //     didAlert.current = true;       // 알럿했다 표시
    //
    // }, [acceptFriend]);

    // 나에게 들어온 친구요청 "수락" 기능
    // 나에게 들어온 친구요청 "취소, 삭제" 기능이 없음!!!!!!
    const acceptFriend = async () => {

        const res = await fetch(FRIEND_APPLY_URL, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': tokenToUse,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // fromUserId:{fromUserId}, // 수락하는 나
                // toUserId:{toUserId} // 나에게 요청보낸 친구
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

    return (
        <li className="fr-ck-list">
            <div className="fr-ck-box">
                <div className="fr-ck-profile"></div>
                <div className="fr-ck-info">
                    <div className="fr-ck-name">홍길동</div>
                    <div className="fr-ck-des">안뇽</div>
                </div>
            </div>
            <button className="fr-check" onClick={acceptFriend}>accept</button>
            <button className="fr-cancel">cancel</button>
        </li>
    )
}

export default FriendCheckList;
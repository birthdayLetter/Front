import '../scss/LetterDetail.scss'
import {useEffect, useRef, useState} from "react";
import {LETTER_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import { useParams } from 'react-router-dom';
import LetterDetailList from "./LetterDetailList.js";
import LetterList from "./LetterList.js";


const LetterDetail = () => {
    const { year } = useParams(); // URL에서 연도 받기
    const SEARCH_LETTER_URL = LETTER_URL + '/search'

    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const tokenToUse = sessionToken || localToken;
    const didAlert = useRef(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [letter, setLetter] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 15;
    const displayedLetterDetailList = letter.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    useEffect(() => {
        if (didAlert.current) return; // 이미 알럿했으면 무시
        didAlert.current = true;       // 알럿했다 표시
        // 로그인 상태 확인 로직 (localStorage 또는 서버 API 호출)
        if (tokenToUse) {
            setIsLoggedIn(true);
        }
        fetchGetList();
    }, []);

    const fetchGetList = async () => {
        try {

            const res = await fetch(SEARCH_LETTER_URL + `/${year}`, {
                method: 'GET',
                headers: {
                    'X-AUTH-TOKEN': `${tokenToUse}`, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                if (json) {
                    console.log(json);
                    setLetter(json);
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }


    return(
        <>
            <Header />
            <div className="yletter-container">
                <ul className="yletter-box">
                    {displayedLetterDetailList.map((item, index) => (
                        <LetterDetailList
                            key={index}
                            content={item.content}
                            fromUser={item.fromUser}
                            toUser={item.toUser}
                            date={item.date}
                        />
                    ))}
                </ul>
            </div>
        </>
        )
}

export default LetterDetail;
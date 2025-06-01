import '../scss/Main.scss'
import {useEffect, useRef, useState} from "react";
import {LETTER_URL} from "../../../config/host-config.js";
import Header from "../../header/js/Header.js";
import LetterList from "../../subPage/detailPage/js/LetterList.js";



const Main = () => {
    const MAIN_LETTER_URL = LETTER_URL + '/letter/main'
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const didAlert = useRef(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const tokenToUse = sessionToken || localToken;
    const [page, setPage] = useState(1);
    const itemsPerPage = 15;
    const [mainList, setMainList] = useState([]);
    const displayedLetterList = mainList.slice(
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
        fetchGetLetter();
    }, []);

    const fetchGetLetter = async () => {

        try {

            const res = await fetch(MAIN_LETTER_URL, {
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
                }
            }
        } catch (error) {
            console.error("Error fetching upcycle posts:", error);
        }
    }
    return(
        <>
            <Header/>
            <div className="main-container">
                <div className="letter-container">
                    <ul className="letter-row">
                        {/*{displayedLetterList.map((boards, index) => (*/}
                        {/*    <Upcycle_content*/}
                        {/*        key={index}*/}
                        {/*        id={boards.id}*/}
                        {/*        thumbnailUrl={boards.thumbnailUrl}*/}
                        {/*        title={boards.title}*/}
                        {/*        content={boards.content}*/}
                        {/*        author={boards.author}*/}
                        {/*        likeScore={boards.likeScore}*/}
                        {/*        tag={boards.tag}*/}
                        {/*        createdDate={boards.createdDate}*/}
                        {/*    />*/}
                        {/*))}*/}
                        <LetterList />
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Main;
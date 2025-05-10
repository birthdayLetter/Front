import '../scss/Friend.scss';
import {useEffect, useRef, useState} from "react";
import {FRIEND_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import FriendList from "../js/FriendList.js";
import { HiSearch } from "react-icons/hi";
import {BsPersonFillAdd, BsPersonFillCheck} from "react-icons/bs";

const Friend = () => {
    const FRIEND_SEARCH_URL = FRIEND_URL + '/search';
    const FRIEND_LIST_URL = FRIEND_URL + '/list';
    const FRIEND_CHECK_URL = FRIEND_URL + '/list/pending';
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const didAlert = useRef(false);
    const [friendList, setFriendList] = useState([]);
    const [friendCheckList, setFriendCheckList] = useState([]);
    const displayFriendList = friendList.slice(
        // (page - 1) * itemsPerPage,
        // page * itemsPerPage
    );
    const displayFrCheckList = friendCheckList.slice(
        // (page - 1) * itemsPerPage,
        // page * itemsPerPage
    );
    const [addModal, setAddModal] = useState(false);
    const [checkModal, setCheckModal] = useState(false);
    const modalBackground = useRef();
    const [frInput, setFrInput] = useState();

    useEffect(() => {
        if (didAlert.current) return; // 이미 알럿했으면 무시
        didAlert.current = true;       // 알럿했다 표시
        // const tokenToUse = sessionToken || localToken;
        // console.log(tokenToUse);
        fetchFriendList();
    }, []);


    const friendAddClick = () => {
        setAddModal(true);
    }

    const friendCheckClick = () => {
        setCheckModal(true);
        fetchCheckFriend();
    }

    const searchFrInput = (e) => {
        const inputVal = e.target.value;
        setFrInput(inputVal);
    }
    
    // 친구 리스트 불러오기 기능
    const fetchFriendList = async () => {
        const tokenToUse = sessionToken || localToken;

            const res = await fetch(FRIEND_LIST_URL, {
                method: 'GET',
                headers: {
                    'X-AUTH-TOKEN': tokenToUse, // 인증 헤더 추가
                    'Content-Type': 'application/json',
                },
            })
            const json = await res.json();
            // console.log(json);
            if (res.ok) {
                console.log(json);
                setFriendList(json);

            } else {
                console.error('응답 상태 코드:', res.status);
                alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
            }
    }

    // 친구요청 확인 기능
    const fetchCheckFriend = async() => {
        const tokenToUse = sessionToken || localToken;
        const res = await fetch(FRIEND_CHECK_URL, {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': tokenToUse, // 인증 헤더 추가
                'Content-Type': 'application/json',
            },
        })
        const json = await res.json();
        // console.log(json);
        if (res.ok) {
            console.log(json);
            setFriendCheckList(json);

        } else {
            console.error('응답 상태 코드:', res.status);
            alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
        }
    }

    // 친구 찾기 기능
    const searchFreind = async () => {

        const res = await fetch(`${FRIEND_SEARCH_URL}?seachParam=${frInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
        const json = await res.json();
        // console.log(json);
        if (res.ok) {
            console.log(json);

        } else {
            console.error('응답 상태 코드:', res.status);
            alert('서버와의 통신이 원활하지 않습니다. 상태 코드: ' + res.status);
        }
    }

    return (
        <>
            <Header/>
            <div className="friend-container">
                <div className="friend-header">
                    <div className="friend-search">
                        <input type="text" className="search-input" placeholder="친구 이름"/>
                        <HiSearch className='friend-icon'/>
                    </div>
                    <div className="friend-add">
                        <BsPersonFillAdd className='friend-icon' onClick={friendAddClick}/>
                        <BsPersonFillCheck className='friend-icon' onClick={friendCheckClick}/>
                    </div>
                </div>
                <ul className="friend-list">

                    {displayFriendList.map((boards, index) => (
                        <FriendList
                            key={index}
                            id={boards.id}
                            thumbnailUrl={boards.thumbnailUrl}
                        //     title={boards.title}
                        //     content={boards.content}
                        //     author={boards.author}
                        //     likeScore={boards.likeScore}
                        //     tag={boards.tag}
                        //     createdDate={boards.createdDate}
                        />
                    ))}

                    <FriendList/>

                </ul>

            </div>
            {
                addModal &&
                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setAddModal(false);
                    }
                }}>
                    <div className={'modal-content'}>
                        <div className="add-modal-header">
                            <p className="modal-title">친구 찾기</p>
                            {/*<button className={'modal-close-btn'} onClick={() => setModal(false)}>*/}
                            {/*    모달 닫기*/}
                            {/*</button>*/}
                            <div className="search-friend">
                                <input type="text" className="fr-code-input" placeholder="친구 코드" onChange={searchFrInput}/>
                                <HiSearch className='search-icon' onClick={searchFreind}/>
                            </div>
                        </div>
                        <div className="modal-friend-container">
                            <div className="fr-box">
                                <div className="fr-profile"></div>
                                <div className="fr-info">
                                    <div className="fr-name">홍길동</div>
                                    <div className="fr-des">안뇽</div>
                                </div>
                            </div>
                            <button className="fr-send">add+</button>
                        </div>
                    </div>
                </div>
            }

            {
                checkModal &&
                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setCheckModal(false);
                    }
                }}>
                    <div className={'modal-content'}>
                        <div className="check-modal-header">
                            <p className="modal-title">친구 요청</p>
                        </div>
                        <ul>
                            {displayFrCheckList.map((boards, index) => (
                                <FriendList
                                    key={index}
                                    id={boards.id}
                                    thumbnailUrl={boards.thumbnailUrl}
                                    //     title={boards.title}
                                    //     content={boards.content}
                                    //     author={boards.author}
                                    //     likeScore={boards.likeScore}
                                    //     tag={boards.tag}
                                    //     createdDate={boards.createdDate}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            }

        </>
    )
}

export default Friend;
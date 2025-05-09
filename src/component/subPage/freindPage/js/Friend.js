import '../scss/Friend.scss';
import {useRef, useState} from "react";
import {FRIEND_URL} from "../../../../config/host-config.js";
import Header from "../../../header/js/Header.js";
import FriendList from "../js/FriendList.js";
import { HiSearch } from "react-icons/hi";
import { BsPersonPlusFill } from "react-icons/bs";

const Friend = () => {
    const FRIEND_SEARCH_URL = FRIEND_URL + '/search';
    const [modal, setModal] = useState(false);
    const modalBackground = useRef();
    const [frInput, setFrInput] = useState();

    const friendAddClick = () => {
        setModal(true);


    }

    const searchFrInput = (e) => {
        const inputVal = e.target.value;
        setFrInput(inputVal);
    }

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
                        <BsPersonPlusFill className='friend-icon' onClick={friendAddClick}/>
                    </div>
                </div>
                <ul className="friend-list">

                    <FriendList/>

                </ul>

            </div>
            {
                modal &&
                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModal(false);
                    }
                }}>
                    <div className={'modal-content'}>
                        <div className="modal-header">
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

            {/*<div className="modal-container">*/}
            {/*    <div className="friend-add-modal">*/}

            {/*    </div>*/}
            {/*</div>*/}

        </>
    )
}

export default Friend;
import '../scss/FriendList.scss';

const FriendList = () => {

    // 친구리스트 정렬 Friend.js에서 데이터를 하나하나씩 받아와서 뿌려줌
    return (
        <li className="friend-list-container">
            <div className="fr-box">
                <div className="fr-profile">    </div>
                <div className="fr-info">
                    <div className="fr-name">홍길동</div>
                    <div className="fr-des">안뇽</div>
                </div>
            </div>
            <button className="fr-send">send+</button>
        </li>
    )
}
export default FriendList;
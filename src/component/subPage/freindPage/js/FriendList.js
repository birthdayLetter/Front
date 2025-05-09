import '../scss/FriendList.scss';

const FriendList = () => {
    return (
        <>
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
        </>
    )
}
export default FriendList;
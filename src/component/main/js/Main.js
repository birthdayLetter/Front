import '../scss/Main.scss'
import Header from "../../header/js/Header.js";
import LetterList from "../../subPage/detailPage/js/LetterList.js";



const Main = () => {
    return(
        <>
            <Header/>
            <div className="main-container">
                <div className="letter-container">
                    <ul className="letter-row">
                        <LetterList />
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Main;
import '../scss/LetterList.scss'
import {Link} from "react-router-dom";

const LetterList = ({year}) => {
    return(
        <>
            <li className="letter-box">
                <Link to={`/letter/${year}`} className="letter-link">
                <p>{year}</p>
                <div className="letter-design1">

                </div>
                <div className="letter-design-box">
                    <div className="letter-design2">

                    </div>
                    <div className="letter-design2">

                    </div>
                    <div className="letter-design2">

                    </div>
                </div>
                </Link>
            </li>
        </>
    )
}

export default LetterList;
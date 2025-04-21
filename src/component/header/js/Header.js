import '../scss/Header.scss';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { slide as Menu } from 'react-burger-menu'
import {Link} from "react-router-dom";

const Header = () => {

    function isMenuOpen(e) {

    }
    return(
        <>
            <div id="header">
                <div className="header">
                    <div className="hbMenu-container">
                        <Menu customBurgerIcon={<RxHamburgerMenu />} customCrossIcon={ <RxCross2 /> }>
                            <div className="menuBox">
                                <Link to='/' id="home" className="menu-item">Home</Link>
                                <p id="freind" className="menu-item">Freind</p>
                                <Link to='/signin' id="signin" className="menu-item">Sign-in</Link>
                                <Link to='/signup' id="signup" className="menu-item">Sign-up</Link>
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
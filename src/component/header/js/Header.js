import '../scss/Header.scss';
import { RxHamburgerMenu } from "react-icons/rx";
import { slide as Menu } from 'react-burger-menu'

const Header = () => {

    function isMenuOpen(e) {

    }
    return(
        <>
            <div id="header">
                <div className="header">
                    <div className="hbMenu-container">
                        <Menu customBurgerIcon={<RxHamburgerMenu className="hbMenuBtn"/>}>
                            <p id="home" className="menu-item" href="/">Home</p>
                            <p id="about" className="menu-item" href="/about">About</p>
                            <p id="contact" className="menu-item" href="/contact">Contact</p>
                        </Menu>
                    </div>
                </div>
            </div>


            {/*<div className="hbMenu-container">*/}
            {/*    <Menu onStateChange={isMenuOpen}>*/}
            {/*        <a id="home" className="menu-item" href="/">Home</a>*/}
            {/*        <a id="about" className="menu-item" href="/about">About</a>*/}
            {/*        <a id="contact" className="menu-item" href="/contact">Contact</a>*/}
            {/*    </Menu>*/}
            {/*    /!*<div className="hbMenu-box">*!/*/}
            {/*    /!*    <p className="hbMenu-name">Home</p>*!/*/}
            {/*    /!*    <p className="hbMenu-name">MyPage</p>*!/*/}
            {/*    /!*    <p className="hbMenu-name">Friend</p>*!/*/}
            {/*    /!*    <p className="hbMenu-name">Login</p>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
        </>
    )
}

export default Header;
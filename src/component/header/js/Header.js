import '../scss/Header.scss';
import {useEffect, useState} from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { slide as Menu } from 'react-burger-menu'
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const redirection = useNavigate();

    useEffect(() => {

        if (localToken === null && sessionToken === null) {
            setIsLoggedIn(true);
        }

    }, []);

    const handleLogout = () => {
        // localStorage를 비웁니다.
        localStorage.clear();
        sessionStorage.clear();

        // 로그아웃 후 리다이렉션 (예: 로그인 페이지)
        redirection('/signin');
    };

    return(
        <>
            <div id="header">
                <div className="header">
                    <div className="hbMenu-container">
                        <Menu customBurgerIcon={<RxHamburgerMenu />} customCrossIcon={ <RxCross2 /> }>
                            <div className="menuBox">
                                <Link to='/' id="home" className="menu-item">Home</Link>
                                <p id="freind" className="menu-item">Freind</p>
                                <p id="freind" className="menu-item">Send-Letter</p>
                                {isLoggedIn ? (
                                    <>
                                        <Link to='/signin' id="signin" className="menu-item">Sign-in</Link>
                                        <Link to='/signup' id="signup" className="menu-item">Sign-up</Link>
                                    </>
                                        ) : (
                                            <>
                                        <Link to='/checkpw' id="signin" className="menu-item">MyPage</Link>
                                        <div onClick={handleLogout} className="menu-item">
                                            <span>로그아웃</span>
                                        </div>
                                            </>
                                    )
                                }
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
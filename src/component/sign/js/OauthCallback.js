import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch('http://localhost:8080/sign-api/kakao/auth/oauth-token', {
                method: 'GET',
                credentials: 'include', // 세션 쿠키 가져오기 위해
            });
            const data = await response.json();
            localStorage.setItem('ACCESS_TOKEN', data.token);

            // 이후 메인 페이지로 이동
            navigate('/');
        };

        fetchToken();
    }, []);

    return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;

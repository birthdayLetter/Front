const clientHostName = window.location.hostname;
console.log('client : ', clientHostName);

const LOCAL_PORT = '8080';
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const LOCATION_URL = 'http://localhost:3000';

const SIGN = '/sign-api';
const SIGN_KAKAO = '/sign-api/kakao';
const USER = '/user/profile';
const FRIEND = '/friend';
const LETTER = '/api/letter'


export const SIGN_URL = API_BASE_URL + SIGN;
export const SIGN_KAKAO_URL = API_BASE_URL + SIGN_KAKAO;
export const USER_URL = API_BASE_URL + USER;
export const FRIEND_URL = API_BASE_URL + FRIEND;
export const LETTER_URL = API_BASE_URL + LETTER;
export  const REDIRECT_URI=`http://localhost:3000/sign_in`;
export  const REST_API_KEY=`e140120f18ebca253dc9456e7b42857e`;
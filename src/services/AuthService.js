import { post } from './ApiClient';

export function login(credentials) {
    console.log(45545);
    localStorage.setItem('isLogedIn',true);
}

export function logOut(credentials) {
    localStorage.setItem('isLogedIn',false)
}

export function isLodegIn() {
    console.log("%c IS LOGED IN  :  " + !!localStorage.getItem('isLogedIn'));
    return localStorage.getItem('isLogedIn') == 'true';
}

export function user() {
    return {
        firstName:'Kobe',
        lastName:'Bryant',
        email:'Bryant@htmail.com',
        avatar:'https://notednames.com/ImgProfile/lok_Kobe%20Bryant.jpg',
        role:'admin',
    }
}
//
// export const login = (username, password) => {
//     post('/session', {
//         username, password
//     })
// };
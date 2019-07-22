import { post } from './ApiClient';

export function login(credentials) {
    localStorage.setItem('isLogedIn',true);
}

export function logOut(credentials) {
    localStorage.setItem('isLogedIn',false)
}

export function isLodegIn() {
    return localStorage.getItem('isLogedIn') == 'true';
}
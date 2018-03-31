import axios from 'axios';

export function getdata() {
    return axios.get('http://localhost:3000/api');
}
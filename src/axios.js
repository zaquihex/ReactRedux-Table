import axios from 'axios';
//Axios created to have the base of the api by default
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org'
});

export default instance;
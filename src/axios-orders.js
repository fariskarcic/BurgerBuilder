import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-407d1.firebaseio.com/'
});

export default instance;
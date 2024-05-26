import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER
});

// Добавляем параметр ngrok-skip-browser-warning в заголовки каждого запроса
instance.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

export default instance;

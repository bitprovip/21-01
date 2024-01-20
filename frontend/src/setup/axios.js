import axios from 'axios';
import {toast} from 'react-toastify';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.defaults.withCredentials = true;

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

instance.interceptors.request.use(function(config){

    return config;
},function(error){
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    const status = (error && error.response && error.response.status) || 500;
    switch(status){
        case 401: {
            // toast.error(`Bạn phải đăng nhập để sử dụng chức năng này`);
            return error.response.data;
        }
        case 403: {
            toast.error(`Bạn ko có quyền truy cập vào link này`);
            return Promise.reject(error);
        }
        case 400: {
            return Promise.reject(error);
        }
        case 404: {
            return Promise.reject(error);
        }
        case 409: {
            return Promise.reject(error);
        }
        case 422: {
            return Promise.reject(error);
        }
        default: {
            return Promise.reject(error);
        }
    }
});


export default instance;
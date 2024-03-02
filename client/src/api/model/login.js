import http from '../index.js'
export const loginApi = (params) => {
    return http.post(  `/user/login`, params, {
        headers: { noLoading: true },
    });
};
export const registerApi = (params) => {
    return http.post(  `/user/register`, params, {
        headers: { noLoading: true },
    });
};
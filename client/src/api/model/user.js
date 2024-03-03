import http from '../index.js'
export const userDelApi = (userId) => {
    return http.delete(  `/user/delete`,{userId});
};
export const userListApi = (params) => {
    return http.get(  `/user/list`,params);
};
export const userDetailApi = (params) => {
    return http.get(  `/user/detail`,params);
};
export const userUpdateApi = (params) => {
    return http.post(  `/user/update`,params);
};
import http from '../index.js'
export const expressAddApi = (params) => {
    return http.post(  `/express/add`,params);
};
export const expressDelApi = (id) => {
    return http.delete(  `/express/delete`,{id});
};
export const expressListApi = (params) => {
    return http.get(  `/express/list`,params);
};
export const expressDetailApi = (params) => {
    return http.get(  `/express/detail`,params);
};
export const expressUpdateApi = (params) => {
    return http.post(  `/express/update`,params);
};
import http from '../index.js'
export const home1Api = (params) => {
    return http.get(  `/home/home1`,params);
};
export const home2Api = (params) => {
    return http.get(  `/home/home2`,params);
};
export const home3Api = (params) => {
    return http.get(  `/home/home3`,params);
};
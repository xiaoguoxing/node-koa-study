import http from '../index.js'
export const sysDictListApi = (params) => {
    return http.get(  `/sys/dict/list`,params);
};
export const sysDictChildListApi = (params) => {
    return http.get(  `/sys/dict/childList`,params);
};
export const sysDictAddApi = (params={}) => {
    return http.post(  `/sys/dict/add`,params);
};
export const sysDictChildAddApi = (params) => {
    return http.post(  `/sys/dict/addChild`,params);
};
export const sysDictDelApi = (id) => {
    return http.delete(  `/sys/dict/del`,{id});
};
export const sysDictDelChildApi = (params) => {
    return http.delete(`/sys/dict/deleteChild`,params);
};
export const sysDictDetailApi = (key) => {
    return http.get(  `/sys/dict/detail`,{key});
};
export const sysDictUpdateChildApi = (params={}) => {
    return http.post(  `/sys/dict/updateChild`,params);
};
export const sysDictUpdateApi = (params={}) => {
    return http.post(  `/sys/dict/update`,params);
};
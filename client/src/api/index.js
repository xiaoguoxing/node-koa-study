import axios from 'axios';
import {showFullScreenLoading, tryHideFullScreenLoading} from '@/config/serviceLoading';
import {checkStatus} from './helper/checkStatus';
import {ElMessage} from 'element-plus';
import router from '@/routers';
import qs from 'qs';

const ResultEnum = {
    SUCCESS: 200,
    ERROR: 500,
    OVERDUE: 10000,
    TIMEOUT: 10000,
    TYPE: 'success'
}
/**
 * pinia 错误使用说明示例
 * https://github.com/vuejs/pinia/discussions/971
 * https://github.com/vuejs/pinia/discussions/664#discussioncomment-1329898
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
 */

const config = {
    // 默认地址请求地址，可在 .env 开头文件中修改
    baseURL: import.meta.env.VITE_API_URL||'/api',
    // 设置超时时间（10s）
    timeout: ResultEnum.TIMEOUT,
    // 跨域时候允许携带凭证
    withCredentials: true,
};

class RequestHttp {
    service;

    constructor(config) {
        // 实例化axios
        this.service = axios.create(config);

        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config) => {
                //get方式请求对参数进行序列化
                if (config.method === 'get') {
                    config.paramsSerializer = function (params) {
                        return qs.stringify(params, {
                            arrayFormat: 'indices',
                            allowDots: true,
                        });
                    };
                }
                //TODO:
                //post/put等方式对参数进行处理？

                // const globalStore = GlobalStore();
                // * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
                config.headers.noLoading || showFullScreenLoading();
                // 公共请求头：登录标识：token,当前租户：currDs,当前组织：currOrg
                // const token = globalStore.token;
                // const currDs = globalStore.currDs;
                // const currOrg = globalStore.currOrg;
                const common = {
                    // jwt_token: token,
                    // DYNAMIC_DATA_SOURCE: currDs,
                    // DYNAMIC_AGENT_ORG: currOrg,
                };
                return {...config, headers: {...config.headers, common: common}};
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response) => {
                const {data} = response;
                /*const globalStore = GlobalStore();
                if (response.headers.jwt_token) {
                    globalStore.setToken(response.headers.jwt_token);
                }
                if (response.headers.skip_sign) {
                    localStorage.setItem('SKIP_SIGN', response.headers.skip_sign);
                }
                if (response.headers.dynamic_data_source) {
                    globalStore.setCurrDs(response.headers.dynamic_data_source);
                }
                if (response.headers.dynamic_agent_org) {
                    globalStore.setCurrOrg(response.headers.dynamic_agent_org);
                }*/
                // * 在请求结束后，并关闭请求 loading
                tryHideFullScreenLoading();
                // * 登陆失效（code == 599）
                if (data.code == ResultEnum.OVERDUE) {
                    ElMessage.error(data.description);
                    //localStorage.clear();//不使用的原因：这样也会清除掉用户的自定义设置布局样式等
                    // globalStore.setToken('');
                    // globalStore.setCurrDs('');
                    // globalStore.setCurrOrg('');
                    router.replace('/login');
                    return Promise.reject(data);
                }
                // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if (data.code && data.code !== ResultEnum.SUCCESS) {
                    ElMessage.error(data.description);
                    return Promise.reject(data);
                }
                // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
                return data;
            },
            async (error) => {
                const {response} = error;
                tryHideFullScreenLoading();
                // 请求超时单独判断，因为请求超时没有 response
                if (error.message.indexOf('timeout') !== -1) ElMessage.error('请求超时！请您稍后重试');
                // 根据响应的错误状态码，做不同的处理
                if (response) checkStatus(response.status);
                // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
                if (!window.navigator.onLine) router.replace('/500');
                return Promise.reject(error);
            }
        );
    }

    // * 常用请求方法封装
    get(url, params, _object = {}) {
        return this.service.get(url, {params, ..._object});
    }

    post(url, params, _object = {}) {
        return this.service.post(url, params, _object);
    }

    put(url, params, _object = {}) {
        return this.service.put(url, params, _object);
    }

    delete(url, params, object = {}) {
        return this.service.delete(url, {params, ...object});
    }
}

export default new RequestHttp(config);

import { createRouter, createWebHashHistory } from 'vue-router';

import { staticRouter } from '@/routers/modules/staticRouter';
import localRouter from '@/assets/js/dynamicRouter.js'
// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue');
//白名单
const whiteList = ['/login', '/register'];
function getFlatArr(menuList) {
  let newMenuList= JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre, current) => {
    let flatArr = [...pre, current];
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
}

/**
 * @description 动态路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
let flatMenuListGet = getFlatArr(localRouter)

flatMenuListGet.forEach((item) => {
  item.children && delete item.children;
  if (item.component) {
    item.component = modules['/src/views' + item.component + '.vue'];
  }
  if (item.meta.isFull) {
    router.addRoute(item);
  } else {
    router.addRoute('layout', item);
  }
})
router.beforeEach(async (to, from, next) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  // 2.动态设置标题
  document.title = to.meta.title ? `${to.meta.title} - 快递收发系统` : '快递收发系统';


  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if(to.path==='/login'){
    return next()
  }else {
    if(userInfo?.userId){
      next();
    }else {
      next('/login');
    }
  }

});



export default router;

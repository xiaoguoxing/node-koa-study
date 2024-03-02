import KoaRouter from "koa-router";
import user_controller from '../../app/controllers/user.js'
const user = new KoaRouter({prefix:'/user'})
user.post('/register',user_controller.register);
// router.get('/get', user_controller.get);
// router.post('/post', user_controller.post);
user.post('/login', user_controller.login);
// router.post('/update/user', user_controller.updateUserInfo);
export const User = user
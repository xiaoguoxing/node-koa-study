import KoaRouter from "koa-router";
import user_controller from '../../app/controllers/user.js'
const user = new KoaRouter({prefix:'/user'})
user.post('/register',user_controller.register);
user.post('/login', user_controller.login);
user.delete('/delete', user_controller.delete);
user.post('/update', user_controller.update);
user.get('/list', user_controller.list);
user.get('/detail', user_controller.detail);
export const User = user
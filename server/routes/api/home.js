import KoaRouter from "koa-router";
import home_controller from '../../app/controllers/home.js'
const home = new KoaRouter({prefix:'/home'})

home.get('/home1', home_controller.home1);

home.get('/home2', home_controller.home2);

home.get('/home3', home_controller.home3);

export const Home = home
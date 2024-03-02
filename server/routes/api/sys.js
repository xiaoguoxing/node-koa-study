import KoaRouter from "koa-router";
import sys_controller from '../../app/controllers/sys.js'
const sys = new KoaRouter({prefix:'/sys/dict'})

sys.post('/add', sys_controller.add);
sys.post('/addChild', sys_controller.addChild);

sys.delete('/del', sys_controller.delete);
sys.delete('/deleteChild', sys_controller.deleteChild);

sys.post('/update', sys_controller.update);
sys.post('/updateChild', sys_controller.updateChild);

sys.get('/list',sys_controller.list);
sys.get('/childList',sys_controller.childList);

sys.get('/detail',sys_controller.detail);
export const Sys = sys
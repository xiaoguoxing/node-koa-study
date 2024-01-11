import Koa from 'koa'
import KoaRouter from 'koa-router'
import mongoose from 'mongoose'
import config from "./config.js";
const app = new Koa()
const router = new KoaRouter()



async function connectDB() {
 return   await mongoose.connect(config.db);
}
connectDB().then((err) => {
    console.log('Connecting database successfully');
}).catch((err) => {
    console.error('Failed to connect to database');
})













router.get('/',(ctx,next)=>{
    ctx.body = '根'
    next();
});
router.get('/home',(ctx,next)=>{
    ctx.body = 'home'
    next();
});
router.get('/user', (ctx, next) => {
    ctx.body = 'user';
    next();
});
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000,()=>{
    console.log('up!!!!!!!');
});

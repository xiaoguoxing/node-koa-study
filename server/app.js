import Koa from 'koa'
import KoaRouter from 'koa-router'

const app = new Koa()
const router = new KoaRouter()

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

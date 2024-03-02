import Koa from 'koa'
import KoaRouter from 'koa-router'
import mongoose from 'mongoose'
import KoaBodyParser from 'koa-bodyparser'
import config from "./config.js";
import installRouter from "./routes/index.js";

const app = new Koa()
const router = new KoaRouter()


async function connectDB() {
    return await mongoose.connect(config.db);
}

connectDB().then((err) => {
    console.log('Connecting database successfully');
}).catch((err) => {
    console.error('Failed to connect to database');
})

app.use(KoaBodyParser());

installRouter(app)

app.listen(config.port, () => {
    console.log('fucking!!!!!!!');
});

import KoaRouter from "koa-router";
import express_controller from '../../app/controllers/express.js'
const express = new KoaRouter({prefix:'/express'})

express.post('/add', express_controller.add);

express.delete('/delete', express_controller.delete);

express.post('/update', express_controller.update);

express.get('/list',express_controller.list);

express.get('/detail',express_controller.detail);
export const Express = express
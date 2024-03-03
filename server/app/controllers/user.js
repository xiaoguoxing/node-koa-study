import User_col from '../models/user.js'
import {v1 as uuidV1} from 'uuid'
export default {
    async login(ctx){
        const req = ctx.request.body;
        const user = await User_col.findOne({
            username: req.username,
            password: req.password,
        });
        if(!user){
            ctx.body = {
                code:500,
                description:'登录失败，用户名或者密码错误！'
            }
            return
        }
        ctx.body = {
            code:200,
            data:user,
            description:'登录成功'
        }
    },
    async register(ctx){
        const req = ctx.request.body;
        const user = await User_col.findOne({
            username: req.username
        });
        if (user) {
            ctx.body = {
                code: 500,
                description: '用户名重复！'
            }
            return;
        }
        const userId = uuidV1();
        const newUser = await User_col.create({
            userId,
            username: req.username,
            password:req.password,
            isAdmin:false
        });
        if(newUser){
            ctx.body = {
                code:200,
                data:newUser,
                description:'注册成功'
            }
        }else {
            ctx.body = {
                code:500,
                data:req,
                description:'注册失败'
            }
        }

    },
    async delete(ctx){
        const req = ctx.request.query;
        let type = await User_col.findOneAndDelete(
            {userId: req.userId}
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '删除成功'
        }
    },
    async update(ctx){
        const req = ctx.request.body;
        let type = await User_col.findOneAndUpdate(
            {userId: req.userId},
            req
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '修改成功'
        }
    },
    async detail(ctx){
        const req = ctx.request.query;
        let type = await User_col.findOne(
            {userId: req.userId}
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '删除成功'
        }
    },
    async list(ctx){
        const req = ctx.request.query;
        const user = await User_col.find({
            username: new RegExp(req.username),
        });
        ctx.body = {
            code:200,
            data:user,
            description:'查询列表成功'
        }
    },
}
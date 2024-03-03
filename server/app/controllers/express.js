import express_col from '../models/express.js'
import {v1 as uuidV1} from 'uuid'

export default {
    async add(ctx) {
        const req = ctx.request.body;
        const {user_id} = ctx.headers
        await express_col.create({
            id: uuidV1(),
            expressId: Math.round(Math.random()*9999999999)+'',
            ...req,
            addUserId:user_id,
            addTime:Date.now()
        });
        ctx.body = {
            code: 200,
            data: null,
            description: '新增成功'
        }
    },

    async delete(ctx) {
        const req = ctx.request.query;
        let type = await express_col.findOneAndDelete(
            {id: req.id}
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '删除成功'
        }
    },

    async update(ctx) {
        const req = ctx.request.body;
        let type = await express_col.findOneAndUpdate(
            {id: req.id},
            req
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '修改成功'
        }
    },

    async list(ctx) {
        const req = ctx.request.query;
        const {user_id} = ctx.headers
        const total = await express_col.countDocuments()
        const list = await express_col.find({
            addUserId: user_id,
            expressId: new RegExp(req.expressId),
            expressType: new RegExp(req.expressType),
            expressSituation:new RegExp(req.expressSituation),
            expressState: new RegExp(req.expressState)
        }, {_id: 0}).skip((req.pageNum - 1) *req.pageSize).limit(req.pageSize).sort('-addTime');
        if (list) {
            ctx.body = {
                code: 200,
                data: list,
                total:list.length,
                pageNum:req.pageNum*1,
                pageSize:req.pageSize*1,
                description: '查询列表成功'
            }
        }
    },

    async detail(ctx) {
        const req = ctx.request.query;
        let type = await express_col.findOne({
            id: req.id,
        });
        ctx.body = {
            code: 200,
            data: type,
            description: '获取详情成功'
        }
    }
}
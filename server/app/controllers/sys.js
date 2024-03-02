import Sys_col from '../models/sys.js'
import {v1 as uuidV1} from 'uuid'

export default {
    async add(ctx) {
        const req = ctx.request.body;
        let type = await Sys_col.findOne({
            type: req.type,
            key: req.key,
        });
        if (!type) {
            ctx.body = {
                code: 500,
                data: null,
                description: '类型重复'
            }
        }
        await Sys_col.create({
            id: uuidV1(),
            type: req.type,
            key: req.key,
            keyList: req.keyList
        });
        ctx.body = {
            code: 200,
            data: null,
            description: '新增成功'
        }
    },
    async addChild(ctx) {
        const req = ctx.request.body;
        let type = await Sys_col.updateOne(
            {id: req.id},
            {
                $addToSet: {
                    keyList: {label: req.label, value: req.value}
                }
            }
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '新增成功'
        }
    },

    async delete(ctx) {
        const req = ctx.request.query;
        let type = await Sys_col.findOneAndDelete(
            {id: req.id}
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '删除成功'
        }
    },
    async deleteChild(ctx) {
        const req = ctx.request.query;
        let type = await Sys_col.updateOne(
            {id: req.id},
            {
                $pull: {
                    keyList: {label: req.label, value: req.value, _id: req._id}
                }
            }
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '删除成功'
        }
    },

    async update(ctx) {
        const req = ctx.request.body;
        let type = await Sys_col.findOneAndUpdate(
            {id: req.id},
            req
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '修改成功'
        }
    },
    async updateChild(ctx) {
        const {id, ...req} = ctx.request.body;
        let type = await Sys_col.findOneAndUpdate(
            {id: id, 'keyList._id': req._id},
            {
                $set: {
                    'keyList.$': req
                }
            }
        );
        ctx.body = {
            code: 200,
            data: type,
            description: '修改成功'
        }
    },

    async list(ctx) {
        const req = ctx.request.query;
        const list = await Sys_col.find({
            type: new RegExp(req.type)
        }, {_id: 0});
        if (list) {
            ctx.body = {
                code: 200,
                data: list,
                description: '查询列表成功'
            }
        }
    },
    async childList(ctx) {
        const req = ctx.request.query;
        if (!req.parentId) {
            ctx.body = {
                code: 500,
                data: null,
                description: 'parentId 必传'
            }
        }
        const list = await Sys_col.findOne({
            id: req.parentId
        });
        if (list) {
            ctx.body = {
                code: 200,
                data: list.keyList,
                description: '查询列表成功'
            }
        }
    },

    async detail(ctx) {
        const req = ctx.request.query;
        let type = await Sys_col.findOne({
            key: req.key,
        });
        ctx.body = {
            code: 200,
            data: type.keyList,
            description: '获取详情成功'
        }
    }
}
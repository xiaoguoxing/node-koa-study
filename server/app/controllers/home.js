import express_col from '../models/express.js'
import {v1 as uuidV1} from 'uuid'
import Sys_col from "../models/sys.js";
import {formatDate} from "../../utils/formatDate.js";

export default {

    async home1(ctx) {
        const req = ctx.request.query;
        const {user_id} = ctx.headers
        const list1 = await express_col.find({
            addUserId: user_id,
            expressSituation: '1',
        }, {_id: 0});
        const list2 = await express_col.find({
            addUserId: user_id,
            expressSituation: '2',
        }, {_id: 0});
        const list3 = await express_col.find({
            addUserId: user_id,
            expressSituation: '3',
        }, {_id: 0});
        ctx.body = {
            code: 200,
            data: {
                '正常': list1.length,
                '丢件': list2.length,
                '错误分配': list3.length,
            },
            description: '查询快递情况成功'
        }
    },

    async home2(ctx) {
        const req = ctx.request.query;
        const {user_id} = ctx.headers
        let time = new Set()
        let arr = {}
        let arr1 = []
        const list = await express_col.find({
            addUserId: user_id,
            addTime: {$gte: new Date(req.startTime), $lt: new Date(req.endTime)},
        }, {_id: 0});
        let {keyList} = await Sys_col.findOne({
            key: 'express_type1',
        });
        list.map(i => {
            time.add(formatDate(new Date(i.addTime)).split(' ')[0])
        })
        for (const timeKey of time.values()) {
            let newArr = list.filter(i => {
                let time1 = formatDate(new Date(i.addTime)).split(' ')[0]
                return (time1 === timeKey)
            })
            arr[timeKey] = Object.fromEntries(keyList.map(j=>{
                let a = newArr.filter(i=>i.expressType===j.value)
                return[j.label,a.length]
            }))
        }
        ctx.body = {
            code: 200,
            data: arr,
            description: '查询快递情况成功'
        }
    },

    async home3(ctx) {
        const {user_id} = ctx.headers
        // const total = await express_col.countDocuments()
        const list = await express_col.find({
            addUserId: user_id,
        }, {_id: 0}).sort('-addTime');
        if (list) {
            ctx.body = {
                code: 200,
                data: list,
                total:list.length,
                description: '查询列表成功'
            }
        }
    },
}
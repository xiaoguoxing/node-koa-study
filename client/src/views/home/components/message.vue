<template>
  <kr-card header="消息通知" :border="false">
    <template #headerRight>
      <el-button type="primary" link @click="getMessageAll">
        更多<el-icon style="font-size: 14px"><ArrowRight /></el-icon>
      </el-button>
    </template>
    <div class="message" v-for="(item, index) in messageList" :key="index" @click="getMessageDetail(item, index)">
      <span class="messageCon">{{ item.name }}</span>
      <span class="floatRight">{{ item.createTime }}</span>
    </div>
  </kr-card>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import {home3Api} from "@/api/model/home.js";
import {sysDictDetailApi} from "@/api/model/sys.js";

const messageList = ref([
  {
    name: '快递订单号：【123788871351】已送达完毕，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】需要您更新状态为【派件中】，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】需要您更新状态为【派件中】，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】已送达完毕，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】需要您更新状态为【已发出】，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】已送达完毕，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】已送达完毕，待您处理！',
    createTime: '2023-09-03 18:00',
  },
  {
    name: '快递订单号：【123788871351】已送达完毕，待您处理！',
    createTime: '2023-09-03 18:00',
  },
]);
const router = useRouter();

onMounted(()=>{
  getList()
})
async function getList() {
  let arr = (await sysDictDetailApi('express_type3'))?.data || []
  let arr2 = (await sysDictDetailApi('express_type2'))?.data || []
  let {data} = await home3Api()
  messageList.value = data.map(i=>{
    let obj = arr.find(j=>j.value===i.expressState)
    let obj2 = arr2.find(j=>j.value===i.expressSituation)
    return {
      name:`【${obj2.label}】快递订单号：【${i.expressId}】最新状态为：${obj.label}`,
      router:`/expressManage/expressAdd?id=${i.id}`
    }
  })
}
const getMessageDetail = (item, index) => {
  router.replace(item.router);
};
const getMessageAll = (item, index) => {
  router.push('/expressManage/expressQuery');
};
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>

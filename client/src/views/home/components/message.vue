<template>
  <kr-card header="消息通知" :border="false">
    <template #headerRight>
      <el-button type="primary" link @click="getMessageDetail">
        更多<el-icon style="font-size: 14px"><ArrowRight /></el-icon>
      </el-button>
    </template>
    <div class="message" v-for="(item, index) in messageList" :key="index" @click="getMessageDetail(item, index)">
      <span class="messageCon">{{ item.name }}</span>
      <span class="floatRight">{{ item.createTime }}</span>
    </div>
  </kr-card>
</template>

<script setup name="message">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
const getMessageDetail = (item, index) => {
  router.push('/home/message');
};
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>

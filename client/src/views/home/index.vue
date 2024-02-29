<template>
  <div class="home">
    <div class="home-welcome">
      <span>Hi，张晓华，欢迎您！</span>

    </div>
    <div class="home-box">
      <div class="flex-left">
        <div class="flex-top">
          <kr-card header="快递情况" :border="false" class="card-equipment">
            <div class="equipment" v-for="(item, index) in equipmentList" :key="index">
              <p class="equip-title">{{ item.name }}</p>
              <div class="equip-num">
                <img :src="item.icon" alt="" />
                <div class="equip-item">
                  <p class="value-online">{{ item.onLine }}</p>
                </div>
                <div class="equip-item1">
                  <p class="value"></p>
                </div>
              </div>
            </div>
          </kr-card>
        </div>
        <task class="flex-bottom" />
      </div>
      <div class="flex-right">
        <apps class="flex-top" />
        <message class="flex-bottom" />
      </div>
    </div>
  </div>
</template>

<script setup name="home">
import { ref } from 'vue';
import apps from './components/apps.vue';
import message from './components/message.vue';
import task from './components/task.vue';
import common from './components/common.vue';

import video1 from '@/assets/images/home/video1.png';
import video2 from '@/assets/images/home/video2.png';
import video3 from '@/assets/images/home/video3.png';
import icon1 from '@/assets/images/home/icon1.png';
import icon2 from '@/assets/images/home/icon2.png';
import icon3 from '@/assets/images/home/icon3.png';
import icon4 from '@/assets/images/home/icon4.png';
const groupOptions = [
  { label: '南沙水司', value: 'C202401' },
  { label: '仪征水司', value: 'C202402' },
];
const groupValue = ref('C202401');
const equipmentList = ref([
  {
    name: '正常',
    onLine: 25,
    totalLine: 30,
    icon: video1,
  },
  {
    name: '丢件',
    onLine: 25,
    totalLine: 30,
    icon: video2,
  },
  {
    name: '错误分配',
    onLine: 25,
    totalLine: 30,
    icon: video3,
  },
]);
const alarmList = ref([
  {
    name: '今日报警数 (条)',
    value: 45,
    icon: icon1,
    color: '#EA3939',
  },
  {
    name: '巡检项总数 (项)	',
    value: 45,
    icon: icon2,
    color: '#0D60B4',
  },
]);
const linkList = ref([
  {
    name: '联动告警数 (条)',
    value: 45,
    icon: icon3,
    color: '#FA802F',
  },
  {
    name: '联动巡检项数 (项)',
    value: 45,
    icon: icon4,
    color: '#0D60B4',
  },
]);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>

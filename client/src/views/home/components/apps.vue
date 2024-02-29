<template>
  <kr-card header="常用应用" :border="false">
    <div v-for="(item, index) in appsList" :key="index" class="apps">
      <img :src="item.icon" alt="" />
      <span>{{ item.name }}</span>
    </div>
  </kr-card>
</template>

<script setup name="apps">
import { ref } from 'vue';
import app1 from '@/assets/images/home/app1.png';
import app2 from '@/assets/images/home/app2.png';
import app3 from '@/assets/images/home/app3.png';
import app4 from '@/assets/images/home/app4.png';
const appsList = ref([
  {
    name: '收取快递',
    icon: app1,
  },
  {
    name: '快递列表',
    icon: app1,
  },
]);
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>

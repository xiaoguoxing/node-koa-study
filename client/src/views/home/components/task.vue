<template>
  <kr-card header="每日收取快递（件）" :border="false">
    <template #headerRight>
      <div class="bolck" style="width: 230px">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
    </template>
    <chart id="task-echart" :loading="loading" :echartOption="energyChartOption"></chart>
  </kr-card>
</template>

<script setup name="task">
import { ref, onMounted } from 'vue';
import chart from '../components/chart.vue';

import ChartsConfig from '../config/chart.js';

let energyChartOption = ref({});
let loading = ref(true);
const dateValue = ref(['2024-04-01', '2024-04-06']);
const initData = async () => {
  loading.value = false;
  let yData = [
    { name: '中通快递', data: [26, 37, 48, 59, 60, 70], color: '#0D60B4' },
    { name: '圆通快递', data: [16, 27, 38, 49, 40, 30], color: '#007FFF' },
    { name: '顺丰快递', data: [26, 37, 18, 29, 50, 30], color: '#06BF6E' },
    { name: '韵达快递', data: [16, 37, 48, 49, 30, 20], color: '#FA802F' },
  ];
  energyChartOption.value = ChartsConfig.lineOptions(
    ['04-01', '04-02', '04-03', '04-04', '04-05', '04-06'],
    '单位:件',
    yData
  );
};

onMounted(() => {
  initData();
});
</script>
<style scoped lang="scss">
// @import './index.scss';
</style>

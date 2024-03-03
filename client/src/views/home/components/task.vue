<template>
  <kr-card header="每日收取快递（件）" :border="false">
    <template #headerRight>
      <div class="bolck">
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
import {home2Api} from "@/api/model/home.js";
import chart from '../components/chart.vue';
import ChartsConfig from '../config/chart.js';
import {sysDictDetailApi} from "@/api/model/sys.js";

let energyChartOption = ref({});
let loading = ref(true);

const dateValue = ref(['2024-03-01', '2024-04-06']);
const initData = async () => {
  let {data={}} = await home2Api({
    startTime:dateValue.value[0],
    endTime:dateValue.value[1],
  })
  loading.value = false;
  let yData = [];
  let arr = (await sysDictDetailApi('express_type1'))?.data || []
  arr.forEach(i=>{
    let arr = []
    for (const [key,value] of Object.entries(data)) {
      arr.push(value[i.label])
    }
    yData.push({name: i.label,data:arr})
  })
  energyChartOption.value = ChartsConfig.lineOptions(
      Object.keys(data),
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

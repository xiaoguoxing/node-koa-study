<template>
  <div class="home">
    <div class="home-welcome">
      <span>Hi，{{userInfo.username}}，欢迎您！</span>
    </div>
    <div class="home-box">
      <div class="flex-left">
        <div class="flex-top">
          <kr-card header="快递情况" :border="false" class="card-equipment">
            <div class="equipment" v-for="(item, index) in equipmentList" :key="index">
              <p class="equip-title" :style="{color:item.color}">{{ item.name }}</p>
              <div class="equip-num">
                <el-icon size="48" :color="item.color"><Van /></el-icon>
                <div class="equip-item">
                  <p class="value-online" :style="{color:item.color}">{{ item.onLine }}</p>
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

<script setup>
import {home1Api} from "@/api/model/home.js";

defineOptions({
  name:'home'
})
import {onMounted, ref} from 'vue';
import apps from './components/apps.vue';
import message from './components/message.vue';
import task from './components/task.vue';
const userInfo = ref(JSON.parse(sessionStorage.getItem('userInfo')))
// home1Api
onMounted(()=>{
  getHome1()
})

const equipmentList = ref([
  {
    name: '正常',
    onLine: 25,
    color:'#67C23A',
  },
  {
    name: '错误分配',
    onLine: 25,
    color:'#E6A23C',
  },
  {
    name: '丢件',
    onLine: 25,
    color:'#F56C6C',
  },
]);

async function getHome1(){
  let {data} = await home1Api()
  equipmentList.value.map(i=>{
    i.onLine = data[i.name]??0
  })
}

</script>

<style scoped lang="scss">
@import './index.scss';
</style>

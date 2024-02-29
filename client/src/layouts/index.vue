<template>
  <el-container class="my-container">
    <el-header>
      <div class="header-left">
        <img src="@/assets/images/logo123.jpg" alt="快递收发系统" />
        <span class="header-title">快递收发系统</span>
      </div>
      <div  class="header-center">
        <el-menu
            :default-active="route.path"
            class="el-menu-demo"
            mode="horizontal"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            @select="handleSelect"
            router
        >
          <el-menu-item v-for="item in dynamicRouter" :key="item.path" :index="item.path">{{item.meta.title}}</el-menu-item>
        </el-menu>
      </div>
      <div class="header-right">
        <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="username">张晓华</span>
        <el-icon color="#fff"><CaretBottom /></el-icon>
      </div>
    </el-header>
    <el-container>
      <el-aside v-if="route.meta.isAside && (child.length)" width="200px">
        <el-menu
            :default-active="route.path"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            @select="handleSelect2"
            router
        >
          <el-menu-item v-for="item in child" :key="item.path" :index="item.path">
            <el-icon><component :is="item.meta.icon" /></el-icon>
            <span>{{item.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb v-if="route.meta.isBread" class="breadcrumbStyle" separator="/">
        </el-breadcrumb>
        <div class="model-container":class="{'noBread':!route.meta.isBread}">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import dynamicRouter from "@/assets/js/dynamicRouter.js";

const child = ref([])
const bread = ref([])
const route = useRoute()
onMounted(()=>{
  handleSelect(route.path)
})
const handleSelect = (key, keyPath) => {
  let obj = dynamicRouter.find(i=>i.path===key)
  if(obj){
    child.value = obj?.children||[]
  }
}
const handleSelect2 = (key, keyPath) => {


}
</script>

<style scoped lang="scss">
.my-container{
  --bg-color1:#101d2b;
  --bg-color2:#fcba02;
  --bg-color3:#016dc5;
  --bg-color4:#99bbd5;
  :deep(.el-header){
    --el-header-padding: 0px 10px;
    display: flex;
    align-items: center;
    background: var(--bg-color1);
    .header-left{
      display: flex;
      align-items: center;
      img{
        width: auto;
        height: 50px;
      }
      .header-title{
        font-size: 24px;
        margin:0 10px;
        color: #fff;
      }
    }
    .header-center{
      flex: 1;
      .el-menu{
        border: none;
        .el-menu-item{
          font-size: 14px;
          font-weight: bold;
        }
        .el-menu-item.is-active{
          background: var(--bg-color3);
          border-bottom:5px solid var(--bg-color2);
        }

      }
    }
    .header-right{
      display: flex;
      align-items: center;
      .username{
        color: #fff;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
  :deep(.el-aside){
    background: var(--bg-color1);
    .el-menu{
      border: none;
      .el-menu-item{
        font-size: 14px;
        font-weight: bold;
      }
      .el-menu-item.is-active{
        background: var(--bg-color3);
        border-right:5px solid var(--bg-color2);
      }
    }
  }
  :deep(.el-main){
    padding: 0 20px 20px;
    background: var(--bg-color4);
    .breadcrumbStyle{
      display: flex;
      align-items: center;
      height: 40px;
    }
  }
  .model-container{
    height: calc(100% - 40px);
    &.noBread{
      height: calc(100%);
    }
  }
}
</style>

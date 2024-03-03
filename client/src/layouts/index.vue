<template>
  <el-container class="my-container">
    <el-header>
      <div class="header-left">
        <img src="@/assets/images/logo123.jpg" alt="快递收发系统"/>
        <span class="header-title">快递收发系统</span>
      </div>
      <div class="header-center">
        <el-menu
            :default-active="activeMenu"
            class="el-menu-demo"
            mode="horizontal"
            popper-class="header-menu"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            router
        >
          <template v-for="subItem in menuList" :key="subItem.path">
            <el-sub-menu v-if="subItem.children" :index="subItem.path">
              <template #title>{{ subItem.meta.title }}</template>
              <el-menu-item v-for="subItem2 in subItem.children" :key="subItem2.path" :index="subItem2.path"
                            @click="handleClickMenu(subItem2)">
                <el-icon>
                  <component :is="subItem2.meta.icon"></component>
                </el-icon>
                <template #title>
                  <span>{{ subItem2.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
                v-else
                :index="subItem.path"
                @click="handleClickMenu(subItem)"
            >
              <el-icon>
                <component :is="subItem.meta.icon"></component>
              </el-icon>
              <template #title>
                <span>{{ subItem.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="header-right">
        <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <el-dropdown>
          <span class="username">{{info.username}}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-icon color="#fff">
          <CaretBottom/>
        </el-icon>
      </div>
    </el-header>
    <el-container>
      <el-aside v-if="subMenu.length" width="200px">
        <el-menu
            :default-active="activeMenu"
            :router="false"
            :collapse-transition="false"
            :unique-opened="true"
            popper-class="header-menu"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
        >
          <template v-for="subItem in subMenu" :key="subItem.path">
            <el-sub-menu v-if="subItem.children" :index="subItem.path">
              <template #title>{{ subItem.meta.title }}</template>
              <el-menu-item v-for="subItem2 in subItem.children" :key="subItem2.path" :index="subItem2.path"
                            @click="handleClickMenu(subItem2)">
                <el-icon>
                  <component :is="subItem2.meta.icon"></component>
                </el-icon>
                <template #title>
                  <span>{{ subItem2.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
              <el-icon>
                <component :is="subItem.meta.icon"></component>
              </el-icon>
              <template #title>
                <span>{{ subItem.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb v-if="!route.meta.isBread" class="breadcrumbStyle" separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
            <div class="breadcrumb-item el-breadcrumb__inner is-link" @click="onBreadcrumbClick(item, index)">
              <span class="breadcrumb-title">{{ item.meta.title }}</span>
            </div>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="model-container" :class="{'noBread':route.meta.isBread}">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {computed,ref} from 'vue';
import {useMenu} from "@/layouts/hooks/useMenu.js";
let info = ref(JSON.parse(sessionStorage.getItem('userInfo')))
const route = useRoute();
const router = useRouter();
const {activeMenu, menuList, handleClickMenu, subMenu} = useMenu();
const getAllBreadcrumbList = (menuList, result = {}, path = []) => {
  for (const item of menuList) {
    result[item.path] = [...path, item];
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};
let breadcrumbListGet = getAllBreadcrumbList(menuList.value)
const breadcrumbList = computed(() => breadcrumbListGet[route.matched[route.matched.length - 1].path]);
const onBreadcrumbClick = (item, index) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
function loginOut() {
  router.replace('/login')
}
</script>

<style scoped lang="scss">
.my-container {
  :deep(.el-header) {
    --el-header-padding: 0px 10px;
    display: flex;
    align-items: center;
    background: var(--bg-color1);

    .header-left {
      display: flex;
      align-items: center;

      img {
        width: auto;
        height: 50px;
      }

      .header-title {
        font-size: 24px;
        margin: 0 10px;
        color: #fff;
      }
    }

    .header-center {
      flex: 1;
    }

    .header-right {
      display: flex;
      align-items: center;

      .username {
        color: #fff;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }

  :deep(.el-aside) {
    background: var(--bg-color1);
  }

  :deep(.el-main) {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
    background: var(--bg-color4);
    overflow-x:hidden ;
    .breadcrumbStyle {
      display: flex;
      align-items: center;
      height: 40px;
    }
  }

  :deep(.el-menu) {
    border: none;

    .el-menu-item {
      font-size: 14px;
      font-weight: bold;
    }

    .el-sub-menu > .el-sub-menu__title {
      border: none;
    }

    .el-menu-item.is-active {
      background: var(--bg-color3);
      border-bottom: 5px solid var(--bg-color2);
    }

    .el-sub-menu.is-active {
      background: var(--bg-color3);
      border-bottom: 5px solid var(--bg-color2);
    }

  }

  :deep(.el-container){
    width: 100%;
    height: calc(100% - 60px);
  }

  .model-container {
    height: calc(100% - 40px);

    &.noBread {
      height: calc(100%);
    }
  }
}
</style>
<style lang="scss">
.header-menu {
  padding: 0;
  background: var(--bg-color1) !important;
  border: none !important;

  .el-menu-item.is-active {
    background: var(--bg-color3);
    border-right: 5px solid var(--bg-color2);
  }
}
</style>

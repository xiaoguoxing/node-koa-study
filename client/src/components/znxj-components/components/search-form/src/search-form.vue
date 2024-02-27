<template>
  <div class="kr-table-search" v-if="columns.length">
    <el-form ref="formRef" :model="searchParam" label-width="auto">
      <kr-grid class="grid" ref="gridRef" :collapsed="collapsed" :gap="[16, 0]" :cols="searchCol">
        <kr-grid-item v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
          <el-form-item :label="item.isShowInputLabel ? `${item.label} :` : ``">
            <SearchFormItem :column="item" :searchParam="searchParam" />
          </el-form-item>
        </kr-grid-item>
        <kr-grid-item>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="search">查询</el-button>
            <el-button :icon="Delete" @click="reset">重置</el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? '展开' : '合并' }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button>
          </div>
        </kr-grid-item>
      </kr-grid>
    </el-form>
  </div>
</template>
<script setup>
import '../../style/index.scss';
import '../style/index.scss';
import { computed, ref } from 'vue';
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import SearchFormItem from './search-form-item.vue';
import { KrGrid, KrGridItem } from '@/components/znxj-components/components/index.js';
defineOptions({
  name:'SearchForm'
})

// 默认值
const props = defineProps({
  columns:{
    type:Array,
    default:() => []
  }, // 搜索配置列
  searchParam: {
    type:Object,
    default: () => ({})
  }, // 搜索参数
  searchCol:  {
    type:Object,
    default(){
      return { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
    }
  },
  search: Function, // 搜索方法
  reset: Function, // 重置方法
});

// 获取响应式设置
const getResponsive = (item) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl,
  };
};

// 是否默认折叠搜索项
const collapsed = ref(true);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed(() => gridRef.value?.breakPoint);

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false;
  props.columns.reduce((prev, current) => {
    prev +=
      (current.search[breakPoint.value]?.span ?? current.search?.span ?? 1) +
      (current.search[breakPoint.value]?.offset ?? current.search?.offset ?? 0);
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) show = true;
    } else {
      if (prev > props.searchCol) show = true;
    }
    return prev;
  }, 0);
  return show;
});
</script>
<!-- <script lang="ts">
import '@/components/znxj-components/components/src/styles/index.scss';
import { defineComponent, computed, ref } from 'vue';
import type { ColumnProps } from '@/components/znxj-components/components/src/pro-table';
import type { BreakPoint } from '@/components/znxj-components/components/src/grid';

import { searchFormProps } from './search-form';

import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import SearchFormItem from './search-form-item.vue';

import { KrGrid, KrGridItem } from '@/components/znxj-components/components/src/grid';

export default defineComponent({
  name: 'kr-search-form',
  props: searchFormProps,
  components: { KrGrid, KrGridItem, SearchFormItem },

  setup(props) {
    // 获取响应式设置
    const getResponsive = (item: ColumnProps) => {
      return {
        span: item.search?.span,
        offset: item.search?.offset ?? 0,
        xs: item.search?.xs,
        sm: item.search?.sm,
        md: item.search?.md,
        lg: item.search?.lg,
        xl: item.search?.xl,
      };
    };

    // 是否默认折叠搜索项
    const collapsed = ref(true);

    // 获取响应式断点
    const gridRef = ref();
    const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

    // 判断是否显示 展开/合并 按钮
    const showCollapse = computed(() => {
      let show = false;
      console.log(props.columns);
      props.columns.reduce((prev, current) => {
        prev +=
          (current.search![breakPoint.value]?.span ??
            current.search?.span ??
            1) +
          (current.search![breakPoint.value]?.offset ??
            current.search?.offset ??
            0);
        console.log(prev);
        console.log(props.searchCol);
        console.log(breakPoint);
        if (typeof props.searchCol !== 'number') {
          if (prev >= props.searchCol[breakPoint.value]) show = true;
        } else {
          if (prev > props.searchCol) show = true;
        }
        return prev;
      }, 0);
      return show;
    });
    return {
      getResponsive,
      collapsed,
      showCollapse,
      Delete,
      Search,
      ArrowDown,
      ArrowUp,
    };
  },
});
</script> -->

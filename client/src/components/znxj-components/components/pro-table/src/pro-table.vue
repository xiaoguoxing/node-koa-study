<template>
  <div class="kr-protable">
    <!-- 查询表单 card -->
    <kr-search-form
      :search="search"
      :reset="reset"
      :searchParam="searchParam"
      :columns="searchColumns"
      :searchCol="searchCol"
      v-show="isShowSearch"
    />
    <!-- 表格头部 操作按钮 -->
    <div class="kr-protable-header clearfix" v-if="operationBtn">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selectedListIds="selectedListIds"
          :selectList="selectedList"
          :isSelected="isSelected"
        ></slot>
      </div>
      <div class="header-button-ri">
        <el-button v-if="refreshAble && columns.length" icon="Refresh" circle @click="getTableList"></el-button>
        <el-popover placement="bottom" v-if="colSetAble && columns.length" :width="500" trigger="click">
          <template #reference>
            <el-button icon="Operation" circle @click="openColSetting"></el-button>
          </template>
          <ColSetting v-if="colSetAble" ref="colRef" v-model:colSetting="colSetting" />
        </el-popover>
      </div>
    </div>
    <!-- 表格主体 -->

    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="tableData"
      :border="border"
      :row-key="getRowKeys"
      @selection-change="selectionChange"
      @select="clickCheckBox"
      @select-all="clickCheckBox"
    >
      <!-- @filter-change="filterChange" -->
      <!-- 默认插槽 -->
      <slot></slot>
      <template v-for="(item, index) in tableColumns" :key="item">
        <!-- selection || index -->
        <el-table-column
          v-bind="item"
          :reserve-selection="item.type == 'selection'"
          :align="item.align ?? 'center'"
          v-if="item.type == 'selection' || item.type == 'index'"
          v-slot="scope"
        >
          <template v-if="pagination && item.type == 'index'"
            >{{ pageable.pageSize * (pageable.pageNum - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column v-if="item.type == 'radio'" :align="item.align ?? 'center'" v-bind="item" v-slot="scope">
          <div>
            <el-radio
              v-model="radioCheck"
              :label="scope.row[selectId]"
              :disabled="item.selectable ? item?.selectable(scope.row, scope.$index) : false"
              @change="() => radioSelect(scope.row)"
            >
              <i></i>
            </el-radio>
          </div>
        </el-table-column>
        <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
        <el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="item.type == 'expand'" v-slot="scope">
          <component :is="item.render" :row="scope.row" v-if="item.render"></component>
          <slot :name="item.type" :row="scope.row" :index="scope.$index" v-else></slot>
        </el-table-column>
        <!-- other 循环递归 -->
        <TableColumn v-if="!item.type && item.prop && item.isShow" :column="item" :key="item.prop" :index="index">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" :row="scope.row" :index="scope.$index"></slot>
          </template>
        </TableColumn>
      </template>
      <!-- 无数据 -->
      <!-- <template #empty>
        <div class="table-empty">
          <img src="./assets/images/notData.png" alt="notData" />
          <div>暂无数据</div>
        </div>
      </template> -->
    </el-table>

    <!-- 分页组件 -->
    <Pagination
      v-if="pagination"
      :pageable="pageable"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
  </div>
  <!-- 列设置 -->
</template>

<script setup>
import '../../style/index.scss';
import '../style/index.scss';
import { computed, provide, ref, watch, nextTick, useSlots } from 'vue';
import { useTable } from './hooks/use-table/index.js';
import { useSelection } from './hooks/use-selection/index.js';
import { ElTable } from 'element-plus';
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from '@/components/znxj-components/utils';
import { Operation, Printer, Refresh } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-es';

import KrSearchForm from '@/components/znxj-components/components/search-form/index.js';

import Pagination from './components/Pagination.vue';
import ColSetting from './components/ColSetting.vue';
import TableColumn from './components/TableColumn.vue';
defineOptions({
  name:'KrProTable'
})
// 表格 DOM 元素
const tableRef = ref();

// 是否显示搜索模块
const isShowSearch = ref(true);

const props = defineProps( {
  columns:{
    type:Array,
    default(){
      return []
    }
  }, // 列配置项
  requestApi: Function, // 请求表格数据的api ==> 必传
  dataCallback: Function, // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title: String, // 表格标题， ==> 非必传
  titleBorder: Boolean, // 标题是否有下边框
  outBorder: Boolean, // 是否带有表格卡片边框 ==> 非必传（）
  pagination: {
    type:Boolean,
    default:true
  }, // 是否需要分页组件 ==> 非必传（默认为true）
  initParam: {
    type:Object,
    default(){
      return {}
    }
  }, // 初始化请求参数 ==> 非必传（默认为{}）
  border: {
    type:Boolean,
    default:true
  }, // 是否带有纵向边框 ==> 非必传（默认为true）
  operationBtn: {
    type:Boolean,
    default:true
  }, // 是否带有操作区域 ==> 非必传（默认为true）
  refreshAble: Boolean, // 是否带有纵向边框 ==> 非必传（默认为true）
  printAble: Boolean, // 是否带有纵向边框 ==> 非必传（默认为true）
  colSetAble: Boolean, // 是否带有纵向边框 ==> 非必传（默认为true）
  selectId: {
    type:String,
    default:'id'
  }, // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  selectData: {
    type:Array,
    default(){
      return []
    }
  }, //所有选中的数据
  searchCol: {
    type:Object,
    default(){
      return { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
    }
  } // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
})

// 接受父组件参数，配置默认值

const emit = defineEmits(['select', 'radioSelect']);
// 表格多选 Hooks
const { selectionChange, getRowKeys, selectedList, selectedListIds, isSelected } = useSelection(props.selectId);

const clearFilter = () => tableRef.value?.clearFilter(tableColumns.value.map((i) => i.prop));
// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  filterChange,
} = useTable(props.requestApi, props.initParam, props.pagination, clearFilter, props.dataCallback);

const seledData = ref(cloneDeep(props.selectData));
const radioCheck = ref(props.selectData[0] ? props.selectData[0][props.selectId] : null);
// 清空选中数据列表
const clearSelection = () => {
  seledData.value = [];
  tableRef.value.clearSelection();
};
const clickCheckBox = (selection) => {
  seledData.value = selection;
  emit('select', selection);
};
//set选中数据
//单选
//设置单选框选中数据
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let extra = '';
const radioSelect = (row) => {
  seledData.value = [row];
  extra = row[props.selectId];
  emit('radioSelect', [row]);
};

//多选
const setCheckBox = () => {
  tableData.value?.forEach((row) => {
    const selId = seledData.value?.find((item) => {
      return row[props.selectId] == item[props.selectId];
    });
    if (selId !== undefined) {
      tableRef.value.toggleRowSelection(row, true);
    } else {
      tableRef.value.toggleRowSelection(row, false);
    }
  });
};
const setRadio = () => {
  if (seledData.value.length != 0) {
    radioCheck.value = seledData.value[0][props.selectId];
  } else {
    radioCheck.value = null;
  }
};
const haveRadio = () => {
  return props.columns.find((column) => {
    return column.type == 'radio';
  });
};
const haveCheck = () => {
  return props.columns.find((column) => {
    return column.type == 'selection';
  });
};
// 监听页面 initParam 改化，重新获取表格数据
watch(
  () => props.initParam,
  () => {
    getTableList();
  },
  { deep: true }
);

watch(
  () => props.selectData,
  () => {
    seledData.value = cloneDeep(props.selectData);
    if (haveRadio()) {
      setRadio();
    }
    if (haveCheck()) {
      setCheckBox();
    }
  }
);
watch(
  () => tableData.value,
  () => {
    nextTick(() => {
      if (haveRadio()) {
        setRadio();
      }
      if (haveCheck()) {
        setCheckBox();
      }
    });
  }
);
// 接收 columns 并设置为响应式
const tableColumns = ref(props.columns);

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map());
provide('enumMap', enumMap);

// 扁平化 columns && 处理 tableColumns 数据
const flatColumnsFunc = (columns, flatArr = []) => {
  columns.forEach(async (col) => {
    if (col?._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);

    // 给每一项 column 添加 isShow && isFilterEnum 属性
    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    if (!col.enum) return;
    // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
    if (typeof col.enum !== 'function') return enumMap.value.set(col.prop, col.enum);
    const { data } = await col.enum();
    enumMap.value.set(col.prop, data);
  });
  return flatArr.filter((item) => !item._children?.length);
};

// 扁平 columns
const flatColumns = ref();
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项 && 处理搜索排序
const searchColumns = flatColumns.value
  .filter((item) => item.search?.el)
  .sort((a, b) => (b.search?.order ?? 0) - (a.search?.order ?? 0));

// 设置搜索表单的默认值
searchColumns.forEach((column) => {
  if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
    searchInitParam.value[column.search.key ?? handleProp(column.prop)] = column.search?.defaultValue;
  }
});

// 列设置 ==> 过滤掉不需要设置显隐的列
const colRef = ref();
const colSetting = tableColumns.value.filter((item) => {
  return (
    item.isShow &&
    item.type !== 'selection' &&
    item.type !== 'index' &&
    item.type !== 'expand' &&
    item.prop !== 'operation'
  );
});
const openColSetting = () => {
  colRef.value.openColSetting();
};

// 处理打印数据（把后台返回的值根据 enum 做转换）
const printData = computed(() => {
  let printDataList = JSON.parse(JSON.stringify(selectedList.value.length ? selectedList.value : tableData.value));
  let colEnumList = flatColumns.value.filter((item) => item.enum || (item.prop && item.prop.split('.').length > 1));
  colEnumList.forEach((colItem) => {
    printDataList.forEach((tableItem) => {
      tableItem[handleProp(colItem.prop)] =
        colItem.prop.split('.').length > 1 && !colItem.enum
          ? formatValue(handleRowAccordingToProp(tableItem, colItem.prop))
          : filterEnum(
              handleRowAccordingToProp(tableItem, colItem.prop),
              enumMap.value.get(colItem.prop),
              colItem.fieldNames
            );
    });
  });
  return printDataList;
});

// 打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）


// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
  element: tableRef,
  tableData,
  searchParam,
  pageable,
  getTableList,
  // selectedList,
  clearSelection,
  enumMap,
  filterChange,
});

const slot = useSlots();
// 是否左布局
const isLeftRight = computed(() => Reflect.has(slot, 'leftLayout'));
</script>

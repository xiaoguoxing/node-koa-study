<template>
  <div class="message-page">
    <myTabs :options="options1" style="margin-bottom: 20px" buttonType="bottom-line" @change="tabChange"></myTabs>
    <kr-pro-table
      ref="proTable"
      :columns="columns"
      :requestApi="getTableList"
      :initParam="initParam"
      :dataCallback="dataCallback"
      :searchCol="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      selectId="code"
      title="通知消息"
      titleBorder
      :border="false"
      :outBorder="false"
      colSetAble
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button icon="Delete">批量删除</el-button>
        <el-button>标记已读</el-button>
      </template>
    </kr-pro-table>
  </div>
</template>

<script setup name="message" lang="tsx">
import { ref } from 'vue';
import myTabs from '@/components/myTabs.vue';

const options1 = [
  { label: '全部', value: '1' },
  { label: '未读', value: '2' },
  { label: '已读', value: '3' },
];
const initParam = null;
const columns = [
  { type: 'selection', label: '序号', width: 150 },
  { type: 'index', label: '序号', width: 120 },
  {
    prop: 'content',
    label: '消息内容',
  },

  {
    prop: 'status',
    label: '状态',
    sortable: false,
    filterMultiple: false,
    filters: [
      { text: '未读', value: '1' },
      { text: '已读', value: '2' },
    ],
    enum: [
      { label: '未读', value: '1' },
      { label: '已读', value: '2' },
    ],
  },
  {
    prop: 'type',
    label: '消息类型',
    sortable: false,
    filterMultiple: false,
    filters: [
      { text: '业务消息', value: '1' },
      { text: '系统消息', value: '2' },
    ],
    enum: [
      { label: '业务消息', value: '1' },
      { label: '系统消息', value: '2' },
    ],
  },
  {
    prop: 'time',
    label: '接收时间',
  },
];
const selectProp = ref('1');
const tabChange = () => {};
const tableSource = [
  { content: '123456789123456', name: '测试1', status: '1', type: '1', time: '2024-02-05' },
  { content: '123456789123456', name: '测试2', status: '2', type: '2', time: '2024-02-05' },
  { content: '123456789123456', name: '测试3', status: '3', type: '1', time: '2024-02-05' },
];
const deleteList = () => {};
const getTableList = async (params: any) => {
  //param:pageNum,在这里可以根据后端需要的参数从 params 拿到想要的参数值
  let resultData = [...tableSource];
  if (params.label) {
    resultData = tableSource.filter((item: any) => item.label.includes(params.label));
  }
  if (params.version) {
    resultData = resultData.filter((item: any) => item.version.includes(params.version));
  }
  return {
    data: {
      list: resultData,
      total: resultData.length,
      page: 1,
      pageSize: 10,
    },
  };
};
const dataCallback = (data: any) => {
  return {
    datalist: data.list,
    total: data.total,
    pageNum: data.page,
    pageSize: data.pageSize,
  };
};
</script>

<style scoped lang="scss">
// @import './index.scss';
.message-page {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  .kr-protable {
    height: calc(100% - 56px) !important;
  }
}
</style>

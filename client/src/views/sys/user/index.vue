<template>
  <kr-card class="flex-1 alarm-card-main" :header="'字典管理'" header-border>
    <kr-pro-table
        ref="proTable"
        :columns="columns"
        :requestApi="getTableList"
        :initParam="initParam"
        :searchCol="{ xs: 1, sm: 1, md: 4, lg: 4, xl: 4 }"
        selectId="id"
        :border="false"
        :outBorder="false"
        colSetAble
        :pagination="false"
    >
      <!-- 表格操作 -->
      <template #operation="{ row }">
        <el-button type="primary" link @click="toAdd(row,'编辑')">编辑</el-button>
        <el-button type="primary" @click="del(row.userId)" link>删除</el-button>
      </template>
    </kr-pro-table>
    <add ref="addRef"></add>
  </kr-card>
</template>
<script setup>
import {ref, reactive, onMounted} from 'vue';
import add from './add.vue'
import {ElMessage, ElMessageBox} from "element-plus";
import {userDelApi, userListApi} from "@/api/model/user.js";
// 表格配置项
onMounted(() => {

});
const proTable = ref();
const initParam = reactive({});
const columns = [
  {type: 'index', label: '序号', width: 60},
  {
    prop: 'username',
    label: '账号',
    isShowInputLabel: true,
    search: {
      el: 'input',
    },
  },
  {
    prop: 'password',
    label: '密码',
  },
  {prop: 'operation', align: 'right', label: '操作', width: 220, fixed: 'right'},
];
const getTableList = async (params) => {
  // await getAlarmListApi(params);
  return userListApi(params);
};
async function del(userId) {
  try {
    await ElMessageBox.confirm(`是否删除?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
    let {description} = await userDelApi(userId)
    ElMessage.success(description)
    proTable.value.getTableList()

  } catch (e) {

  }

}

// 弹框
const row = ref({});
const addRef = ref();

function toAdd(rows,title='新增') {
  addRef.value.acceptParams({
    title: title,
    rowData: rows,
    getTableList() {
      proTable.value.getTableList()
    }
  })
}
</script>
<style scoped lang="scss">
.alarm-card-main {
  :deep(.alarm-tab-main) {
    display: flex;
    align-items: center;

    .alarm-tag {
      padding: 5px 10px;
      color: #ffffff;
      cursor: pointer;
      background: #64cd5c;
      border-radius: 4px;

      &.type1 {
        background: #cd5c5c;
      }
    }

    .alarm-tag-line {
      padding: 5px 10px;
      color: #64cd5c;
      cursor: pointer;
      border: 1px solid #64cd5c;
      border-radius: 4px;

      &.type1 {
        color: indianred;
        border: 1px solid indianred;
      }
    }
  }
}
</style>

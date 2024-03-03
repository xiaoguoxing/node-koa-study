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
      <template #tableHeader>
        <el-button type="primary" @click="toAdd(row)">新增</el-button>
      </template>
      <template #operation="{ row }">
        <el-button type="primary" link @click="toAddChild(row)">新增</el-button>
        <el-button type="primary" link @click="toAdd(row,'编辑')">编辑</el-button>
        <el-button type="primary" @click="del(row.id)" link>删除</el-button>
      </template>
      <template #expand="{row}">
        <kr-pro-table
            ref="proTableChild"
            :columns="columnsChild"
            :requestApi="(params)=>getTableChildList({parentId:row.id,...params})"
            :searchCol="{ xs: 1, sm: 1, md: 4, lg: 4, xl: 4 }"
            selectId="id"
            :border="false"
            :outBorder="false"
            :colSetAble="false"
            :pagination="false"
        >
          <template #operation="{ row:childRow,index }">
            <el-button type="primary" link @click="editChildRow(row,childRow)">编辑</el-button>
            <el-button type="primary" link @click="deleteChildRow(row,childRow,index)">删除</el-button>
          </template>
        </kr-pro-table>
      </template>
    </kr-pro-table>
    <add ref="addRef"></add>
    <add-child ref="addChildRef"></add-child>
  </kr-card>
</template>
<script setup>
import {ref, reactive, onMounted} from 'vue';
import {
  sysDictChildListApi,
  sysDictDelChildApi,
  sysDictListApi,
  sysDictDelApi,
  sysDictDetailApi
} from "@/api/model/sys.js";
import add from './add.vue'
import AddChild from "@/views/sys/dict/addChild.vue";
import {ElMessage, ElMessageBox} from "element-plus";
// 表格配置项
onMounted(() => {
  sysDictDetailApi('express_type1')
});
const proTable = ref();
const initParam = reactive({});
const columns = [
  {type: 'expand', label: '  ', width: 50},
  {type: 'index', label: '序号', width: 60},
  {
    prop: 'type',
    label: '类型',
    isShowInputLabel: true,
    search: {
      el: 'input',
    },
  },
  {
    prop: 'key',
    label: ' key',
    isShowInputLabel: true,
  },
  {prop: 'operation', align: 'right', label: '操作', width: 220, fixed: 'right'},
];
const getTableList = async (params) => {
  // await getAlarmListApi(params);
  return sysDictListApi(params);
};
async function del(id) {
  try {
    await ElMessageBox.confirm(`是否删除?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
    let {description} = await sysDictDelApi(id)
    ElMessage.success(description)
    proTable.value.getTableList()

  } catch (e) {

  }

}

const proTableChild = ref();
const columnsChild = [
  {type: 'index', label: '序号', width: 60},
  {
    prop: 'label',
    label: '名称',
  },
  {
    prop: 'value',
    label: '值',
  },
  {prop: 'operation', align: 'right', label: '操作', width: 120, fixed: 'right'},
];
const getTableChildList = async (params) => {
  if (!params.parentId) {
    return {data: []}
  }
  // await getAlarmListApi(params);
  return sysDictChildListApi(params);
};
async function deleteChildRow(row, childRow, index) {
  await sysDictDelChildApi({id: row.id, ...childRow})
  proTableChild.value.getTableList()
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

const addChildRef = ref();
function toAddChild(row) {
  addChildRef.value.acceptParams({
    title: '新增',
    id: row.id,
    row: {label: '', value: ''},
    getTableList() {
      proTableChild.value.getTableList()
    }
  })
}
function editChildRow(row, childRow) {
  addChildRef.value.acceptParams({
    title: '编辑',
    id: row.id,
    row: childRow,
    getTableList() {
      proTableChild.value.getTableList()
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

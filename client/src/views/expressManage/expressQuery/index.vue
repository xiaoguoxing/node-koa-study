<template>
    <kr-card class="flex-1 alarm-card-main" :header="'快递查询'" header-border>
      <template v-if="pageType === 'list'">
        <kr-pro-table
            ref="proTable"
            :columns="columns"
            :requestApi="getTableList"
            :initParam="initParam"
            :searchCol="{ xs: 1, sm: 1, md: 4, lg: 4, xl: 4 }"
            selectId="id"
            title="预置位配置"
            titleBorder
            :border="false"
            :outBorder="false"
            colSetAble
        >
          <!-- 表格操作 -->
          <template #operation="{ row }">
            <el-button type="primary" link @click="toDetailPage('detail', row)">编辑</el-button>
            <el-button type="primary" link @click="del(row.id)">删除</el-button>
          </template>
        </kr-pro-table>
      </template>
      <template v-else-if="pageType === 'detail'">
      </template>
    </kr-card>
</template>
<script setup lang="jsx">
import { ref, reactive, onMounted } from 'vue';
import {expressDelApi, expressListApi} from "@/api/model/express.js";
import {sysDictDetailApi} from "@/api/model/sys.js";
import {ElMessage, ElMessageBox} from "element-plus";
// 表格配置项
onMounted(() => {
  getDict()
});
let type1 = ref([]);
let type2 = ref([]);
let type3 = ref([]);
async function getDict() {
  type1.value = (await sysDictDetailApi('express_type1'))?.data || []
  type2.value = (await sysDictDetailApi('express_type2'))?.data || []
  type3.value = (await sysDictDetailApi('express_type3'))?.data || []
}
const proTable = ref();
const initParam = reactive({});
const selectProp = ref('1');
const columns= [
  { type: 'selection', label: '序号', width: 50 },
  { type: 'index', label: '序号', width: 60 },
  {
    prop: 'expressId',
    label: '快递单号',
    isShowInputLabel: true,
    search: {
      el: 'input',
    },
    width: 150,
  },
  {
    prop: 'issueAddress',
    label: '发出地址',
    width: 200,
  },
  {
    prop: 'issueName',
    label: '发件人姓名',
    width: 150,
  },
  {
    prop: 'issuePhone',
    label: '发件人手机号码',
    width: 150,
  },
  {
    prop: 'collectAddress',
    label: '收件地址',
    width: 150,
  },
  {
    prop: 'collectName',
    label: '收件人姓名',
    width: 150,
  },
  {
    prop: 'collectPhone',
    label: '收件人手机号码',
    width: 150,
  },
  {
    prop: 'expressType',
    label: '快递种类',
    isShowInputLabel: true,
    width: 150,
    search: {
      el: 'select',
    },
    enum: ()=>sysDictDetailApi('express_type1'),
  },
  {
    prop: 'expressSituation',
    label: ' 快递情况',
    width: 100,
    filterMultiple: false,
    isShowInputLabel: true,
    fixed: 'right',
    search: {
      el: 'select',
    },
    enum: ()=>sysDictDetailApi('express_type2'),
    render(socpe,val) {
      return (
          <div class="alarm-tab-main">
          <span class="alarm-tag" class={val !== '正常' ? 'type1' : ''}>
            {val}
          </span>
          </div>
      );
    },
  },
  {
    prop: 'expressState',
    label: '快递状态',
    fixed: 'right',
    isShowInputLabel: true,
    width: 120,
    search: {
      el: 'select',
    },
    enum: ()=>sysDictDetailApi('express_type3'),
    render(socpe,val) {
      return (
          <div class="alarm-tab-main">
            <span class="alarm-tag-line">{val}</span>
          </div>
      );
    },
  },
  { prop: 'operation', align: 'right', label: '操作', width: 120, fixed: 'right' },
];
const getTableList = async (params) => {
  // await getAlarmListApi(params);
     let {data=[],...res} = await expressListApi(params)
  return {
    data: {
      datalist: data,
      ...res
    },
  };
};
async function del(id) {
  try {
    await ElMessageBox.confirm(`是否删除?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
    let {description} = await expressDelApi(id)
    ElMessage.success(description)
    proTable.value.getTableList()

  } catch (e) {

  }

}
//树操作
const TreeData = ref([
  {
    id: 1,
    label: '南沙水司',
    children: [
      {
        id: 4,
        label: '黄阁水厂',
        children: [
          {
            id: 9,
            label: '加药间',
            children: [
              {
                id: 19,
                label: '石灰螺杆泵、配药系统',
              },
              {
                id: 13,
                label: 'PAC投加系统',
              },
            ],
          },
          {
            id: 10,
            label: '配水井',
            children: [
              {
                id: 19,
                label: 'PAC、PAM流量计',
              },
              {
                id: 13,
                label: 'PAC溶液池',
              },
            ],
          },
        ],
      },
    ],
  },
]);
const changeTreeFilter = (val) => {
  console.log(val);
};
// 弹框
const id = ref();
const pageType = ref('list');
function toDetailPage(page, row) {
  pageType.value = page;
  id.value = row ? row.id : '';
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

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
            <el-button type="primary" link>删除</el-button>
          </template>
        </kr-pro-table>
      </template>
      <template v-else-if="pageType === 'detail'">
      </template>
    </kr-card>
</template>
<script setup lang="jsx">
import { ref, reactive, onMounted } from 'vue';
// 表格配置项
onMounted(() => {});
const proTable = ref();
const initParam = reactive({});
const selectProp = ref('1');
const columns= [
  { type: 'selection', label: '序号', width: 50 },
  { type: 'index', label: '序号', width: 60 },
  {
    prop: 'relatedSkillsName1',
    label: '快递单号',
    isShowInputLabel: true,
    search: {
      el: 'input',
    },
    width: 150,
    filterMultiple: false,
    filters: [
      { text: '任务告警', value: '1' },
      { text: '实时告警', value: '1' },
    ],
  },
  {
    prop: 'relatedSkillsName2',
    label: '发出地址',
    width: 200,
  },
  {
    prop: 'relatedSkillsName3',
    label: '发件人姓名',
    width: 150,
  },
  {
    prop: 'relatedSkillsName4',
    label: '发件人手机号码',
    width: 150,
  },
  {
    prop: 'relatedSkillsName5',
    label: '收件地址',
    width: 150,
  },
  {
    prop: 'relatedSkillsName6',
    label: '收件人姓名',
    width: 150,
  },
  {
    prop: 'relatedSkillsName7',
    label: '收件人手机号码',
    width: 150,
  },
  {
    prop: 'relatedSkillsName8',
    label: '快递种类',
    isShowInputLabel: true,
    width: 150,
    search: {
      el: 'select',
    },
  },
  {
    prop: 'relatedSkillsName9',
    label: ' 快递情况',
    width: 150,
    filterMultiple: false,
    isShowInputLabel: true,
    fixed: 'right',
    search: {
      el: 'select',
    },
    render(socpe) {
      return (
          <div class="alarm-tab-main">
          <span class="alarm-tag" class={socpe.row.relatedSkillsName9 !== '正常' ? 'type1' : ''}>
            {socpe.row.relatedSkillsName9}
          </span>
          </div>
      );
    },
  },
  {
    prop: 'relatedSkillsName10',
    label: '快递状态',
    fixed: 'right',
    isShowInputLabel: true,
    width: 110,
    search: {
      el: 'select',
    },
    filterMultiple: false,
    render(socpe) {
      return (
          <div class="alarm-tab-main">
            <span class="alarm-tag-line">{socpe.row.relatedSkillsName10}</span>
          </div>
      );
    },
  },
  { prop: 'operation', align: 'right', label: '操作', width: 120, fixed: 'right' },
];
const getTableList = async (params) => {
  // await getAlarmListApi(params);
  return {
    data: {
      datalist: [
        {
          relatedSkillsName1: 'sf12446467567',
          relatedSkillsName2: '广东省深圳市罗湖区翠竹街道水库新村81栋412',
          relatedSkillsName3: '张三',
          relatedSkillsName4: '13632776128',
          relatedSkillsName5: '广东省深圳市罗湖区翠竹街道水库新村107栋306',
          relatedSkillsName6: '李四',
          relatedSkillsName7: '14786439864',
          relatedSkillsName8: '顺丰快递',
          relatedSkillsName9: '正常',
          relatedSkillsName10: '已发出',
        },
        {
          relatedSkillsName1: 'sf12446467567',
          relatedSkillsName2: '广东省深圳市罗湖区翠竹街道水库新村81栋412',
          relatedSkillsName3: '张三',
          relatedSkillsName4: '13632776128',
          relatedSkillsName5: '广东省深圳市罗湖区翠竹街道水库新村107栋306',
          relatedSkillsName6: '李四',
          relatedSkillsName7: '14786439864',
          relatedSkillsName8: '顺丰快递',
          relatedSkillsName9: '丢失',
          relatedSkillsName10: '派件中',
        },
        {
          relatedSkillsName1: 'sf12446467567',
          relatedSkillsName2: '广东省深圳市罗湖区翠竹街道水库新村81栋412',
          relatedSkillsName3: '张三',
          relatedSkillsName4: '13632776128',
          relatedSkillsName5: '广东省深圳市罗湖区翠竹街道水库新村107栋306',
          relatedSkillsName6: '李四',
          relatedSkillsName7: '14786439864',
          relatedSkillsName8: '顺丰快递',
          relatedSkillsName9: '错误分配',
          relatedSkillsName10: '运输中',
        },
      ],
      total: 3,
      pageNum: 1,
      pageSize: 10,
    },
  };
};
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

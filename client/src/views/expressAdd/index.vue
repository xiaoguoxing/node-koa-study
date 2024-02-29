<script setup>
import { reactive, ref, onMounted } from 'vue';


const props = withDefaults(defineProps(), {});

const emit = defineEmits();

const open = ref(false);
const active = ref(1);

onMounted(() => {
  cronChange(formData.cron);
});
const rules = reactive({
  taskPlanName: [{ required: true, message: '请输入任务名称' }],
  orgName: [{ required: true, message: '请选择所属组织' }],
  taskType: [{ required: true, message: '请选择任务类型' }],
  inspectionWay: [{ required: true, message: '请选择巡检方式' }],
  executeType: [{ required: true, message: '请选择任务执行类型' }],
  cron: [{ required: true, message: '请选择任务执行周期 ' }],
  executeFrequency: [{ required: true, message: '请选择任务执行频率' }],
  taskStartTime: [{ required: true, message: '请选择任务开始时间' }],
  taskEndTime: [{ required: true, message: '请选择任务开始时间' }],
});
let formData = reactive({
  taskPlanName: '',
  orgName: '',
  taskType: '',
  inspectionWay: '',
  executeType: '1',
  cron: '',
  executeFrequency: '',
  taskStartTime: '',
  taskEndTime: '',
});
const formDialogRef = ref();
function selectClick() {
  formDialogRef.value.showDialog();
}
// formSelectChange
function setArr(num) {
  return new Array(num).fill({}).map((i, index) => ({ label: `${index + 1}`, value: `${index + 1}` }));
}
const cronOptions = [
  { label: '小时', value: '1' },
  {
    label: '天',
    value: '2',
    method: () => setArr(7),
  },
  {
    label: '周',
    value: '3',
    method: () => setArr(4),
  },
  {
    label: '月',
    value: '4',
    method: () => setArr(12),
  },
  { label: '年', value: '5' },
];
let cronValue = ref({ value: '', label: '' });
function cronChange(value) {
  let obj = cronOptions.find((i) => i.value === value);
  if (obj) {
    cronValue.value = obj;
    formData.executeFrequency = '';
  }
}

function cancel() {
  emit('update:pageType', 'list');
}

defineExpose({});
</script>

<template>
    <kr-card class="flex-1" header="新增快递单" header-border>
      <el-form ref="formRef" class="addPage" :rules="rules" label-suffix=" :" :model="formData" label-width="auto">
        <el-row>
          <el-col :span="8" :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
            <el-row>
              <el-col :span="24">
                <el-form-item label="发件人姓名" prop="taskPlanName">
                  <el-input v-model="formData.taskPlanName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="发件人手机号码" prop="orgName">
                  <el-input v-model="formData.orgName" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="发出地址" prop="executeFrequency">
                  <el-input v-model="formData.executeFrequency" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="收件人姓名" prop="taskStartTime">
                  <el-input v-model="formData.taskStartTime" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="收件人手机号码" prop="taskEndTime">
                  <el-input v-model="formData.taskEndTime" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="收件地址" prop="cron">
                  <el-input v-model="formData.cron" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="快递种类" prop="taskType">
                  <el-select v-model="formData.taskType">
                    <el-option label="顺丰快递" :value="1"></el-option>
                    <el-option label="b" :value="2"></el-option>
                    <el-option label="c" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="快递情况" prop="inspectionWay">
                  <el-select v-model="formData.inspectionWay">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="b" :value="2"></el-option>
                    <el-option label="c" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="快递状态" prop="executeType">
                  <el-select v-model="formData.executeType">
                    <el-option label="已发出" :value="'1'"></el-option>
                    <el-option label="定时执行" :value="'2'"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="input-sub-button">
                  <div class="input-sub-button-left"></div>
                  <div class="input-sub-button-right">
                    <el-button class="button-size" type="primary">提交</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </kr-card>
</template>

<style scoped lang="scss">
.addPage {
  :deep(.el-form-item__label) {
    color: var(--el-text-color-secondary);
  }
  :deep(.el-step) {
    .el-step__title {
      font-size: 14px;
      &.is-process {
        color: var(--el-text-color-regular);
      }
    }
    .el-step__head {
      &.is-finish {
        color: var(--el-color-white);
        .el-step__icon.is-text {
          background: var(--el-color-primary);
          box-shadow: 5px 0 0 1px #ffffff;
        }
      }
      &.is-process {
        color: var(--el-text-color-regular);
        border-color: var(--el-text-color-regular);
      }
      .el-step__icon.is-text {
        border: 1px solid;
        box-shadow: -5px 0 0 1px #ffffff;
      }
    }
  }
  .stepMargin {
    margin-bottom: 15px;
  }
  .input-sub-content {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 196px;
    margin-bottom: 30px;
    .input-sub-content-left {
      width: 100px;
    }
    .input-sub-content-right {
      flex: 1;
      padding: 22px 16px;
      background: var(--el-fill-color-light);
      :deep(.el-select),
      :deep(.el-input) {
        flex: 1;
      }
      .beforeText {
        margin-right: 5px;
      }
      .afterText {
        margin-left: 5px;
      }
    }
  }
  .input-sub-button {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    .input-sub-button-left {
      width: 100px;
    }
    .input-sub-content-right {
      flex: 1;
      .button-size {
        width: 108px;
        height: 40px;
      }
    }
  }
}
</style>

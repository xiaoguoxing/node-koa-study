<script setup async>
import {reactive, ref, onMounted} from 'vue';
import {sysDictDetailApi} from '@/api/model/sys.js'
import {expressAddApi} from "@/api/model/express.js";
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'
const router =  useRouter()
const props = withDefaults(defineProps(), {});

const emit = defineEmits();

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

const rules = reactive({
  issueAddress: [{required: true, message: '请输入'}],
  issueName: [{required: true, message: '请输入'}],
  issuePhone: [{required: true, message: '请输入'}],
  collectAddress: [{required: true, message: '请输入'}],
  collectName: [{required: true, message: '请输入'}],
  collectPhone: [{required: true, message: '请输入 '}],
  expressSituation: [{required: true, message: '请选择'}],
  expressType: [{required: true, message: '请选择'}],
  expressState: [{required: true, message: '请选择'}],
});
let formData = ref({
  issueAddress: '',
  issueName: '',
  issuePhone: '',
  collectAddress: '',
  collectName: '',
  collectPhone: '',
  expressSituation: '',
  expressType: '',
  expressState: '',
});
const formRef = ref()
async function save(){
  await formRef.value.validate()
  let {description} = await expressAddApi(formData.value)
  ElMessage.success(description)
  await router.replace('/expressManage/expressQuery')
}

</script>

<template>
  <kr-card class="flex-1" header="新增快递单" header-border>
    <el-form ref="formRef" class="addPage" :rules="rules" label-suffix=" :" :model="formData" label-width="auto">
      <el-row>
        <el-col :span="8" :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
          <el-row>
            <el-col :span="24">
              <el-form-item label="发件人姓名" prop="issueName">
                <el-input v-model="formData.issueName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发件人手机号码" prop="issuePhone">
                <el-input v-model="formData.issuePhone" placeholder="请选择"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发出地址" prop="issueAddress">
                <el-input v-model="formData.issueAddress" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="收件人姓名" prop="collectPhone">
                <el-input v-model="formData.collectPhone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="收件人手机号码" prop="collectName">
                <el-input v-model="formData.collectName" placeholder="请选择"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="收件地址" prop="collectAddress">
                <el-input v-model="formData.collectAddress" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="快递种类" prop="expressType">
                <el-select v-model="formData.expressType">
                  <el-option v-for="item in type1" :key="item._id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="快递情况" prop="expressSituation">
                <el-select v-model="formData.expressSituation">
                  <el-option v-for="item in type2" :key="item._id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="快递状态" prop="expressState">
                <el-select v-model="formData.expressState">
                  <el-option v-for="item in type3" :key="item._id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="input-sub-button">
                <div class="input-sub-button-left"></div>
                <div class="input-sub-button-right">
                  <el-button class="button-size" @click="save" type="primary">提交</el-button>
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

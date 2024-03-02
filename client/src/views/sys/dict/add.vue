<template>
  <kr-public-dialog
      v-model="show"
      :title="`${props.title}`"
      :singleClose="props.isView"
      @doSubmit="handleSubmit"
      @doClose="show = false"
      width="30%"
  >
    <el-form
        v-if="show"
        ref="ruleFormRef"
        label-width="120px"
        label-suffix=" :"
        :rules="rules"
        :disabled="props.isView"
        :model="props.rowData"
        :hide-required-asterisk="props.isView"
    >
      <el-form-item label="类型名称" prop="type">
        <el-input v-model="props.rowData.type"></el-input>
      </el-form-item>
      <el-form-item label="key" prop="key">
        <el-input v-model="props.rowData.key"></el-input>
      </el-form-item>
    </el-form>
  </kr-public-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {sysDictAddApi,sysDictUpdateApi} from "@/api/model/sys.js";

const rules = reactive({
  type: [{ required: true, message: '请输入' }],
  key: [{ required: true, message: '请输入' }],
});


// 弹窗状态
const show = ref(false);
const props = ref({
  isView: false,
  title: '',
});

// 接收父组件传过来的参数
const acceptParams = (params) => {
  props.value = params;
  show.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref();
const handleSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if(props.value.title==='新增'){
        await sysDictAddApi(props.value.rowData);
      }else {
        await sysDictUpdateApi(props.value.rowData);
      }

      ElMessage.success({ message: `${props.value.title}成功！` });
      props.value.getTableList();
      show.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams,
});
</script>

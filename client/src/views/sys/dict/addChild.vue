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
        :model="props.row"
        :hide-required-asterisk="props.isView"
    >
      <el-form-item label="类型名称" prop="label">
        <el-input v-model="props.row.label"></el-input>
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="props.row.value"></el-input>
      </el-form-item>
    </el-form>
  </kr-public-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {sysDictChildAddApi, sysDictUpdateChildApi} from "@/api/model/sys.js";

const rules = reactive({
  label: [{ required: true, message: '请输入' }],
  value: [{ required: true, message: '请输入' }],
});


// 弹窗状态
const show = ref(false);
const props = ref({
  isView: false,
  title: '',
  id: '',
  row:{label:'',value:''}
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
        await sysDictChildAddApi({...props.value.row,id:props.value.id});
      }else {
        await sysDictUpdateChildApi({...props.value.row,id:props.value.id});
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

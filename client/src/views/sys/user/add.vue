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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="props.rowData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="props.rowData.password"></el-input>
      </el-form-item>
      <el-form-item label="是否管理员" prop="isAdmin">
        <el-radio-group v-model="props.rowData.isAdmin" class="ml-4">
          <el-radio :label="true" size="large">是</el-radio>
          <el-radio :label="false" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </kr-public-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {userUpdateApi,userDetailApi} from "@/api/model/user.js";

const rules = reactive({
  username: [{ required: true, message: '请输入' }],
  password: [{ required: true, message: '请输入' }],
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
      await userUpdateApi(props.value.rowData);
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

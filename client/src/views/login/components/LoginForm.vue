<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="密码"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <template v-if="!isreg">
      <el-button  round @click="regBtn" size="large">注册</el-button>
      <el-button icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
        登录
      </el-button>
    </template>
   <template v-else>
     <el-button icon="UserFilled" round @click="regBtn" size="large"  :loading="loading">
       登录
     </el-button>
     <el-button  round @click="login(loginFormRef)" type="primary" size="large">注册</el-button>
   </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import {loginApi,registerApi} from "@/api/model/login.js";

const router = useRouter();

// 定义 formRef（校验规则）
const loginFormRef = ref();
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const loading = ref(false);
const isreg = ref(false);
const loginForm = reactive({ username: '', password: '' });
const login = async (formEl) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    loading.value = true;
    try {
      let res;
      if(isreg.value){
        res = await registerApi(loginForm)
      }else {
        res = await loginApi(loginForm)
      }
      sessionStorage.setItem('userInfo',JSON.stringify(res.data))
      // 4.跳转到首页
      ElNotification({
        title: '',
        message: '欢迎登录 快递收发系统',
        type: 'success',
        duration: 3000,
      });
      await router.replace('/layout')
    } finally {
      loading.value = false;
    }
  }catch (e) {

  }

};
function regBtn(){
  isreg.value = !isreg.value
  resetForm(loginFormRef.value)
}
// resetForm
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  // 监听enter事件（调用登录）
  document.onkeydown = (e) => {
    e = window.event || e;
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>

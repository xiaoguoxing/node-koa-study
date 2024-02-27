<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="account">
      <el-input v-model="loginForm.account" placeholder="用户名">
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
    <el-button  round @click="resetForm(loginFormRef)" size="large">注册</el-button>
    <el-button icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
// tsconfig disabled

// import md5 from 'js-md5';
const router = useRouter();

// 定义 formRef（校验规则）
const loginFormRef = ref();
const loginRules = reactive({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const loading = ref(false);
const loginForm = reactive({ account: '', password: '' });
const login = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登录接口
      /*const formData = {
        account: loginForm.account,
        password: (await encryptPassword(loginForm.password)),
      };*/
      // await loginApi(formData);
      // TODO:后端改接口接收登录信息
      // globalStore.setToken(data.access_token);

      // 2.添加动态路由


      // 3.清除上个账号的 tab 信息
      // tabsStore.closeMultipleTab();

      // 4.跳转到首页
      ElNotification({
        title: '',
        message: '欢迎登录 智能巡检',
        type: 'success',
        duration: 3000,
      });
      await router.replace('/layout')
    } finally {
      loading.value = false;
    }
  });
};

// resetForm
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 传给服务端加密后的密码
const encryptPassword = (val) => {
  return new Promise((resolve, reject) => {
    /*getPublicKeyApi()
      .then((res) => {
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(res.data); //设置公钥
        let rsaPassWord = encryptor.encrypt(val);
        resolve(rsaPassWord);
      })
      .catch((err) => {
        reject(err);
      });*/
  });
};
onMounted(() => {
  // 监听enter事件（调用登录）
  document.onkeydown = (e: any) => {
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

<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left0.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <h2 class="logo-text">快递收发系统</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from './components/LoginForm.vue';
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

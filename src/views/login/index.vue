<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Vue3-Element-Admin</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="Username"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="Password"
          :type="passwordType"
          :prefix-icon="Lock"
          @keyup.enter.native="handleLogin"
        >
          <template #suffix>
            <el-icon @click="showPwd">
              <View />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="handleLogin"
        style="width: 100%; margin-bottom: 30px"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { FormInstance } from 'element-plus';
  import { validateUsername } from '@/utils/validate';
  import { User, Lock, View } from '@element-plus/icons-vue';

  const loading = ref<boolean>(false);
  const passwordType = ref<string>('password');

  const loginFormRef = ref<FormInstance>();
  const loginForm = reactive({
    username: '',
    password: '',
  });

  const validUsername = (rule: any, value: string, callback: any) => {
    if (validateUsername(value)) {
      callback(new Error('Please Input the correct Username'));
    } else {
      callback();
    }
  };

  const validPassword = (rule: any, value: string, callback: any) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'));
    } else {
      callback();
    }
  };

  const loginRules = reactive({
    username: [
      {
        validator: validUsername,
        trigger: 'blur',
      },
    ],
    password: [
      {
        validator: validPassword,
        trigger: 'blur',
      },
    ],
  });

  const showPwd = () => {
    if (passwordType.value === 'password') {
      passwordType.value = '';
    } else {
      passwordType.value = 'password';
    }
  };

  const handleLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true;
        alert('login');
      } else {
        alert('error');
        return false;
      }
    });
  };
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>

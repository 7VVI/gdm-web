<script setup lang="ts">
import { reactive, computed} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {defaultSettings} from "@/constants";
import { useRouter } from "vue-router";

const route = useRouter();
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
  route.push({ path: "/layout", replace: true });
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>

<template>
  <div class="content">
    <div class="project-name">{{defaultSettings.APP_NAME}}</div>
    <div class="login-form">
      <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <a-form-item
            label="账号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox style="margin-left: 5%" v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" style="margin-left: 10%" href="">忘记密码</a>
        </a-form-item>

        <a-form-item>
          <div style="display: flex">
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button"
                      style="margin-left: 5%">
              登录
            </a-button>
            <div style="flex: 1"></div>
            <a href="" style="margin-right: 10%">注册!</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
body, html {
  margin: 0;
  padding: 0;

  .content {
    display: flex;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;

    .login-form {
      //background-color: #fbc2eb;

    }
    .project-name{
      margin-bottom: 5%;
      //background-color: #a6c1ee;
      font-weight: bold;
      font-size: 4rem;
      font-family: "Noto Serif SC", serif;
      color: #fbc2eb;
    }
  }

}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
<template>
  <div class="content">
    <div class="registy-form">
      <a-form
          :model="formState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish"
      >
        <a-form-item :name="['user', 'name']" label="账号" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.name"/>
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="密码">
          <a-input v-model:value="formState.user.website"/>
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="再次输入密码">
          <a-input v-model:value="formState.user.website"/>
        </a-form-item>
        <a-form-item :name="['user', 'email']" label="邮箱" :rules="[{ type: 'email' }]">
          <a-input v-model:value="formState.user.email"/>
        </a-form-item>
        <a-form-item :name="['user', 'email']" label="手机" :rules="[{ type: 'email' }]">
          <a-input v-model:value="formState.user.email"/>
        </a-form-item>
        <a-form-item :name="['user', 'age']" label="年龄" :rules="[{ type: 'number', min: 0, max: 99 }]">
          <a-input-number v-model:value="formState.user.age"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  user: {
    name: '',
    age: undefined,
    email: '',
    mobil: '',
    password: '',
    checkPassword: '',
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%);
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;

  .registy-form {
    //background-color: #fbc2eb;

  }
}
</style>
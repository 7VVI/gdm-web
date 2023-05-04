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
          <a-input v-model:value="formState.user.username"/>
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="密码">
          <a-input v-model:value="formState.user.password"/>
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="再次输入密码">
          <a-input v-model:value="formState.user.checkPassword"/>
        </a-form-item>
        <a-form-item :name="['user', 'name']" label="用户名" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.name"/>
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model:value="formState.user.gender">
            <a-radio value="0">男</a-radio>
            <a-radio value="1">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :name="['user', 'email']" label="邮箱" :rules="[{ type: 'email' }]">
          <a-input v-model:value="formState.user.email"/>
        </a-form-item>
        <a-form-item :name="['user', 'mobile']" label="手机">
          <a-input v-model:value="formState.user.mobile"/>
        </a-form-item>
        <a-form-item :name="['user', 'age']" label="年龄" :rules="[{ type: 'number', min: 0, max: 120 }]">
          <a-input-number v-model:value="formState.user.age"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" @click="handle" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import {HttpManager} from "@/api/system";
import {userStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import Swal from "sweetalert2";
const route = useRouter();
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const validateMessages = {
  required: '${label} 必须输入!',
  types: {
    mobile:'${label} 格式不正确!',
    email: '${label} 格式不正确!',
    number: '${label} 请输入有效的数字!',
  },
  number: {
    range: '${label}在 ${min} 和 ${max}',
  },
};

const formState = reactive({
  user: {
    name:'',
    username: '',
    age: undefined,
    email: '',
    mobile: '',
    password: '',
    checkPassword: '',
    gender:''
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const  handle=async ()=>{
 let res= await HttpManager.registry(formState.user as any)
  if(res.code==200){
    await Swal.fire(
        {
          title: '注册成功！',
          icon: 'success',
        }
    )
    await route.push({path: "/login", replace: true});
  }else {
    await Swal.fire(
        {
          title: '注册失败，参数错误',
          icon: 'error',
        }
    )
  }
}

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
<script setup lang="ts">
import {ref} from "vue";
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
let local=ref(zhCN);
</script>

<template>
  <a-config-provider :locale="local">
  <RouterView />
  </a-config-provider>
</template>

<style lang="less" scoped>
</style>
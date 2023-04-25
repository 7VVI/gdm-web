<template>
  <Spin :tip="tip" :spinning="spinning">
    <p class="spin-content"></p>
  </Spin>

</template>

<script setup lang="ts">
let tip = '加载中...';
let spinning = true

</script>

<style lang="less" scoped>
body, html {
  margin: 0;
  padding: 0;


}

</style>
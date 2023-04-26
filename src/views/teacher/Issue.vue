<template>
  <div class="quick-access">
    <div class="quick-access-item" v-for="(item, index) in items" :key="index">
      <a :href="item.link" target="_blank"><i :class="item.icon"></i></a>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.quick-access {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.quick-access-item {
  text-align: center;
  margin: 10px;
}
.quick-access-item p {
  margin: 5px;
}
i {
  font-size: 24px;
}
</style>

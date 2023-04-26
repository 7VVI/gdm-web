<template>
  <div class="quick-access">
    <div class="quick-access-item" v-for="(item, index) in items" :key="index">
      <a :href="item.link" target="_blank"><img style="height: 10px;width: 10px" :src="item.image" alt="" /></a>
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
  height: 100px;
}
.quick-access-item {
  text-align: center;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}
.quick-access-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 12px 20px rgba(0, 0, 0, 0.1);
}
.quick-access-item p {
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
img {
  object-fit: cover;
}
</style>

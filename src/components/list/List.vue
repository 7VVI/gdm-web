<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <a class="title" :href="item.link">{{ item.title }}</a>
        <div class="time">{{ item.time }}</div>
      </li>
    </ul>
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
.title {
  float: left;
  width: 70%;
}
.time {
  float: right;
  width: 30%;
  text-align: right;
}
li:hover .title {
  color: blue;
}
li:hover .time {
  color: blue;
}
</style>

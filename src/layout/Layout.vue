<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <Logo :collapsed="collapsed"/>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template v-for="item in Menus" :key="item.menuId">
          <template v-if="!item.children">
            <a-menu-item :key="item.menuId">
              <template #icon>
                <i :class='`iconfont ${item.icon}`' :style="`color: ${item.iconColor}`"></i>
              </template>
              <router-link :to="item.path || item.link">{{ item.title }}</router-link>
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :key="item.menuId" :menu-info="item"/>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;display: flex;justify-items: center;align-items: center;padding-left: 1%" >
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
        <div style="flex: 1"></div>
        <a-avatar
            style="margin-right: 2%"
            class="avatar"
            src="https://picgo-liziyuan.oss-cn-hangzhou.aliyuncs.com/img202303191543178.png"
        />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '16px',background: '#f0f2f5', minHeight: '280px', }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import {onMounted, ref} from 'vue';
import Logo from "@/layout/Logo.vue";
import {menuStore} from "@/stores/menuStore";

let store=menuStore();
let Menus=ref();
let selectedKeys = ref<string[]>(['1']);
let collapsed = ref<boolean>(false);

onMounted(()=>{
  Menus.value= store.menu
  // console.log(Menus)
})

</script>
<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
}
</style>

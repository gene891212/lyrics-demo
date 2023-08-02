<template>
  <el-menu class="navbar" mode="horizontal" :default-active="activeIndex">
    <el-menu-item index="1">
      <router-link to="/" class="router-link">Home</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <!-- <router-link to="/song" class="router-link">Song</router-link> -->
      Song
    </el-menu-item>
    <el-menu-item index="3" class="router-link">
      <router-link to="/about" class="router-link">About</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const activeIndex = ref("1");
</script>

<style scoped>
.navbar {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 10;
}

@media screen and (min-width: 960px) {
  .navbar {
    position: fixed;
  }
}

.router-link {
  text-decoration: none;
}
</style>

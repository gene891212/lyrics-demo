<template>
  <!-- <header class="navbar">
    <div class="navbar-wrapper">
      <div class="navbar-container">Header t.vue</div>
    </div>
  </header>-->
  <el-menu class="navbar" mode="horizontal" :default-active="activeIndex">
    <el-menu-item index="1">Element Plus</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>

  <div class="sidebar-toggle" @click="toggleSidebar">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="11" height="2" fill="#606266" />
      <rect x="2" y="11" width="14" height="2" fill="#606266" />
      <rect x="2" y="15" width="8" height="2" fill="#606266" />
      <rect x="2" y="3" width="16" height="2" fill="#606266" />
    </svg>
  </div>

  <el-scrollbar class="sidebar" ref="sidebar">
    <aside>
      <div class="sidebar-groups">
        <p v-for="item in 100" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </aside>
  </el-scrollbar>

  <main class="page-conetent">
    <div class="content-wrapper">
      <div class="content-container">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity";

const activeIndex = ref("1");
let toggle = 0;

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (toggle % 2) {
    sidebar.classList.remove("open");
  } else {
    sidebar.classList.add("open");
  }
  toggle = toggle + 1;
}
</script>

<style scoped>
@import "@/assets/base.css";

.navbar {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 10;
}

.sidebar {
  position: fixed;
  height: 100%;
  z-index: 40;
  transform: translate(-100%);
  width: 300px;
  padding: 48px 32px 0;
  margin: 0;
  transition: opacity 0.5s, transform 0.25s ease;
  border: 1px solid blue;
  background-color: white;
  top: 0;
  left: 0;
}
.sidebar .sidebar-groups {
  padding: 0 0 5rem;
}

.sidebar-toggle {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  background-color: transparent;
  padding: 10px;
}
.sidebar.open {
  transform: translate(0);
  width: 300px;
}

.page-conetent {
  position: relative;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 15px 96px;
}

@media screen and (min-width: 960px) {
  .navbar {
    position: fixed;
  }

  .sidebar {
    top: 60px;
    transform: translate(0);
  }
  .sidebar-toggle {
    display: none !important;
  }

  .page-conetent {
    padding-top: 60px;
    padding-left: 300px;
  }
}

@media screen and (min-width: 768px) {
  .content-wrapper {
    padding: 48px 32px 96px;
  }
}
</style>

<template>
  <button class="sidebar-toggle" @click="toggle = !toggle">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="11" height="2" fill="#606266" />
      <rect x="2" y="11" width="14" height="2" fill="#606266" />
      <rect x="2" y="15" width="8" height="2" fill="#606266" />
      <rect x="2" y="3" width="16" height="2" fill="#606266" />
    </svg>
  </button>

  <el-scrollbar class="sidebar" :class="{'open': toggle}">
    <aside>
      <div class="sidebar-groups">
        <p v-for="item in 100" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </aside>
  </el-scrollbar>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const toggle = ref(false);
</script>

<style scoped>
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
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  background-color: transparent;
  padding: 10px;
  border: 0;
}

.sidebar.open {
  transform: translate(0);
  width: 300px;
}

@media screen and (min-width: 960px) {
  .sidebar {
    top: 60px;
    transform: translate(0);
  }
  .sidebar-toggle {
    display: none !important;
  }
}
</style>

<template>
  <el-scrollbar height="100vh">
  <AppHeader />
  <AppSidebar />
  <main class="page-conetent">
    <div class="content-wrapper">
      <div class="content-container">
        <RouterView />
      </div>
    </div>
  </main>
  </el-scrollbar>
</template>

<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./Header.vue";
import AppSidebar from "./Sidebar.vue";
</script>

<style>
@import "@/assets/base.css";

.page-conetent {
  position: relative;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 15px 96px;
}

@media screen and (min-width: 960px) {
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

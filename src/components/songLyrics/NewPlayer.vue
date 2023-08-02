<template>
  <div class="video-container">
    <div ref="ytPlayer"></div>
  </div>
  <!-- Controls -->
  <el-collapse v-model="activeNames">
    <el-collapse-item title="Controls" name="1">
      <!-- <el-button @click="emits('seekTo', lrc.previousLine(currentTime).time)">Previous</el-button>
      <el-button @click="emits('toggleStatus')">Pause/Play</el-button>
      <el-button @click="emits('seekTo', lrc.nextLine(currentTime).time)">Next</el-button> -->
      <el-switch v-model="repeat" @change="repeatCurrentLine" active-text="Repeat" class="switch" />
      <el-switch v-model="foucs" active-text="Focus" class="switch" />
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
// Import the 'usePlayer' function
import { usePlayer, Player } from "@vue-youtube/core";
import { ref } from "vue";

// Use a template ref to reference the target element
const ytPlayer = ref();
let player: Player;

// Call the 'usePlayer' function with the desired video ID and target ref
const { onReady } = usePlayer("yFPmQsDOe40", ytPlayer);
onReady((event) => {
  player = event.target;
  console.log(player);
});

// Controls and Settings
const activeNames = ref(["1"]);
const repeat = ref(false);
const foucs = ref(false);

const repeatCurrentLine = () => {};
</script>

<style>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
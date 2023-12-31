<template>
  <el-collapse v-model="activeNames">
    <!-- Player Controls -->
    <el-collapse-item
      title="Controls"
      name="1"
    >
      <el-button @click="emits('seekTo', lrc.previousLine(currentTime).time)">Previous</el-button>
      <el-button @click="emits('toggleStatus')">Pause/Play</el-button>
      <el-button @click="emits('seekTo', lrc.nextLine(currentTime).time)">Next</el-button>
      <el-switch
        v-model="repeat"
        @change="repeatCurrentLine"
        active-text="Repeat"
        class="switch"
      />
      <el-switch
        v-model="foucs"
        active-text="Focus"
        class="switch"
      />
    </el-collapse-item>

    <!-- Lyrics Style Settings -->
    <el-collapse-item
      title="Settings"
      name="2"
    >
      <el-form
        :inline="true"
        :model="settings"
      >
        <el-form-item label="Alignment">
          <el-select v-model="settings.alignment">
            <el-option
              v-for="n in ['full', 'clip', 'mini']"
              :key="n"
              :label="capitalize(n)"
              :value="n"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="View mode">
          <el-select v-model="settings.viewMode">
            <el-option
              v-for="n in ['center', 'left', 'right']"
              :key="n"
              :label="capitalize(n)"
              :value="n"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>

  <!-- Lyrics -->
  <div
    class="lrc"
    ref="lyrics"
    :class="['lrc--' + settings.alignment, 'lrc--' + settings.viewMode]"
  >
    <!-- Active line when current lyrics index match the lyrics line -->
    <div
      class="lrc__line"
      ref="lines"
      v-for="(line, index) in lrc.lines"
      :class="{ 'lrc__line--active': index === currentIndex }"
      :key="line"
      @click="emits('seekTo', line.time)"
    >
      <span class="lrc__inline">{{ line.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { watch, watchEffect } from "vue";
import LRC from "lrc.js/dist/lrc.esm.js";

const emits = defineEmits(["seekTo", "toggleStatus"]);
const props = defineProps(["lyrics", "time"]);

// Lyrics
const lrc = LRC.parse(props.lyrics);
const lyrics = ref([]);
const lines = ref([]);
const currentTime = ref(null);
const currentIndex = ref(null);

let repeatLine = null;
let currentLine = null;

// Player Controls
const activeNames = ref(["1"]);
const repeat = ref(false);
const foucs = ref(false);
const repeatCurrentLine = () => {
  if (repeat.value) {
    // remember current line to repeat
    repeatLine = lrc.currentLine(currentTime.value);
  }
};

// Lyrics Style Settings
const settings = reactive({ alignment: "clip", viewMode: "center" });
const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

// event
watch(props, (newVal) => {
  currentTime.value = newVal.time;
  currentLine = lrc.currentLine(currentTime.value);
  if (repeat.value) {
    if (repeatLine.idx !== currentLine.idx) {
      emits("seekTo", repeatLine.time);
    }
  }
  // synchronize the active line
  currentIndex.value = lrc.findIndex(currentTime.value);
});

// watch the line change to focus the line in center
watchEffect(() => {
  if (foucs.value) {
    // if lrc library found lyrics
    if (currentIndex.value != -1) {
      let activeLine = lines.value[currentIndex.value];
      let activeLineOffset = activeLine.offsetTop + activeLine.offsetHeight / 2;

      lyrics.value.scrollTop = activeLineOffset - lyrics.value.offsetHeight / 2;
    }
  }
});
</script>

<style scoped>
.switch {
  margin-left: 12px;
}

/* lyrics */
.lrc {
  margin: 10px 0;
  padding: 0 0.5em;
  border: 1px solid black;
}

.lrc--center {
  text-align: center;
}

.lrc--left {
  text-align: left;
}

.lrc--right {
  text-align: right;
}

/* full view mode (default) */
.lrc--full {
  height: auto;
}

/* clip view mode */
.lrc--clip {
  height: 20rem;
  overflow: hidden scroll;
  scroll-behavior: smooth;
}

/* mini view mode */
.lrc--mini {
  height: 1.5rem;
}

.lrc__line {
  height: 1.5rem;
}

.lrc__line--active {
  background-color: rgba(0, 0, 0, 0.1);
  color: #04a8a8;
}

.lrc--mini .lrc__line {
  display: none;
}

.lrc--mini .lrc__line--active {
  display: block;
  background: transparent;
}
</style>

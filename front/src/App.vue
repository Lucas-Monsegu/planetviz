<template>
  <div id="app">
    <vue-particles
      class="particle-background"
      color="#dedede"
      :lineOpacity="0"
      :moveSpeed="1"
    ></vue-particles>
    <v-app dark>
      <toolbar />
      <v-content>
        <transition
          name="stateFade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/Toolbar.vue";

export default Vue.extend({
  name: "app",
  components: { Toolbar }
});
</script>

<style>
.theme--dark.application {
  background-color: rgba(0, 0, 0, 0);
}
.particle-background {
  position: absolute;
  background-color: #101010;
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  z-index: -1;
}
.transparent {
  background-color: #424242aa !important;
}
html {
  overflow-y: hidden !important;
}
.stateFade-enter-active,
.stateFade-leave-active {
  transition: all 0.125s ease;
}
.stateFade-enter {
  opacity: 0;
  transform: translateX(100px);
}
.stateFade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>

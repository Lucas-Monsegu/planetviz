<template>
  <v-toolbar>
    <v-toolbar-side-icon to="/">
      <div id="animeHome" />
    </v-toolbar-side-icon>
    <v-toolbar-title>
      <Logo />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="quizz">Quizz</v-btn>
      <v-toolbar-side-icon>
        <v-dialog
          v-model="dialog"
          :close-on-content-click="false"
          offset-y
          bottom
          left
          :key="0"
          max-width="600"
        >
          <v-btn slot="activator" icon class="ma-0">
            <v-icon>mdi-help</v-icon>
          </v-btn>
          <Tutorial @close="dialog = false" />
        </v-dialog>
      </v-toolbar-side-icon>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { animeHome, createElements } from "@/components/animations/AnimHome";
import Tutorial from "@/components/Tutorial.vue";
import Logo from "./LogoTextSvg";

export default {
  name: "Toolbar",
  components: {
    Tutorial,
    Logo
  },
  mounted() {
    createElements();
    animeHome();
    if (!localStorage.getItem("tutorial")) {
      localStorage.setItem("tutorial", "done");
      this.$nextTick(() => {
        this.dialog = true;
      });
    }
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style>
#animeHome {
  position: relative;
  height: 100%;
  width: 20px;
  margin-left: 13px;
  margin-top: 13px;
}
.particule {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.1rem;
  height: 0.1rem;
  margin: -0.5rem 0 0 -0.5rem;
  border: 1px solid currentColor;
  transform: scale(0);
}
</style>
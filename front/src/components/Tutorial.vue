<template>
  <v-card>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >Look for a location</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >Choose a data type</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Have fun!</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card height="200px">
            <v-img
              src="/static/tuto1.png"
              contain
              height="100%"
              width="100%"
            />
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card height="200px">
            <v-img
              src="/static/tuto2.png"
              contain
              height="100%"
              width="100%"
            />
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card height="200px">
            <v-img
              src="/static/tuto3.png"
              contain
              height="100%"
              width="100%"
            />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-layout justify-center>
      <v-btn
        @click="e1--"
        :disabled="e1 === 1"
        fab
        dark
        small
        color="primary"
      >
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        @click="e1++"
        v-if="e1 < 3"
        fab
        dark
        small
        color="primary"
      >
        <v-icon dark>mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn
        @click="close"
        v-else
        fab
        dark
        small
        color="success"
      >
        <v-icon dark>check</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Tutorial",
  data() {
    return {
      e1: 1
    };
  },
  methods: {
    close() {
      this.$emit("close");
      setTimeout(() => {
        this.e1 = 1;
      }, 500);
    }
  }
});
</script>
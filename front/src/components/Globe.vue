<template>
  <div id="globes">
    <div
      class="in"
      id="globe1"
    >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { DAT, target } from "../libs/new/globe";
import { THREE2 as THREE } from "../libs/new/Three/ThreeWebGL";
import { mapGetters } from "vuex";
import { TWEEN } from "../libs/new/Tween";

export default Vue.extend({
  data() {
    return {};
  },
  props: {
    location: String
  },
  watch: {
    location: "moveToLocation"
  },
  computed: {
    ...mapGetters(["selectedData", "getLocation"])
  },
  methods: {
    moveToLocation(alpha2: string): void {
      const location = this.getLocation(alpha2);
      if (location != undefined) {
        target.x = location.glong;
        target.y = location.glat;
      }
    },
    display() {
      let globeEl = document.getElementById("globe1");
      let globe = DAT.Globe(globeEl);
      axios.get("/static/test.json").then(res => {
        for (const el of res.data) {
          globe.addData(el[1], { format: "magnitude", name: el[0] });
        }
        globe.createPoints();
        globe.animate();
      });
    }
  },
  mounted() {
    var settime = function(globe: any, t: number) {
      return function() {
        console.log("settime call");
        new TWEEN.Tween(globe)
          .to({ time: t / 3 }, 500)
          .easing(TWEEN.Easing.Cubic.EaseOut)
          .start();
      };
    };
    this.display();
    // let globeEl = document.getElementById("globe1");
    // let globe = DAT.Globe(globeEl);
    // axios.get("/static/test.json").then(res => {
    //   for (const el of res.data) {
    //     globe.addData(el[1], { format: "magnitude", name: el[0] });
    //   }
    //   globe.createPoints();
    //   globe.animate();
    // });
    // setTimeout(() => {
    //   globe = DAT.Globe(globeEl);
    //   axios.get("/static/test.json").then(res => {
    //     for (const el of res.data) {
    //       globe.addData(el[1], { format: "magnitude", name: el[0] });
    //     }
    //     globe.createPoints();
    //     globe.animate();
    //   });
    // }, 3000);
    // let globeEl2 = document.getElementById("globe4");
    // globe = DAT.Globe(globeEl2);
    // axios.get("/static/test2.json").then(res => {
    //   for (const el of res.data) {
    //     globe.addData(el[1], { format: "magnitude", name: el[0] });
    //   }
    //   globe.createPoints();
    //   globe.animate();
    // });
  }
});
</script>


<style scoped>
#globes {
  height: 100%;
  width: 100%;
}
.in {
  height: 100%;
  width: 100%;
}
</style>
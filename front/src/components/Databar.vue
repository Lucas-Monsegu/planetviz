<template>
  <v-flex
    xs2
    pa-2
  >
    <v-card
      height="100%"
      class="transparent"
    >
      <v-autocomplete
        class="pa-3"
        color="info"
        :items="Object.values(getLocations)"
        item-text="name"
        item-value="alpha2"
        label="Search location"
        persistent-hint
        outline
        hide-details
        prepend-inner-icon="mdi-map-marker"
        @input="$emit('selectCountry', $event)"
      >
        <template v-slot:item="data">
          <v-list-tile-avatar>
            <v-img :src="`https://lipis.github.io/flag-icon-css/flags/4x3/${data.item.alpha2.toLowerCase()}.svg`" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="data.item.name"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
      <v-divider />
      <v-text-field
        class="pa-3"
        color="info"
        height="40px"
        hide-details
        outline
        clearable
        label="Search type"
        prepend-inner-icon="search"
        @input="updateFilter"
        @keypress.enter="selectType"
      ></v-text-field>
      <v-divider />
      <v-list>
        <v-fade-transition group>
          <v-list-tile
            ripple
            v-for="(item, index) in filteredList"
            :key="index"
            :class="{ selected: $store.getters.selectedDataType === item.dataType }"
            @click="updateSelectedData(item.dataType)"
          >
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.label}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-fade-transition>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import { DataEnum } from "../model/DataEnum/DataEnum";
import { DAT, target } from "../libs/new/globe";
import { THREE2 as THREE } from "../libs/new/Three/ThreeWebGL";
import { TWEEN } from "../libs/new/Tween";
import { mapGetters } from "vuex";
import axios from "axios";
export default Vue.extend({
  name: "Databar",
  data() {
    return {
      globedata: "",
      filter: "",
      list: [
        { icon: "mdi-weather-windy", label: "Wind", dataType: DataEnum.Wind },
        {
          icon: "mdi-water-percent",
          label: "Humidity",
          dataType: DataEnum.Humidity
        },
        {
          icon: "mdi-air-filter",
          label: "Pressure",
          dataType: DataEnum.Pressure
        },
        {
          icon: "mdi-thermometer",
          label: "Temperature",
          dataType: DataEnum.Temperature
        },
        {
          icon: "mdi-periodic-table-co2",
          label: "Carbon",
          dataType: DataEnum.Carbon
        },
        {
          icon: "mdi-weather-pouring",
          label: "Rain",
          dataType: DataEnum.Rain
        },
        {
          icon: "mdi-water-pump",
          label: "Dew",
          dataType: DataEnum.Dew
        },
        {
          icon: "mdi-water-pump",
          label: "Ozone",
          dataType: DataEnum.O3
        },
        {
          icon: "mdi-water-pump",
          label: "PM10",
          dataType: DataEnum.PM10
        },
        {
          icon: "mdi-water-pump",
          label: "PM25",
          dataType: DataEnum.PM25
        },
        {
          icon: "mdi-water-pump",
          label: "Air quality",
          dataType: DataEnum.AirQuality
        },
        {
          icon: "mdi-water-pump",
          label: "Nitrogen Dioxyde",
          dataType: DataEnum.NO2
        },
        {
          icon: "mdi-water-pump",
          label: "Carbon Oxyde",
          dataType: DataEnum.NO2
        }
      ]
    };
  },
  computed: {
    filteredList(): any {
      return this.list.filter((obj: any) =>
        obj.label.toLowerCase().includes(this.filter)
      );
    },
    ...mapGetters(["getLocations"])
  },
  mounted() {
    axios.get("/static/test.json").then(res => (this.globedata = res.data));
  },
  methods: {
    selectType(): void {
      if (this.filteredList.length > 0) {
        this.updateSelectedData(this.filteredList[0].dataType);
      }
    },
    updateFilter(s: string): void {
      this.filter = (s || "").toLowerCase();
    },
    updateSelectedData(selectedData: DataEnum): void {
      //   console.log(selectedData);
      //   let a = document.getElementById("globe1");
      //   let b = document.getElementById("globe2");
      //   let c = document.getElementById("globe3");
      //   let d = document.getElementById("globe4");
      //   if (a) a.style.display = "none";
      //   if (b) b.style.display = "none";
      //   if (c) c.style.display = "none";
      //   if (d) d.style.display = "none";
      //   switch (selectedData) {
      //     case 2:
      //       if (a) a.style.display = "block";
      //       break;
      //     case 3:
      //       if (b) b.style.display = "block";
      //       break;
      //     case 4:
      //       if (c) c.style.display = "block";
      //       break;
      //     case 5:
      //       if (d) d.style.display = "block";
      //       break;
      //   }
      let globeEl = document.getElementById("globe1");
      let globe = DAT.Globe(globeEl);
      for (const el of this.globedata) {
        globe.addData(el[1], { format: "magnitude", name: el[0] });
      }
      globe.createPoints();
      globe.animate();
      this.$store.dispatch("setSelectedData", selectedData);
    },
    test(ev: any) {
      console.log(ev);
    }
  }
});
</script>

<style scoped>
.selected {
  background: #757575;
}
.search-field {
  height: 20px;
}
</style>
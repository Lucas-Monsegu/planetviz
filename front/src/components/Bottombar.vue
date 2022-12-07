<template>
  <v-card class="pa-2 ma-2 transparent">
    <div class="headline text-xs-center" v-text="usedDateLocal" />
    <v-slider min="0" :max="getSliderSteps" v-model="timelineValue" @change="changeTimeline"></v-slider>
    <v-layout justify-space-between>
      <v-flex shrink>
        <v-btn color="success" @click="playTimeline" :disabled="getSliderSteps === 0">
          <v-icon left>mdi-play</v-icon>Play
        </v-btn>
        <v-btn color="error" @click="stopTimeline">
          <v-icon left>mdi-stop</v-icon>Stop
        </v-btn>
      </v-flex>

      <v-flex shrink>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="startDateLocal"
          lazy
          offset-y
          top
          full-width
          min-width="290px"
          @update:returnValue="setStartDate"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDateLocal"
              solo
              label="Start date"
              prepend-inner-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDateLocal" :type="pickerType" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(startDateLocal)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex shrink>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="endDateLocal"
          lazy
          offset-y
          top
          full-width
          min-width="290px"
          @update:returnValue="setEndDate"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endDateLocal"
              solo
              label="End date"
              prepend-inner-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endDateLocal" :type="pickerType" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu2.save(endDateLocal)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex shrink>
        <v-btn-toggle class="ma-2">
          <v-btn flat value="day" @click="setStep(1)">Day</v-btn>
          <v-btn flat value="month" @click="setStep(2)">Month</v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { StepEnum } from "../model/StepEnum/DataEnum";

export default Vue.extend({
  name: "Bottombar",
  data() {
    return {
      startDateLocal: new Date().toISOString().substr(0, 10),
      endDateLocal: this.$store.getters.getEndDate.toISOString().substr(0, 10),
      usedDate: new Date(),
      menu: false,
      menu2: false,
      timelineValue: 0,
      timer: 0
    };
  },
  methods: {
    ...mapActions(["setStep", "setStartDate", "setEndDate", "setUsedDate"]),
    playTimeline(): any {
      const usedDate: Date = this.getUsedDate;
      this.timer = setInterval(() => {
        if (this.timelineValue === this.getSliderSteps - 1) {
          this.stopTimeline();
        }

        const startDate: Date = this.getStartDate;

        if (this.pickerType === "month") {
          this.usedDate = new Date(usedDate.setMonth(usedDate.getMonth() + 1));
        } else if (this.pickerType === "date") {
          this.usedDate = new Date(usedDate.setDate(usedDate.getDate() + 1));
        }

        this.$store.dispatch("setUsedDate", this.usedDate);
        this.timelineValue++;
      }, 1000);
    },
    stopTimeline(): any {
      clearInterval(this.timer);
    },
    changeTimeline(timelineValue: number): any {
      const usedDate: Date = new Date(this.getUsedDate);
      const startDate: Date = new Date(this.getStartDate);
      console.log(startDate);
      if (this.pickerType === "month") {
        this.usedDate = new Date(
          startDate.setMonth(startDate.getMonth() + timelineValue)
        );
        console.log(this.usedDate);
      } else if (this.pickerType === "date") {
        this.usedDate = new Date(
          startDate.setDate(startDate.getDate() + timelineValue)
        );
      }

      this.$store.dispatch("setUsedDate", this.usedDate);
    }
  },
  computed: {
    ...mapGetters({
      step: "step"
    }),
    getSliderSteps(): number {
      if (this.pickerType === "date") {
        const res = Math.abs(
          this.getEndDate.getTime() - this.getStartDate.getTime()
        );
        return Math.round(res / (1000 * 3600 * 24));
      } else {
        return (
          (this.getEndDate.getFullYear() - this.getStartDate.getFullYear()) *
            12 +
          (this.getEndDate.getMonth() - this.getStartDate.getMonth())
        );
      }
    },
    getStartDate(): Date {
      return this.$store.getters.getStartDate;
    },
    getEndDate(): Date {
      return this.$store.getters.getEndDate;
    },
    getUsedDate(): Date {
      return this.$store.getters.getUsedDate;
    },
    usedDateLocal(): string {
      return this.pickerType === "date"
        ? this.usedDate.toISOString().substr(0, 10)
        : this.usedDate.toISOString().substr(0, 7);
    },
    pickerType(): string {
      switch (this.$store.getters.step) {
        case StepEnum.Day:
          return "date";
        case StepEnum.Month:
          return "month";
        case StepEnum.Year:
          return "year";
        default:
          return "date";
      }
    }
  }
});
</script>
<style>
</style>
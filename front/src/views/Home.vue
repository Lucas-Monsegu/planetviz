<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout>
      <Databar
        @selectCountry="selectCountry"
        @selectType="selectType"
      />
      <v-layout
        column
        justify-end
        class="relative"
      >
        <v-menu
          v-model="quizz"
          :close-on-content-click="false"
          :nudge-width="200"
          max-width="300"
          absolute
          :position-x="x"
          :position-y="y"
        >
          <div class="text-xs-center">
            <v-card>
              <v-card-text class="break">
                {{ question || '...' }}
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-layout wrap>
                  <v-flex
                    xs6
                    pa-1
                    v-for="n in 4"
                    :key="n"
                  >
                    <v-btn
                      block
                      @click="send(n)"
                      :color="btnColor(n)"
                    >
                      {{ answers[n - 1] || '...'}}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </div>
        </v-menu>
        <Globe
          ref="globe"
          :location="location"
        />
        <v-btn
          color="success"
          id="play"
          @click="play"
          :disabled="quizz"
        >
          Ask me something
          <v-icon right>mdi-account-question-outline</v-icon>
        </v-btn>
        <bottombar />
      </v-layout>
      <v-flex
        xs2
        pa-2
      >
        <v-card
          class="transparent tweet-list"
          height="100%"
        >
          <v-btn
            class="twitter-btn"
            color="blue"
            href="https://twitter.com/TwitterDev/lists/national-parks?ref_src=twsrc%5Etfw"
          >
            <v-icon left>mdi-twitter</v-icon>Subscribe to the news
          </v-btn>
          <a
            class="twitter-timeline"
            href="https://twitter.com/TwitterDev/lists/national-parks?ref_src=twsrc%5Etfw"
            data-chrome="transparent"
            data-theme="dark"
          />
          <!-- <a
            class="twitter-timeline"
            href="https://twitter.com/PlanetViz?ref_src=twsrc%5Etfw"
          >Tweets by PlanetViz</a>-->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Toolbar from "@/components/Toolbar.vue";
import Bottombar from "@/components/Bottombar.vue";
import Databar from "@/components/Databar.vue";
import Globe from "@/components/Globe.vue";
import store from "../store";
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "home",
  data(): any {
    return {
      location: undefined,
      tuto1: false,
      quizz: false,
      question: null,
      answers: [null, null, null, null],
      stats: [null, null, null, null],
      quizz_id: null,
      correct: null,
      x: 900,
      y: 300,
      sent: false
    };
  },
  mounted: () => {
      let twtWidg = document.createElement('script')
      twtWidg.setAttribute('src', '//platform.twitter.com/widgets.js')
      document.head.appendChild(twtWidg)
  },
  components: { Bottombar, Databar, Globe },
  methods: {
    btnColor(n: number) {
      if (!this.sent) return;
      if (this.sent && n == this.correct) return "success";
      return "error";
    },
    selectCountry(country: string) {
      this.location = country;
    },
    send(i: number) {
      if (this.sent) return;
      axios
        .post("/question/random_question", {
          quiz_id: this.quizz_id,
          answer_number: i
        })
        .then(response => {
          console.log("ok");
          for (let i in this.answers) {
            Vue.set(this.answers, i, `${this.answers[i]}: ${this.stats[i]}`);
          }
          this.sent = true;
        })
        .catch(_ => {});
    },
    selectType(type: any) {
      console.log("selecttype: " + type);
    },
    play() {
      this.sent = false;
      this.quizz = true;
      this.answers = [null, null, null, null];
      this.stats = [null, null, null, null];
      axios
        .get("/question/random_question")
        .then(response => {
          let data = JSON.parse(response.data);
          console.log(data);
          this.question = data.question;
          this.answers = [
            data.answer1,
            data.answer2,
            data.answer3,
            data.answer4
          ];
          this.stats = [
            data.statistics1,
            data.statistics2,
            data.statistics3,
            data.statistics4
          ];
          this.quizz_id = data.id;
          this.correct = data.correct_answer;
        })
        .catch(() => {});
    }
  },
  beforeMount() {
    store.dispatch("getCarbons", { startDate: 2010, endDate: 2021 });
    store.dispatch("getTemperatures", { startDate: 2010, endDate: 2021 });
    store.dispatch("getCountries");
  }
});
</script>

<style>
.break {
  word-break: break-word;
  word-break: -moz-break-word;
  word-break: -break-word;
  word-break: -o-break-word;
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.relative {
  position: relative;
}
#play {
  right: 0;
  top: 0;
  position: absolute;
}

.twitter-timeline {
  max-height: 85vh;
  overflow: auto;
}

.twitter-btn {
  width: 100%;
  margin: 0;
}
</style>
<template>
  <v-container>
    <v-layout justify-center>
      <v-card>
        <v-card-title>
          <span class="headline">Suggest a Quizz question</span>
        </v-card-title>
        <v-card-text>
          <v-container
            class="pt-0"
            grid-list-md
          >
            <v-form ref="form">
              <v-layout wrap>
                <v-flex xs12>
                  <v-autocomplete
                    color="info"
                    :items="Object.values(getLocations)"
                    item-text="name"
                    item-value="alpha2"
                    label="Location"
                    persistent-hint
                    outline
                    hide-details
                    v-model="loc"
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
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    outline
                    label="Question"
                    color="info"
                    v-model="question"
                  ></v-textarea>
                </v-flex>
                <v-flex xs6>
                  <v-textarea
                    outline
                    label="Answer 1"
                    color="info"
                    v-model="answer1"
                    hide-details
                  ></v-textarea>
                </v-flex>
                <v-flex xs6>
                  <v-textarea
                    outline
                    label="Answer 2"
                    color="info"
                    v-model="answer2"
                    hide-details
                  ></v-textarea>
                </v-flex>
                <v-flex xs6>
                  <v-textarea
                    outline
                    label="Answer 3"
                    color="info"
                    v-model="answer3"
                    hide-details
                  ></v-textarea>
                </v-flex>
                <v-flex xs6>
                  <v-textarea
                    outline
                    label="Answer 4"
                    color="info"
                    v-model="answer4"
                    hide-details
                  ></v-textarea>
                </v-flex>
                <v-radio-group
                  v-model="correct_answer"
                  hide-details
                >
                  <v-radio
                    color="info"
                    v-for="n in 4"
                    :key="n"
                    :label="`Answer ${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            flat
            @click="send"
            :disabled="!loc"
          >Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="color"
    >
      {{message}}
      <v-icon right>
        {{icon}}
      </v-icon>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import store from "../store";
import Vue from "vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default Vue.extend({
  name: "home",
  data(): any {
    return {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correct_answer: 1,
      loc: null,
      snackbar: false,
      timeout: 4000,
      message: "Suggestion successfully sent !",
      color: "success",
      icon: "mdi-check"
    };
  },
  computed: {
    ...mapGetters(["getLocations"])
  },
  methods: {
    send() {
      if (this.loc)
        axios
          .post("/question/add_suggestion", {
            question: this.question,
            answer1: this.answer1,
            answer2: this.answer2,
            answer3: this.answer3,
            answer4: this.answer4,
            correct_answer: this.correct_answer,
            lat: this.getLocations[this.loc].lat,
            lon: this.getLocations[this.loc].long
          })
          .then(response => {
            this.snackbar = true;
          })
          .catch(() => {
            this.message = "An error occurred, try again later.";
            this.color = "error";
            this.icon = "mdi-alert-circle-outline";
            this.snackbar = true;
          });
    }
  }
});
</script>
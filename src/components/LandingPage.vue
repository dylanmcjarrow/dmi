
<style scoped>


.landing_sheet {
  border: 2px solid;
  transition: 200ms;
  background: none;
}

.landing_sheet:hover {
  border: 2px solid ;
  box-shadow: 6px 6px 0 black;
  transition: 200ms;
}

.surname{
  display: inline;
  text-align: start;
  font-family: "Space Grotesk";
  font-weight: 700;
  font-size: 5em;
}

.surname:hover {
  color: #c80000;
}

.firstName {
  text-align: start;
  font-family: "Work Sans";
  font-weight: 100;
  font-size: 2em;
}


</style>


<template>
  <v-app id="inspire">


    <v-main>
      <boid_canvas/>
      <v-container id="content_container">
        <v-row>
          <v-col
            class="d-none d-lg-inline-block"
            cols="2"
          >
            <v-sheet class="landing_sheet rounded">
              <v-list rounded
                      v-model="selected_item"
              >

                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :class="{
                      'selected_item': selected_item === i
                    }"
                  :value="item"
                  @click="set_selected_item(i)"

                >

                  <v-list-item-title v-text="item.text"/>


                </v-list-item>
                <v-divider class="my-2"></v-divider>

                <v-list-item
                    link
                >
                  <v-list-item-title>
                    Download
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col align-self="center" lg="8" md="10">
            <v-sheet
              class="landing_sheet rounded"
              min-height="400em"
            >

              <v-layout>
                <v-app-bar color="primary" elevation="0">

                  <template v-slot:append>
                    <v-btn
                      class="text-textColor"
                      @click="toggleTheme">

                      Toggle
                    </v-btn>
                  </template>

                </v-app-bar>

                <v-main>

                 <v-container>
                   <v-row  >
                     <v-col >
                       <h1  class="surname" v-for="(letter, index) in name.surname" :key="index"> {{letter}} </h1>

                       <h1 class="firstName" >Dylan Cameron </h1>
                     </v-col>
                   </v-row>
                 </v-container>

                </v-main>
              </v-layout>


            </v-sheet>

          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>



<script>

import {useTheme} from "vuetify";
import boid_canvas from "@/components/boid/boid_canvas";


export default {
  components: {
    boid_canvas
  },
  setup() {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'custom_light' : 'custom_dark'
    }
  },

  data: () => ({
    selected_item: 0,
    items: [
      {text: 'Real-Time'},
      {text: 'Audience'},
      {text: 'Conversions'},
    ],
    name: {
      firstname: Array.from("Dylan Cameron"),
      surname: Array.from("McJARROW"),
    },

  }),
  methods: {

    set_selected_item(index) {
      this.selected_item = index
    },

  },

}
</script>


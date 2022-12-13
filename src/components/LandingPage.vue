
<style scoped>


.landing_sheet {
  border: 2px solid ;
  transition: 200ms;
}

.landing_sheet:hover {
  border: 2px solid ;
  box-shadow: 6px 6px 0 black;
  transition: 200ms;
}



</style>


<template>
  <v-app id="inspire">


    <v-main>
      <v-container>
        <v-row>
          <v-col
              cols="2"
              class="d-none d-lg-inline-block"
          >
            <v-sheet class="landing_sheet rounded">
              <v-list rounded
                      v-model="selected_item"
              >

                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item"
                    :class="{
                      'selected_item': selected_item === i
                    }"
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
                min-height="70vh"
            >

              <v-layout>
                <v-app-bar color="primary">

                  <template v-slot:append>
                    <v-btn
                      class="text-textColor"
                      @click="toggleTheme">

                      Toggle
                    </v-btn>
                  </template>

                </v-app-bar>

                <v-main>

                  <!---->

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

export default {

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
  }),
  methods: {
    set_selected_item(index) {
      this.selected_item = index
    },

  },

}
</script>


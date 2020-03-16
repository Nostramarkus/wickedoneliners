<template>
  <div>
    <h2>Latest greatest</h2>
    <wo-loader v-if="loading"/>
    <div v-else>
      <wo-speak v-for="oneliner in oneliners" :key="oneliner.id" :oneliner="oneliner"/>
    </div>
  </div>
</template>

<script>
import Speak from "@/components/Speak.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    "wo-speak": Speak
  },
  computed: {
    ...mapState(["oneliners", "loading"])
  }
};
</script>
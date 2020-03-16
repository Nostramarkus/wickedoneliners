<template>
  <div>
    <wo-head/>
    <div class="container wo-main wo-shadow-sm">
      <div class="wo-user-actions" v-if="loggedIn">
        <router-link to="/my-wicked-account" class="wo-btn mr-2">
          <font-awesome-icon icon="user" size="xs"/>
        </router-link>
        <a href="javascript:;" @click="logout" class="wo-btn">
          <font-awesome-icon icon="power-off" size="xs"/>
        </a>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Head from "@/components/Head.vue";

export default {
  components: {
    "wo-head": Head
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", {
        token: this.$session.get("wot")
      });
      this.$session.destroy();
      this.$cookie.delete("woc");
      if (this.$router.history.current.path !== "/") {
        this.$router.push("/");
      }
    }
  },
  beforeCreate() {
    if (this.$session.exists()) {
      this.$store.dispatch("login");
      this.$store.dispatch("fetchOneliners", {
        token: this.$session.get("wot")
      });
    } else {
      if (this.$cookie.get("woc")) {
        this.$session.set("wot", this.$cookie.get("woc"));
        this.$store.dispatch("login");
        this.$store.dispatch("fetchOneliners", {
          token: this.$session.get("wot")
        });
      } else {
        this.$store.dispatch("logout", false);
        this.$store.dispatch("fetchOneliners", {
          token: false
        });
      }
    }
  }
};
</script>
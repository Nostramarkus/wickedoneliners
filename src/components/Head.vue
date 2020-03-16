<template>
  <div>
    <div
      class="wo-head-bg wo-shadow-sm"
      :class="{'wo-head-bg-new-user':!loggedIn,'wo-head-bg-not-home':!atHome}"
    >
      <div class="wo-head-wrapper">
        <div class="wo-head wo-box-shadow wo-border">
          <h1>Wicked Oneliners</h1>
        </div>
        <div class="w-100" v-if="atHome">
          <div
            class="wo-searchbar container"
            :class="{'wo-sticky-input':stickyIckyJicky}"
            v-if="loggedIn"
          >
            <input
              v-model="newOneliner"
              class="form-control wo-head-input"
              type="text"
              placeholder="Add yours..."
              @keyup.enter="addOneliner"
              :disabled="loading"
            >
          </div>
          <b-container class="mt-sm-4" v-else>
            <b-row>
              <b-col xs="12" sm="6" class="pl-sm-0">
                <router-link to="/login" class="wo-btn w-100 mt-4 d-block">Login</router-link>
              </b-col>
              <b-col xs="12" sm="6" class="pr-sm-0">
                <router-link to="/get-wicked" class="wo-btn w-100 mt-4 d-block">Create account</router-link>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <b-container class="mt-sm-4 text-left pl-sm-0" v-else>
          <router-link to="/" class="wo-btn mt-4 d-inline-block">
            <font-awesome-icon icon="chevron-left"/>&nbsp;&nbsp;Back
          </router-link>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OnelinerServices from "@/services/OnelinerServices";

export default {
  name: "Head",
  data: function() {
    return {
      loading: false,
      atHome: true,
      stickyIckyJicky: false,
      newOneliner: ""
    };
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  created() {
    this.atHome = this.$router.history.current.path === "/" ? true : false;
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      var pixels = 0;
      window.outerWidth > 575 ? (pixels = 215) : (pixels = 125);
      window.pageYOffset > pixels
        ? (this.stickyIckyJicky = true)
        : (this.stickyIckyJicky = false);
    },
    addOneliner() {
      this.loading = true;
      OnelinerServices.addOneliner({
        token: this.$session.get("wot"),
        newOneliner: this.newOneliner
      })
        .then(res => {
          if (res.data.success) {
            this.$store.dispatch("fetchOneliners", {
              token: this.$session.get("wot")
            });
            this.newOneliner = "";
          } else {
            if (res.data.logout) {
              this.$session.destroy();
              this.$store.dispatch("logout", false);
              this.$router.push("/login");
              this.$noty.error("You are not logged in");
            } else {
              res.data.errorArr.forEach(error =>
                this.$noty.error(error.errorMsg)
              );
            }
          }
        })
        .catch(error => {
          this.$noty.error("Network error...");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    $route(to, from) {
      this.atHome = to.path === "/" ? true : false;
    }
  }
};
</script>

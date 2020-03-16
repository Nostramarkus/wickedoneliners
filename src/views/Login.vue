<template>
  <div>
    <h2>Login</h2>
    <p>Add your credentials...</p>
    <wo-loader v-if="loading"/>
    <div v-else>
      <input
        v-model="userEmail"
        class="form-control wo-head-input mt-4"
        type="text"
        placeholder="Your e-mail address"
        @keyup.enter="login"
      >
      <input
        v-model="userPass"
        class="form-control wo-head-input mt-4"
        type="password"
        placeholder="Your password"
        @keyup.enter="login"
      >
      <button class="mt-4 mb-3 mb-sm-0" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import OnelinerServices from "@/services/OnelinerServices";

export default {
  name: "Login",
  data: function() {
    return {
      loading: false,
      userEmail: "",
      userPass: ""
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$session.start();
      OnelinerServices.login({
        userEmail: this.userEmail,
        userPass: this.userPass,
        clientSessionId: this.$session.id()
      })
        .then(res => {
          if (res.data.success) {
            this.$session.set("wot", res.data.token);
            this.$cookie.set("woc", res.data.token, 20 * 365);
            this.$store.dispatch("login");
            this.$router.push("/");
            this.$store.dispatch("fetchOneliners", {
              token: this.$session.get("wot")
            });
          } else {
            res.data.errorArr.forEach(error =>
              this.$noty.error(error.errorMsg)
            );
            this.$session.destroy();
          }
        })
        .catch(error => {
          this.$noty.error("Network error...");
          this.$session.destroy();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

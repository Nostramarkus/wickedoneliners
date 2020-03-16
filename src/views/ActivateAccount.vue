<template>
  <div>
    <h2>Activate account</h2>
    <wo-loader v-if="loading"/>
    <div v-else>
      <br>
      <div v-if="activationSuccess">
        <p>
          <strong>Your account has been activated!</strong>
        </p>
        <p
          class="mb-5"
        >You are now a member of Wicked Oneliners, you can add your own oneliners and like others. Enjoy!</p>
      </div>
      <div v-else>
        <p>
          <strong>There was a problem with the activation.</strong>
        </p>
        <p class="mb-5">That sucks bro... Sorry about that!</p>
      </div>
      <router-link to="/" class="wo-btn">Go to homepage</router-link>
    </div>
  </div>
</template>

<script>
import OnelinerServices from "@/services/OnelinerServices";

export default {
  name: "ActivateAccount",
  data: function() {
    return {
      loading: true,
      activationSuccess: false
    };
  },
  beforeCreate() {
    if (this.$route.query.a) {
      this.$session.start();
      OnelinerServices.activateAccount({
        userId: this.$route.query.a,
        clientSessionId: this.$session.id()
      })
        .then(res => {
          if (res.data.success) {
            this.activationSuccess = true;
            this.$session.set("wot", res.data.token);
            this.$cookie.set("woc", res.data.token, 20 * 365);
            this.$store.dispatch("login");
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
    } else {
      this.$router.push("/");
    }
  }
};
</script>

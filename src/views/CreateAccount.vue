<template>
  <div>
    <div v-if="!accountCreated">
      <h2>Get wicked!</h2>
      <p>Become a member to add your own oneliners and like others. When you click "Create account" you will receive an e-mail to active your account.</p>
      <wo-loader v-if="loading"/>
      <div v-else>
        <input
          v-model="userName"
          class="form-control wo-head-input mt-4"
          type="text"
          placeholder="Your name"
          autocomplete="off"
        >
        <input
          v-model="userEmail"
          class="form-control wo-head-input mt-4"
          type="text"
          placeholder="Your e-mail address"
          autocomplete="off"
        >
        <input
          v-model="userPass"
          class="form-control wo-head-input mt-4"
          type="password"
          placeholder="Your password"
          autocomplete="false"
        >
        <input
          v-model="userPass2"
          class="form-control wo-head-input mt-4"
          type="password"
          placeholder="Retype your password"
          autocomplete="off"
        >
        <button class="mt-4 mb-3 mb-sm-0" @click="createAccount">Create account</button>
      </div>
    </div>
    <div v-else>
      <h2>Almost wicked!</h2>
      <p>
        Thanks for signing up! To activate your account go to your e-mail inbox at
        <strong>{{userEmail}}</strong> and check the Wicked Oneliners activation e-mail
      </p>
    </div>
  </div>
</template>

<script>
import OnelinerServices from "@/services/OnelinerServices";

export default {
  name: "CreateAccount",
  data: function() {
    return {
      loading: false,
      userName: "",
      userEmail: "",
      userPass: "",
      userPass2: "",
      accountCreated: false
    };
  },
  methods: {
    createAccount() {
      this.loading = true;
      OnelinerServices.createAccount({
        userName: this.userName,
        userEmail: this.userEmail,
        userPass: this.userPass,
        userPass2: this.userPass2
      })
        .then(res => {
          if (res.data.success) {
            this.accountCreated = true;
          } else {
            res.data.errorArr.forEach(error =>
              this.$noty.error(error.errorMsg)
            );
          }
        })
        .catch(error => {
          this.$noty.error("Network error...");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

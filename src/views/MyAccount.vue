<template>
  <div>
    <h2 class="mb-2">My Wicked account</h2>
    <wo-loader v-if="loading"/>
    <div class="pt-sm-3" v-else>
      <strong>Youre name</strong>
      <input
        v-model="userName"
        class="form-control wo-head-input mb-4"
        type="text"
        placeholder="Enter your name"
        @keyup.enter="saveUser"
      >
      <strong>Your e-mail address</strong>
      <input
        v-model="userEmail"
        class="form-control wo-head-input mb-4"
        type="text"
        placeholder="Enter your e-mail address"
        @keyup.enter="saveUser"
      >
      <button class="mt-3 mb-3 mb-sm-0" @click="saveUser">Save</button>
      <a href="javascript:;" class="float-right mt-4" v-b-modal.modalPass>
        <font-awesome-icon icon="lock"/>&nbsp;Change password
      </a>
      <b-modal
        id="modalPass"
        title="Change password"
        :ok-title="btnTxtOke"
        cancel-title="Close"
        ok-variant="wo"
        cancel-variant="wo"
        @ok="modalPassOkBtn"
        @hidden="modalPassHidden"
      >
        <div v-if="!currPassChecked">
          <strong>Your current password</strong>
          <input
            v-model="userPass"
            class="form-control wo-head-input"
            type="password"
            autocomplete="false"
          >
        </div>
        <div v-else>
          <strong>Your new password</strong>
          <input
            v-model="userPassNew"
            class="form-control wo-head-input mb-4"
            type="password"
            autocomplete="false"
          >
          <strong>Re-type your new password</strong>
          <input
            v-model="userPassNew2"
            class="form-control wo-head-input"
            type="password"
            autocomplete="false"
          >
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import OnelinerServices from "@/services/OnelinerServices";

export default {
  name: "MyAccount",
  data: function() {
    return {
      loading: true,
      userName: "",
      userEmail: "",
      userPass: "",
      currPassChecked: false,
      userPassNew: "",
      userPassNew2: "",
      btnTxtOke: "Next"
    };
  },
  methods: {
    saveUser() {
      this.loading = true;
      OnelinerServices.saveUser({
        userName: this.userName,
        userEmail: this.userEmail,
        token: this.$session.get("wot")
      })
        .then(res => {
          if (res.data.success) {
            this.$noty.success("Saved!");
            this.$store.dispatch("fetchOneliners", {
              token: this.$session.get("wot")
            });
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
    },
    modalPassOkBtn(modalEvt) {
      modalEvt.preventDefault();
      if (!this.currPassChecked) {
        OnelinerServices.checkUserPass({
          userPass: this.userPass,
          token: this.$session.get("wot")
        })
          .then(res => {
            if (res.data.success) {
              this.btnTxtOke = "Change password";
              this.currPassChecked = true;
            } else {
              res.data.errorArr.forEach(error =>
                this.$noty.error(error.errorMsg)
              );
            }
          })
          .catch(error => {
            this.$noty.error("Network error...");
          });
      } else {
        OnelinerServices.updateUserPass({
          userPassNew: this.userPassNew,
          userPassNew2: this.userPassNew2,
          token: this.$session.get("wot")
        })
          .then(res => {
            if (res.data.success) {
              this.$noty.success("Password changed");
              this.$bvModal.hide("modalPass");
            } else {
              res.data.errorArr.forEach(error =>
                this.$noty.error(error.errorMsg)
              );
            }
          })
          .catch(error => {
            this.$noty.error("Network error...");
          });
      }
    },
    modalPassHidden() {
      this.btnTxtOke = "Next";
      this.currPassChecked = false;
    }
  },
  beforeCreate() {
    OnelinerServices.getUser({
      token: this.$session.get("wot")
    })
      .then(res => {
        if (res.data.success) {
          this.userName = res.data.userName;
          this.userEmail = res.data.userEmail;
        } else {
          if (res.data.logout) {
            this.$session.destroy();
            this.$store.dispatch("logout", false);
            this.$router.push("/");
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
};
</script>

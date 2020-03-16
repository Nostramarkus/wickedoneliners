<template>
  <div>
    <blockquote class="wo-speak">
      <p>{{oneliner.oneliner}}</p>
      <img src="@/assets/img/wo-speak-tail.png" class="wo-speak-tail">
    </blockquote>
    <div class="mb-3">
      <div class="wo-user-stamp">
        <i>
          <small>{{ oneliner.createDt | moment("MMM Do YYYY, H:mm") }}</small>
        </i>
        <strong>{{oneliner.username}}</strong>
      </div>
      <div class="wo-likes" :class="{'wo-likes-logged-in': loggedIn}">
        <a
          href="javascript:;"
          class="mr-1"
          v-if="oneliner.userOwnOneliner && loggedIn"
          v-b-modal="'modelOneliner-' + oneliner.id"
        >
          <small class="align-text-top">
            <font-awesome-icon icon="trash-alt"/>
          </small>
        </a>
        <b-modal
          :id="'modelOneliner-' + oneliner.id"
          title="Delete oneliner"
          ok-title="Delete"
          cancel-title="Close"
          ok-variant="wo"
          cancel-variant="wo"
          @ok="deleteOneliner"
        >Are you sure you want to delete this oneliner?</b-modal>
        {{oneliner.likes}}
        <span
          class="wo-likes-inner wo-user-logged-in"
          @click="like()"
          v-if="loggedIn"
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" v-if="oneliner.userHasLiked"/>
          <font-awesome-icon :icon="['far', 'thumbs-up']" v-else/>
        </span>
        <span class="wo-likes-inner" v-else>
          <font-awesome-icon :icon="['far', 'thumbs-up']"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OnelinerServices from "@/services/OnelinerServices";

export default {
  name: "Speak",
  props: {
    oneliner: Object
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    like() {
      this.oneliner.userHasLiked = !this.oneliner.userHasLiked;
      this.oneliner.userHasLiked
        ? this.oneliner.likes++
        : this.oneliner.likes--;
      OnelinerServices.updateLike({
        token: this.$session.get("wot"),
        onelinerId: this.oneliner.id,
        userHasLiked: this.oneliner.userHasLiked
      }).catch(error => {
        this.$noty.error("Network error...");
      });
    },
    deleteOneliner() {
      OnelinerServices.deleteOneliner({
        token: this.$session.get("wot"),
        onelinerId: this.oneliner.id
      })
        .then(this.$store.dispatch("deleteOneliner", this.oneliner.id))
        .catch(error => {
          this.$noty.error("Network error...");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.wo-speak {
  -webkit-box-shadow: 5px 6px 0px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 5px 6px 0px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 5px 6px 0px 0px rgba(0, 0, 0, 0.75);
  position: relative;
  padding: 15px 15px;
  margin: 1rem 0 5rem 0;
  margin-bottom: 50px;
  border: 2px solid $woBlack;
  text-align: center;
  background: #fff;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  line-height: 1.2;
  p {
    font-size: 22px;
    margin-bottom: 0;
    @media (min-width: 992px) {
      font-size: 32px;
    }
  }
  @media (min-width: 576px) {
    margin-bottom: 55px;
  }
}

.wo-speak-tail {
  bottom: -52px;
  position: absolute;
  height: 53px;
  left: 15px;
  @media (min-width: 576px) {
    bottom: -57px;
    height: 58px;
  }
}

.wo-likes {
  text-align: right;
  margin: -75px 0 75px 0;
  @media (min-width: 576px) {
    margin: -80px 0 75px 0;
  }
}

.wo-likes-logged-in {
  margin: -72px 0 75px 0;
  @media (min-width: 576px) {
    margin: -75px 0 75px 0;
  }
}

.wo-likes-inner {
  margin-right: 5px;
}

.wo-user-logged-in {
  cursor: pointer;
  margin-right: 2px;
  padding: 5px 7px;
  border-radius: 50%;
  box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.75);
  background-image: $backgroundImgMain;
  border: 2px solid $woBlack;
  color: $txtColor;
  &:hover {
    background: white;
    color: $txtColor;
    text-decoration: none;
  }
}

.wo-user-stamp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  line-height: 1;
  color: $woDark;
}
</style>

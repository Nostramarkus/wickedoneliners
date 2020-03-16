<template>
  <div class="wo-half-circle-spinner mx-auto my-4">
    <div class="wo-circle wo-circle-1"></div>
    <div class="wo-circle wo-circle-2"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss">
@import "@/assets/css/variables.scss";
.wo-half-circle-spinner,
.wo-half-circle-spinner * {
  box-sizing: border-box;
}

.wo-half-circle-spinner {
  width: 130px;
  height: 130px;
  border-radius: 100%;
  position: relative;
  opacity: 0.3;
}

.wo-half-circle-spinner .wo-circle {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 10) solid transparent;
}

.wo-half-circle-spinner .wo-circle.wo-circle-1 {
  border-top-color: $woDark;
  animation: wo-half-circle-spinner-animation 1s infinite;
}

.wo-half-circle-spinner .wo-circle.wo-circle-2 {
  border-bottom-color: $woDark;
  animation: wo-half-circle-spinner-animation 1s infinite alternate;
}

@keyframes wo-half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

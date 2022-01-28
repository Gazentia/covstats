<template>
  <div class="nest-loader"></div>
</template>
<script>
export default {
  name: "NestLoader",
};
</script>
<style lang="scss" scoped>
.nest-loader {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  width: 50%;
  max-width: 60px;
  max-height: 60px;
  margin: -25px 0 0 -25px;
  border: 2px solid transparent;
  border-top-color: $dimGray;
  box-shadow: 0 0 5px $grey;
  border-radius: 50%;
  -webkit-animation: spin8 2s linear infinite;
  animation: spin8 2s linear infinite;
}

.nest-loader:before {
  content: "";
  position: absolute;
  top: 7px;
  right: 7px;
  bottom: 7px;
  left: 7px;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top-color: $dimGray;
  box-shadow: 0 0 5px $grey;
  -webkit-animation: spin8 0.9s linear infinite;
  animation: spin8 0.9s linear infinite;
}

.nest-loader:after {
  content: "";
  position: absolute;
  top: 15px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top-color: $dimGray;
  box-shadow: 0 0 5px $grey;
  -webkit-animation: spin8 1.5s linear infinite;
  animation: spin8 1.5s linear infinite;
}

@-webkit-keyframes spin8 {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes spin8 {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
</style>

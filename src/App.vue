<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  display: flex;
}
* {
  touch-action: pan-y;
}
</style>


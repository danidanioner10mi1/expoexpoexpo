<template>
  <div id="app">
    <a href="https://eventosmanto.ml" target="_blank">
      <!--<img class="logo" src="./assets/vp2.png">-->
    </a>
    <Btns/>
    <World/>
  </div>
</template>

<script>
import xEmiiter from "xemitterjs";
import Btns from "./components/Btns";
import World from "./components/World";

export default {
  name: "App",
  components: {
    Btns,
    World
  },
  methods: {
    click: function(type) {
      xEmiiter.emit("MENU_CLICK", type);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.logo {
  width: 220px;
  position: absolute;
  z-index: 999;
  left: 650px;
  top: 250px;
  opacity: 0.8;
  
}
</style>

<template>
  <v-app style="height:100vh; background-image: linear-gradient(to bottom, #006eff, #005eff, #004eff, #003eff, #002eff);">
    <AppBar @changeId="changeScreen" />
    <v-main style="width:100vw; height:calc(100vh - 75px); justify-content:center;">
      <Register v-if="screenId == 3" /> 
    </v-main>
    
  </v-app>
</template>
<script>
import AppBar from "./components/AppBar";
import Register from "./components/Register";
export default {
  name: "App",
  components: {
    AppBar,
    Register
  },
  methods: {
    changeScreen(id){
      console.log(id)
      this.screenId = id
    },
  },
  data: () => ({
    screenId: 0,
  }),
};
</script>
<style>
/* Vuetify adjusts */
.v-application p {
  margin-bottom: 0px;
}
.v-toolbar__content {
  justify-content: center;
}
.v-btn {
  text-transform: none;
}

.content-scroll {
  height: calc(100vh - 73px);
  overflow-y: auto;
  overflow-x: hidden;
}
.content-scroll.fill-height {
  height: 100%;
}
::-webkit-scrollbar-track {
  background: #f9f9f9;
}
::-webkit-scrollbar-thumb {
  border-radius: 40px;
  background-color: #c9c9c9;
}
*::-webkit-scrollbar {
  border-radius: 40px;
  width: 5px;
}
*::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 40px;
}
*::-webkit-scrollbar-thumb {
  background-color: #bbbaba; 
  border-radius: 40px;
}
.content-scroll::-webkit-scrollbar {
  border-radius: 40px;
  width: 5px;
}
.content-scroll::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 40px;
}
.content-scroll::-webkit-scrollbar-thumb {
  background-color: #c9c9c9;
  border-radius: 40px;
}
.custom-scroll {
  overflow-y: auto;
  overflow-x: hidden;
}
.light-scroll {
  overflow: auto;
}
.light-scroll::-webkit-scrollbar {
  border-radius: 30px;
  width: 5px;
}
.light-scroll::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 30px;
}
.light-scroll::-webkit-scrollbar-thumb {
  /* background-color: #f0f0f0; */
  background-color: #efefef !important;
  border-radius: 30px;
}
.custom-scroll::-webkit-scrollbar {
  border-radius: 30px;
  width: 5px;
}
.custom-scroll::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 30px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  /* background-color: #f0f0f0; */
  background-color: #c9c9c9;
  border-radius: 30px;
}
.v-main__wrap{
  display:flex;
  justify-content: center;
}
.v-text-field .v-label{
  font-family: "secundary";
  display: block;
  font-style: normal;
  font-size: 1em;
  line-height: 1.01em;
  letter-spacing: 0.01em;
}
</style>
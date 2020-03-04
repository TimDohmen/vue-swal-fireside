<template>
  <div class="home">
    <h3>Gifmon</h3>
    <div v-for="gif in gifs" :key="gif.id">
      <img :src="gif.embed_url" alt="unloadedGif" />
      <p>{{gif.title}}</p>Ello
      <button @click="addGif(gif)" class="btn btn-primary">Add Gif</button>
    </div>
    <div v-for="gif in myGifs" :key="gif.id">
      <img :src="gif.embed_url" alt="unloadedGif" />
      <p>{{gif.title}}</p>Ello
      <button @click="removeGif(gif.id)" class="btn btn-danger">Remove Gif</button>
    </div>

    <footer>
      Do the thing input some data
      <button class="btn btn-success" @click="dataInput()">Form Input</button>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NotificationService from "../NotificationService.js";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  mounted() {
    this.$store.dispatch("getGifs");
  },
  computed: {
    gifs() {
      return this.$store.state.gifs;
    },
    myGifs() {
      return this.$store.state.myGifs;
    }
  },
  methods: {
    addGif(gif) {
      this.$store.dispatch("addGif", gif);
      NotificationService.toast("custom handler");
    },
    async removeGif(gifId) {
      if (
        await NotificationService.confirmAction(
          "This is a test to remove things"
        )
      ) {
        this.$store.dispatch("removeGif", gifId);
      }
    },
    async dataInput() {
      let data = await NotificationService.inputData();
      console.log(data);
    },

    async logout() {
      if (
        await NotificationService.confirmAction(
          "Are you sure you want to log out?"
        )
      ) {
        this.$store.dispatch("logout");
      }
    }
  }
};
</script>


<style>
img {
  min-height: 100px;
  min-width: 100px;
}
</style>
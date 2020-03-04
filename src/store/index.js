import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import Axios from "axios"

Vue.use(Vuex)

let gifApi = Axios.create({
  baseURL: "https://api.giphy.com/v1/gifs/trending?api_key=GKVvQKzGg46Nc9BfWt7GyJ5GJJlfK49i",
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    gifs: [],
    myGifs: []
  },
  mutations: {
    setGifs(state, gifs) {
      state.gifs = gifs
    },
    addGif(state, gif) {
      state.myGifs.push(gif)
    },
    removeGif(state, gif) {
      let index = state.myGifs.findIndex(g => g.id == gif)
      state.myGifs.splice(index, 1)
    }
  },
  actions: {
    async getGifs({ commit, dispatch }) {
      try {
        let res = await gifApi.get("")
        commit("setGifs", res.data.data)
      } catch (error) {
        console.error(error)
      }
    },
    addGif({ commit, dispatch }, gif) {
      try {
        commit("addGif", gif)
      } catch (error) {
        console.error(error)

      }
    },
    removeGif({ commit, dispatch }, gifId) {
      try {
        commit("removeGif", gifId)
      } catch (error) {
        console.error(error)

      }
    }

  },
  modules: {
  }
})

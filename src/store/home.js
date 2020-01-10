import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_USER_NAME: 'SET_USER_NAME'
}

const state = {
  username: ''
}
const getters = {
  getUserName (state) {
    return state.username
  }
}
const mutations = {
  [types.SET_USER_NAME] (state, username) {
    state.username = username
  }
}
const actions = {
  setUserName ({ commit }, username) {
    commit(types.SET_USER_NAME, username)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

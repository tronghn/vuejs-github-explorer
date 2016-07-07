import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  username: '',
  repo: '',
  errorState: false,
  errorMsg: ''
}

const mutations = {
  SET_USERNAME (state, username) {
    state.username = username
  },
  SET_REPO (state, repo) {
    state.repo = repo
  },
  SET_ERROR (state, error) {
    state.errorMsg = error
  },
  SET_ERROR_VISIBLE (state, visible) {
    state.errorState = visible
  }
}

export default new Vuex.Store({
  state,
  mutations
})

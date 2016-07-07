import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const API_ROOT = 'https://api.github.com/repos/'

export default {
  getFiles (username, repo, path) {
    return Vue.http.get(API_ROOT + username + '/' + repo + '/contents' + path)
  },

  getContributors (username, repo) {
    return Vue.http.get(API_ROOT + username + '/' + repo + '/contributors')
  },

  getCommits (username, repo, pageNumber) {
    return Vue.http.get(API_ROOT + username + '/' + repo + '/commits?page=' + pageNumber)
  },

  getPulls (username, repo, pageNumber, state) {
    return Vue.http.get(API_ROOT + username + '/' + repo + '/pulls?state=' + state + '&page=' + pageNumber)
  }
}

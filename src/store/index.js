import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const API_ROOT = 'https://api.github.com/repos/'

export default {
  getFiles (fullRepoUrl, path) {
    return Vue.http.get(API_ROOT + fullRepoUrl + '/contents' + path)
  },

  getContributors (fullRepoUrl) {
    return Vue.http.get(API_ROOT + fullRepoUrl + '/contributors')
  },

  getCommits (fullRepoUrl, pageNumber) {
    return Vue.http.get(API_ROOT + fullRepoUrl + '/commits?page=' + pageNumber)
  }
}

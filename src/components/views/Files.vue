<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="pull-left">
        File Path: {{ path }}
      </div>
      <div class="pull-right">
        <button class="btn btn-default btn-xs" @click="goBack()" v-if="path !== '/'">
          Go Back
        </button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="panel-body">
      <table class="table">

          <tbody>
            <tr v-for="file in sortedFiles" :key="file.sha">
              <td>
                <div class="file" v-if="file.type === 'file'">
                  <span class="fa fa-file-o"></span>
                  {{ file.name }}
                </div>
                <div class="directory" v-if="file.type === 'dir'">
                  <span class="fa fa-folder-o"></span>
                  <a @click="changePath(file.path)">{{ file.name }}</a>
                </div>
              </td>
              <td class="text-right">
                <a :href="file.download_url" download v-if="file.type === 'file'">
                  <span class="fa fa-cloud-download"></span>
                </a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import RepoProps from '../../mixins/RepoProps'
import { setError } from '../../vuex/actions'

export default {
  mixins: [RepoProps],
  data () {
    return {
      path: '/'
    }
  },
  computed: {
    sortedFiles () {
      return this.data.slice(0).sort(function (a, b) {
        if (a.type !== b.type) {
          if (a.type === 'dir') {
            return -1
          } else {
            return 1
          }
        } else {
          if (a.name < b.name) {
            return -1
          } else {
            return 1
          }
        }
      })
    }
  },
  methods: {
    getData () {
      Api.getFiles(this.username, this.repo, this.path)
        .then((response) => {
          this.data = response.body
        })
        .catch((error) => {
          this.setError(error)
        })
    },
    changePath (path) {
      this.path = '/' + path
      this.getData()
    },
    goBack () {
      this.path = this.path.split('/').slice(0, -1).join('/')
      if (this.path === '') this.path = '/'
      this.getData()
    }
  },
  vuex: {
    actions: {
      setError
    }
  },
  name: 'files'
}
</script>